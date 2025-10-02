//
//  ContentView.swift
//  Daily Rota
//
//  Created by Sheakh Emon on 23/12/2024.
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var dataManager: DataManager
    @Environment(\.colorScheme) private var colorScheme
    @State private var showingAddWorker = false
    @State private var selectedWorker: Employee?
    @State private var searchText = ""
    @State private var isEditing = false
    @State private var isFloatingButtonAnimating = false
    @State private var isLoading = false
    @AppStorage("companyInfo") private var companyInfoData: Data = try! JSONEncoder().encode(CompanyInfo.default)
    @State private var companyInfo: CompanyInfo = .default
    @State private var showingCompanySettings = false
    @State private var showingShareSheet = false
    @State private var pdfData: Data?
    @State private var showingCompanyInfoAlert = false
    @State private var showingSettings = false
    @AppStorage("hasShownInitialAnimation") private var hasShownInitialAnimation = false
    @AppStorage("hasSeenWelcome") private var hasSeenWelcome = false

    // Check if the user is a first-time user
    private var isFirstUser: Bool {
        dataManager.workers.isEmpty
    }

    // Determine if the floating button animation should be shown
    private var shouldShowAnimation: Bool {
        return isFirstUser && !hasShownInitialAnimation
    }

    // Filter workers based on the search text
    var filteredWorkers: [Employee] {
        if searchText.isEmpty {
            return dataManager.workers
        }
        return dataManager.workers.filter { worker in
            worker.name.localizedCaseInsensitiveContains(searchText)
        }
    }

    var body: some View {
        Group {
            if !hasSeenWelcome {
                WelcomeView(hasSeenWelcome: $hasSeenWelcome)
            } else {
                NavigationView {
                    ZStack {
                        Color(uiColor: .systemGroupedBackground)
                            .ignoresSafeArea()

                        // Main Content
                        List {
                            ForEach(filteredWorkers) { worker in
                                WorkerRowView(worker: worker)
                                    .contentShape(Rectangle())
                                    .onTapGesture {
                                        if !isEditing {
                                            selectedWorker = worker
                                        }
                                    }
                                    .swipeActions(edge: .trailing, allowsFullSwipe: false) {
                                        Button(role: .destructive) {
                                            withAnimation {
                                                if let index = dataManager.workers.firstIndex(where: { $0.id == worker.id }) {
                                                    dataManager.workers.remove(at: index)
                                                }
                                            }
                                        } label: {
                                            Label("Delete", systemImage: "trash")
                                        }
                                    }
                            }
                            .onMove(perform: moveWorkers)
                        }
                        .listStyle(InsetGroupedListStyle())
                        .environment(\.editMode, .constant(isEditing ? .active : .inactive))

                        // Empty State Overlay (when no workers)
                        if dataManager.workers.isEmpty {
                            EmptyStateView()
                                .onTapGesture {
                                    withAnimation(.spring(response: 0.3)) {
                                        showingAddWorker = true
                                    }
                                }
                        }

                        // Floating Action Button with Animation
                        if !isEditing {
                            VStack {
                                Spacer()
                                HStack {
                                    Spacer()
                                    Button(action: {
                                        withAnimation(.spring(response: 0.3)) {
                                            showingAddWorker = true
                                        }
                                    }) {
                                        Image(systemName: "plus")
                                            .font(.system(size: 22, weight: .semibold))
                                            .foregroundColor(.white)
                                            .frame(width: 56, height: 56)
                                            .background(Color.accentColor)
                                            .clipShape(Circle())
                                            .shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
                                            .scaleEffect(isFloatingButtonAnimating && shouldShowAnimation ? 1.1 : 1.0)
                                            .rotationEffect(.degrees(isFloatingButtonAnimating && shouldShowAnimation ? 180 : 0))
                                    }
                                    .padding(.trailing, 20)
                                    .padding(.bottom, 20)
                                }
                            }
                            .onAppear {
                                if shouldShowAnimation {
                                    withAnimation(
                                        Animation
                                            .easeInOut(duration: 2)
                                            .repeatForever(autoreverses: true)
                                    ) {
                                        isFloatingButtonAnimating = true
                                    }
                                } else {
                                    isFloatingButtonAnimating = false
                                }
                            }
                        }

                        // Add loading overlay
                        if isLoading {
                            Color.black.opacity(0.3)
                                .ignoresSafeArea()

                            ProgressView("Generating PDF...")
                                .padding()
                                .background(Color(uiColor: .systemBackground))
                                .cornerRadius(10)
                                .shadow(radius: 10)
                        }
                    }
                    .searchable(text: $searchText, prompt: "Search workers")
                    .navigationTitle("Daily Rota")
                    .navigationBarItems(
                        leading: Button(isEditing ? "Done" : "Edit") {
                            withAnimation(.spring(response: 0.3)) {
                                isEditing.toggle()
                            }
                        },
                        trailing: HStack(spacing: 16) {
                            Button {
                                showingSettings = true
                            } label: {
                                Image(systemName: "gearshape")
                                    .font(.system(size: 17, weight: .regular))
                            }

                            Menu {
                                Button(action: { showingCompanySettings = true }) {
                                    Label("Company Settings", systemImage: "building.2")
                                }
                                Button(action: exportPDF) {
                                    Label("Export Rota", systemImage: "square.and.arrow.up")
                                }
                            } label: {
                                Image(systemName: "ellipsis.circle")
                                    .font(.system(size: 17, weight: .regular))
                            }
                        }
                    )
                    .sheet(isPresented: $showingCompanySettings) {
                        CompanySettingsView(
                            companyInfo: $companyInfo,
                            companyInfoData: $companyInfoData
                        )
                    }
                    .sheet(isPresented: $showingShareSheet) {
                        if let pdfData = pdfData {
                            ShareSheet(items: [pdfData])
                        }
                    }
                }
                .sheet(isPresented: $showingAddWorker) {
                    AddWorkerView(workers: $dataManager.workers)
                        .onDisappear {
                            // Update the animation flag when a worker is added
                            if !dataManager.workers.isEmpty {
                                hasShownInitialAnimation = true
                                isFloatingButtonAnimating = false // Stop the animation after adding the first user
                            }
                        }
                }
                .onReceive(NotificationCenter.default.publisher(for: NSNotification.Name("DismissAddWorker"))) { _ in
                    showingAddWorker = false
                }
                .sheet(item: $selectedWorker) { worker in
                    NavigationView {
                        if let index = dataManager.workers.firstIndex(where: { $0.id == worker.id }) {
                            ShiftManagerView(worker: $dataManager.workers[index])
                        }
                    }
                }
                .alert("Company Information Required", isPresented: $showingCompanyInfoAlert) {
                    Button("Update Info") {
                        showingCompanySettings = true
                    }
                    Button("Cancel", role: .cancel) { }
                } message: {
                    Text("Please complete company information before exporting the rota.")
                }
                .onAppear {
                    // Load company info when view appears
                    if let decoded = try? JSONDecoder().decode(CompanyInfo.self, from: companyInfoData) {
                        companyInfo = decoded
                    }
                }
                .sheet(isPresented: $showingSettings) {
                    SettingsView()
                }
            }
        }
    }

    // Move workers in the list
    private func moveWorkers(from source: IndexSet, to destination: Int) {
        dataManager.workers.move(fromOffsets: source, toOffset: destination)
    }

    // Export PDF function
    private func exportPDF() {
        // Check if company info is complete
        if companyInfo.name.isEmpty || companyInfo.address.isEmpty || 
           companyInfo.email.isEmpty || companyInfo.phone.isEmpty {
            // Show alert to complete company info
            showingCompanyInfoAlert = true
            return
        }

        // Show loading indicator while generating PDF
        withAnimation {
            isLoading = true
        }

        // Use background task for PDF generation
        DispatchQueue.global(qos: .userInitiated).async {
            let renderer = PDFRenderer(workers: dataManager.workers, companyInfo: companyInfo)
            let generatedPDF = renderer.generatePDF()

            // Return to main thread for UI updates
            DispatchQueue.main.async {
                withAnimation {
                    isLoading = false
                }
                pdfData = generatedPDF
                showingShareSheet = true
            }
        }
    }
}

struct WorkerRowView: View {
    let worker: Employee
    @Environment(\.editMode) private var editMode
    
    private var totalHours: String {
        String(format: "%.1f hrs", worker.weeklyHours)
    }
    
    var body: some View {
        HStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(Color.accentColor.opacity(0.1))
                    .frame(width: 44, height: 44)
                
                Text(worker.name.prefix(1).uppercased())
                    .font(.system(size: 18, weight: .medium))
                    .foregroundColor(.accentColor)
            }
            
            VStack(alignment: .leading, spacing: 4) {
                Text(worker.name)
                    .font(.system(size: 17, weight: .regular))
                    .foregroundColor(.primary)
                
                HStack(spacing: 8) {
                    if !worker.jobTitle.isEmpty {
                        Text(worker.jobTitle)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                    
                    if !worker.jobTitle.isEmpty && worker.weeklyHours > 0 {
                        Text("•")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                    
                    if worker.weeklyHours > 0 {
                        Text(totalHours)
                            .font(.system(size: 14, weight: .medium))
                            .foregroundColor(.accentColor)
                    }
                }
            }
            
            Spacer()
            
            if !editMode!.wrappedValue.isEditing {
                Image(systemName: "chevron.right")
                    .font(.system(size: 14, weight: .semibold))
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 8)
        .contentShape(Rectangle())
        .background(Color(uiColor: .systemBackground))
    }
}

// Simple Add Worker View
struct AddWorkerView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var workers: [Employee]
    @State private var name = ""
    @State private var jobTitle = ""
    @State private var shouldShowShiftManager = false
    @State private var newWorker: Employee?
    @FocusState private var focusedField: Field?
    
    enum Field {
        case name
        case jobTitle
    }
    
    var body: some View {
        NavigationView {
            VStack(alignment: .leading, spacing: 0) {
                Text("WORKER INFORMATION")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                    .padding(.bottom, 10)
                
                VStack(spacing: 0) {
                    HStack {
                        Image(systemName: "person.fill")
                            .foregroundColor(.blue)
                            .frame(width: 30)
                        TextField("Name", text: $name)
                            .textContentType(.name)
                            .autocapitalization(.words)
                            .focused($focusedField, equals: .name)
                            .submitLabel(.done)
                    }
                    .padding(.vertical, 12)
                    .padding(.horizontal, 16)
                    .background(Color(uiColor: .systemBackground))
                    
                    Divider()
                    
                    HStack {
                        Image(systemName: "briefcase.fill")
                            .foregroundColor(.blue)
                            .frame(width: 30)
                        TextField("Job Title", text: $jobTitle)
                            .autocapitalization(.words)
                            .focused($focusedField, equals: .jobTitle)
                            .submitLabel(.done)
                    }
                    .padding(.vertical, 12)
                    .padding(.horizontal, 16)
                    .background(Color(uiColor: .systemBackground))
                }
                .background(Color(uiColor: .systemBackground))
                .cornerRadius(10)
                .padding(.horizontal, 16)
                .shadow(color: Color.black.opacity(0.05), radius: 10)
                
                Text("Enter the worker's details to add them to the rota.")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding(.horizontal, 20)
                    .padding(.top, 16)
                
                Spacer()
            }
            .background(Color(uiColor: .systemGroupedBackground))
            .navigationTitle("Add Worker")
            .navigationBarTitleDisplayMode(.large)
            .navigationBarItems(
                leading: Button("Cancel") {
                    dismiss()
                },
                trailing: Button("Save") {
                    let worker = Employee(name: name, jobTitle: jobTitle)
                    withAnimation {
                        workers.append(worker)
                    }
                    newWorker = worker
                    shouldShowShiftManager = true
                }
                .disabled(name.isEmpty)
            )
        }
        .onAppear {
            focusedField = .name
        }
        .sheet(isPresented: $shouldShowShiftManager) {
            if let index = workers.firstIndex(where: { $0.id == newWorker?.id }) {
                NavigationView {
                    AddShiftView(worker: $workers[index], isFirstShift: true)
                }
            }
        }
    }
    
    private func nextField() {
        switch focusedField {
        case .name:
            focusedField = .jobTitle
        case .jobTitle:
            focusedField = nil
        case .none:
            break
        }
    }
}

// 1. Weekly Summary Component
struct WeeklySummaryView: View {
    let weeklyHours: String
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("WEEKLY SUMMARY")
                .sectionHeaderStyle()
            
            SummaryCard(weeklyHours: weeklyHours)
        }
    }
}

// 2. Existing Shifts Component
struct ExistingShiftsView: View {
    @Binding var worker: Employee
    var onEditShift: (Shift) -> Void
    
    var body: some View {
        VStack(alignment: .leading) {
            if !worker.shifts.isEmpty {
                Text("SCHEDULED SHIFTS")
                    .sectionHeaderStyle()
                
                ForEach(worker.shifts.indices, id: \.self) { index in
                    ShiftRowView(shift: worker.shifts[index]) {
                        onEditShift(worker.shifts[index])
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 4)
                }
            }
        }
    }
}

// 3. Add New Shift Component
struct AddNewShiftView: View {
    @Binding var selectedDate: Date
    @Binding var startTime: Date
    @Binding var endTime: Date
    let dayName: String
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("ADD NEW SHIFT")
                .sectionHeaderStyle()
            
            DaySelectionCard(selectedDate: $selectedDate, dayName: dayName)
            TimeSelectionCard(startTime: $startTime, endTime: $endTime)
        }
    }
}

// Main ShiftManagerView
struct ShiftManagerView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var worker: Employee
    @State private var name: String
    @State private var jobTitle: String
    @State private var showingAddShift = false
    @State private var editingShift: Shift?
    @State private var isEditingDetails = false
    
    init(worker: Binding<Employee>) {
        self._worker = worker
        self._name = State(initialValue: worker.wrappedValue.name)
        self._jobTitle = State(initialValue: worker.wrappedValue.jobTitle)
    }
    
    private var weeklyHours: String {
        String(format: "%.1f hours", worker.weeklyHours)
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Worker Details Card with Edit functionality
                VStack(spacing: 0) {
                    HStack {
                        Image(systemName: "person.circle.fill")
                            .foregroundColor(.blue)
                            .font(.system(size: 40))
                        
                        VStack(alignment: .leading, spacing: 4) {
                            if isEditingDetails {
                                TextField("Name", text: $name)
                                    .font(.title2)
                                    .fontWeight(.semibold)
                                    .textFieldStyle(RoundedBorderTextFieldStyle())
                                
                                TextField("Job Title", text: $jobTitle)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                                    .textFieldStyle(RoundedBorderTextFieldStyle())
                            } else {
                                Text(name)
                                    .font(.title2)
                                    .fontWeight(.semibold)
                                
                                Text(jobTitle)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                        }
                        
                        Spacer()
                        
                        Button(action: {
                            if isEditingDetails {
                                // Save changes
                                var updatedWorker = worker
                                updatedWorker.name = name
                                updatedWorker.jobTitle = jobTitle
                                worker = updatedWorker
                            }
                            withAnimation {
                                isEditingDetails.toggle()
                            }
                        }) {
                            Image(systemName: isEditingDetails ? "checkmark.circle.fill" : "pencil.circle.fill")
                                .foregroundColor(.blue)
                                .font(.system(size: 24))
                        }
                    }
                    .padding()
                }
                .background(Color.white)
                .cornerRadius(10)
                .padding(.horizontal, 16)
                .shadow(color: Color.black.opacity(0.05), radius: 10)
                
                // Hours Summary with improved design
                VStack(alignment: .leading, spacing: 8) {
                    Text("WEEKLY SUMMARY")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.horizontal, 20)
                    
                    SummaryCard(weeklyHours: weeklyHours)
                }
                
                // Existing Shifts with improved design
                VStack(alignment: .leading, spacing: 8) {
                    Text("SCHEDULED SHIFTS")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.horizontal, 20)
                    
                    if !worker.shifts.isEmpty {
                        ForEach(worker.shifts) { shift in
                            ShiftRowView(shift: shift) {
                                editingShift = shift
                            }
                            .padding(.horizontal, 16)
                            .swipeActions(edge: .trailing) {
                                Button(role: .destructive) {
                                    deleteShift(shift)
                                } label: {
                                    Label("Delete", systemImage: "trash")
                                }
                            }
                        }
                    } else {
                        Text("No shifts scheduled")
                            .foregroundColor(.gray)
                            .frame(maxWidth: .infinity, alignment: .center)
                            .padding()
                            .background(Color.white.opacity(0.5))
                            .cornerRadius(10)
                            .padding(.horizontal, 16)
                    }
                }
            }
            .padding(.vertical)
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle("Worker Details")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarItems(
            leading: Button("Done") {
                dismiss()
            },
            trailing: Button(action: { showingAddShift = true }) {
                Image(systemName: "plus")
                    .font(.system(size: 17, weight: .semibold))
            }
        )
        .sheet(isPresented: $showingAddShift) {
            NavigationView {
                AddShiftView(worker: $worker)
            }
        }
        .sheet(item: $editingShift) { shift in
            NavigationView {
                AddShiftView(worker: $worker, editingShift: shift)
            }
        }
    }
    
    private func deleteShift(_ shift: Shift) {
        var updatedWorker = worker
        updatedWorker.removeShift(shift)
        worker = updatedWorker
    }
}

// New Add Shift View
struct AddShiftView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var worker: Employee
    @State private var selectedDate: Date
    @State private var startTime: Date
    @State private var endTime: Date
    let editingShift: Shift?
    let isFirstShift: Bool
    
    private var shiftDuration: Double {
        let duration = endTime.timeIntervalSince(startTime)
        return duration / 3600 // Convert to hours
    }
    
    private let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    init(worker: Binding<Employee>, editingShift: Shift? = nil, isFirstShift: Bool = false) {
        self._worker = worker
        self.editingShift = editingShift
        self.isFirstShift = isFirstShift
        
        if let shift = editingShift {
            _selectedDate = State(initialValue: shift.startTime)
            _startTime = State(initialValue: shift.startTime)
            _endTime = State(initialValue: shift.endTime)
        } else {
            _selectedDate = State(initialValue: Date())
            _startTime = State(initialValue: Date())
            _endTime = State(initialValue: Calendar.current.date(byAdding: .hour, value: 8, to: Date()) ?? Date())
        }
    }
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // Day Selection Section
                VStack(alignment: .leading, spacing: 8) {
                    Text("SELECT DAY")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.horizontal, 20)
                    
                    VStack(spacing: 0) {
                        ForEach(days, id: \.self) { day in
                            Button(action: {
                                if let date = nextDate(for: day) {
                                    selectedDate = date
                                    adjustTimesToSelectedDate()
                                }
                            }) {
                                HStack {
                                    Text(day)
                                        .foregroundColor(.primary)
                                    Spacer()
                                    if isDaySelected(day) {
                                        Image(systemName: "checkmark")
                                            .foregroundColor(.blue)
                                    }
                                }
                                .padding(.vertical, 12)
                                .padding(.horizontal, 16)
                            }
                            if day != days.last {
                                Divider()
                                    .padding(.horizontal, 16)
                            }
                        }
                    }
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(10)
                    .shadow(color: .black.opacity(0.05), radius: 5)
                    .padding(.horizontal, 16)
                }
                
                // Time Selection Section
                VStack(alignment: .leading, spacing: 8) {
                    Text("SET TIME")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .textCase(.uppercase)
                    
                    VStack(spacing: 16) {
                        // Start Time
                        HStack {
                            Image(systemName: "clock")
                                .foregroundColor(.accentColor)
                                .frame(width: 30)
                            Text("Start")
                                .font(.body)
                            Spacer()
                            DatePicker("", selection: $startTime, displayedComponents: .hourAndMinute)
                                .labelsHidden()
                                .onChange(of: startTime) { _ in
                                    if endTime < startTime {
                                        endTime = Calendar.current.date(byAdding: .hour, value: 8, to: startTime) ?? startTime
                                    }
                                }
                        }
                        
                        Divider()
                        
                        // End Time
                        HStack {
                            Image(systemName: "clock.fill")
                                .foregroundColor(.accentColor)
                                .frame(width: 30)
                            Text("End")
                                .font(.body)
                            Spacer()
                            DatePicker("", selection: $endTime, displayedComponents: .hourAndMinute)
                                .labelsHidden()
                        }
                    }
                    .padding(.vertical, 12)
                    .padding(.horizontal, 16)
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(10)
                    .shadow(color: .black.opacity(0.05), radius: 5)
                }
                .padding(.horizontal, 16)
                
                // Duration Summary
                VStack(alignment: .leading, spacing: 8) {
                    Text("DURATION")
                        .font(.caption)
                        .foregroundColor(.gray)
                        .padding(.horizontal, 20)
                    
                    HStack {
                        Image(systemName: "hourglass")
                            .foregroundColor(.blue)
                            .frame(width: 30)
                        Text("Total Hours:")
                        Spacer()
                        Text(String(format: "%.1f hours", shiftDuration))
                            .foregroundColor(.blue)
                            .fontWeight(.medium)
        }
        .padding()
                    .background(Color(uiColor: .systemBackground))
                    .cornerRadius(10)
                    .shadow(color: .black.opacity(0.05), radius: 5)
                    .padding(.horizontal, 16)
                }
            }
            .padding(.vertical)
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle(editingShift == nil ? "Add Shift" : "Edit Shift")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarItems(
            leading: Button("Cancel") {
                if isFirstShift {
                    // Remove this condition since we can't directly check UUID
                    // The worker removal should be handled at a higher level
                }
                dismiss()
            },
            trailing: Button(editingShift == nil ? "Add" : "Save") {
                saveShift()
            }
            .font(.body.bold())
        )
    }
    
    private func adjustTimesToSelectedDate() {
        let calendar = Calendar.current
        let startComponents = calendar.dateComponents([.hour, .minute], from: startTime)
        let endComponents = calendar.dateComponents([.hour, .minute], from: endTime)
        
        if let newStartTime = calendar.date(bySettingHour: startComponents.hour ?? 0,
                                         minute: startComponents.minute ?? 0,
                                         second: 0,
                                         of: selectedDate) {
            startTime = newStartTime
        }
        
        if let newEndTime = calendar.date(bySettingHour: endComponents.hour ?? 0,
                                       minute: endComponents.minute ?? 0,
                                       second: 0,
                                       of: selectedDate) {
            endTime = newEndTime
        }
    }
    
    private func saveShift() {
        var newShift = Shift(startTime: startTime, endTime: endTime)
        adjustTimesToSelectedDate()
        
        var updatedWorker = worker
        if let editingShift = editingShift {
            updatedWorker.updateShift(newShift)
        } else {
            updatedWorker.addShift(newShift)
        }
        worker = updatedWorker
        
        if isFirstShift {
            dismiss()
            // Post notification to dismiss add worker view
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                NotificationCenter.default.post(name: NSNotification.Name("DismissAddWorker"), object: nil)
            }
        } else {
            dismiss()
        }
    }
    
    private func isDaySelected(_ day: String) -> Bool {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        return formatter.string(from: selectedDate) == day
    }
    
    private func nextDate(for day: String) -> Date? {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        
        // Find the next occurrence of the selected day
        var date = Date()
        for _ in 0..<7 {
            if formatter.string(from: date) == day {
                return date
            }
            date = calendar.date(byAdding: .day, value: 1, to: date) ?? date
        }
        return nil
    }
}

// Helper ViewModifier for consistent section header styling
struct SectionHeaderStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.subheadline)
            .foregroundColor(.gray)
            .padding(.horizontal, 20)
            .padding(.top, 20)
            .padding(.bottom, 10)
    }
}

extension View {
    func sectionHeaderStyle() -> some View {
        modifier(SectionHeaderStyle())
    }
}

struct ShiftRowView: View {
    let shift: Shift
    var onEdit: () -> Void
    
    private var timeString: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "h:mm a"
        return "\(formatter.string(from: shift.startTime)) - \(formatter.string(from: shift.endTime))"
    }
    
    private var dayString: String {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        return formatter.string(from: shift.startTime)
    }
    
    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text(dayString)
                    .font(.system(size: 17, weight: .medium))
                Text(timeString)
                    .font(.system(size: 15))
                    .foregroundColor(.gray)
            }
            
            Spacer()
            
            Button(action: onEdit) {
                Image(systemName: "pencil.circle.fill")
                    .foregroundColor(.blue)
                    .font(.system(size: 24))
            }
        }
        .padding(.vertical, 12)
        .padding(.horizontal, 16)
        .background(Color.white)
        .cornerRadius(10)
        .shadow(color: Color.black.opacity(0.05), radius: 5)
    }
}

struct SummaryCard: View {
    let weeklyHours: String
    
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Image(systemName: "clock.badge.checkmark")
                    .foregroundColor(.blue)
                    .frame(width: 30)
                Text("Total Hours:")
                Spacer()
                Text(weeklyHours)
                    .foregroundColor(.blue)
                    .fontWeight(.medium)
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 16)
            .background(Color.white)
        }
        .background(Color.white)
        .cornerRadius(10)
        .padding(.horizontal, 16)
        .shadow(color: Color.black.opacity(0.05), radius: 10)
    }
}

struct DaySelectionCard: View {
    @Binding var selectedDate: Date
    let dayName: String
    @State private var isExpanded = false
    private let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    var body: some View {
        VStack(spacing: 0) {
            // Header button that triggers dropdown
            Button(action: {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                    isExpanded.toggle()
                }
            }) {
                HStack {
                    Image(systemName: "calendar")
                        .foregroundColor(.blue)
                        .frame(width: 30)
                    Text("Day:")
                    Spacer()
                    Text(dayName)
                        .foregroundColor(.primary)
                    Image(systemName: "chevron.down")
                        .foregroundColor(.blue)
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                }
                .padding(.vertical, 12)
                .padding(.horizontal, 16)
                .background(Color(uiColor: .systemBackground))
            }
            
            // Dropdown content
            if isExpanded {
                VStack(spacing: 0) {
                    ForEach(days, id: \.self) { day in
                        Button(action: {
                            if let date = nextDate(for: day) {
                                selectedDate = date
                                withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                                    isExpanded = false
                                }
                            }
                        }) {
                            HStack {
                                Text(day)
                                    .foregroundColor(.primary)
                                Spacer()
                                if isDaySelected(day) {
                                    Image(systemName: "checkmark")
                                        .foregroundColor(.blue)
                                }
                            }
                            .padding(.vertical, 12)
                            .padding(.horizontal, 16)
                            .background(isDaySelected(day) ? Color.blue.opacity(0.1) : Color(uiColor: .systemBackground))
                        }
                        
                        if day != days.last {
                            Divider()
                                .padding(.horizontal, 16)
                        }
                    }
                }
                .transition(.move(edge: .top).combined(with: .opacity))
            }
        }
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(10)
        .padding(.horizontal, 16)
        .shadow(color: .black.opacity(0.05), radius: 10)
    }
    
    private func isDaySelected(_ day: String) -> Bool {
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        return formatter.string(from: selectedDate) == day
    }
    
    private func nextDate(for day: String) -> Date? {
        let calendar = Calendar.current
        let formatter = DateFormatter()
        formatter.dateFormat = "EEEE"
        
        var date = Date()
        for _ in 0..<7 {
            if formatter.string(from: date) == day {
                return date
            }
            date = calendar.date(byAdding: .day, value: 1, to: date) ?? date
        }
        return nil
    }
}

struct TimeSelectionCard: View {
    @Binding var startTime: Date
    @Binding var endTime: Date
    
    var body: some View {
        VStack(spacing: 0) {
            HStack {
                Image(systemName: "clock")
                    .foregroundColor(.blue)
                    .frame(width: 30)
                Text("Start:")
                    .infoLabelStyle()
                Spacer()
                DatePicker("", selection: $startTime, displayedComponents: .hourAndMinute)
                    .labelsHidden()
                Text("-")
                DatePicker("", selection: $endTime, displayedComponents: .hourAndMinute)
                    .labelsHidden()
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 16)
            .background(Color(uiColor: .systemBackground))
        }
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(10)
        .padding(.horizontal, 16)
        .shadow(color: Color.black.opacity(0.05), radius: 10)
    }
}

// Add this new EmptyStateView
struct EmptyStateView: View {
    @State private var isAnimating = false
    
    var body: some View {
        VStack(spacing: 24) {
            // Animated icon
            ZStack {
                Circle()
                    .fill(Color.accentColor.opacity(0.1))
                    .frame(width: 120, height: 120)
                    .scaleEffect(isAnimating ? 1.1 : 1.0)
                
                Image(systemName: "person.3.fill")
                    .font(.system(size: 50))
                    .foregroundColor(.accentColor)
                    .opacity(isAnimating ? 1.0 : 0.7)
                    .scaleEffect(isAnimating ? 1.0 : 0.9)
            }
            .animation(
                Animation.easeInOut(duration: 1.5)
                    .repeatForever(autoreverses: true),
                value: isAnimating
            )
            
            VStack(spacing: 16) {
                Text("No Workers Yet")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text("Start by adding your first worker\nto manage their shifts")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
        }
        .onAppear {
            isAnimating = true
        }
    }
}

// PDF Generation
class PDFRenderer {
    let workers: [Employee]
    let companyInfo: CompanyInfo
    
    init(workers: [Employee], companyInfo: CompanyInfo) {
        self.workers = workers
        self.companyInfo = companyInfo
    }
    
    private func formatShiftTime(_ shift: Shift) -> String {
        let timeFormatter = DateFormatter()
        timeFormatter.dateFormat = "h:mm a"  // This will format like "2:30 PM"
        
        let dayFormatter = DateFormatter()
        dayFormatter.dateFormat = "EEEE"  // This will give us full day name
        
        let day = dayFormatter.string(from: shift.startTime)
        let startTime = timeFormatter.string(from: shift.startTime)
        let endTime = timeFormatter.string(from: shift.endTime)
        
        return "\(day): \(startTime) - \(endTime)"
    }
    
    func generatePDF() -> Data {
        let pageWidth: CGFloat = 612  // 8.5 x 11 inches at 72 DPI
        let pageHeight: CGFloat = 792
        let margins: CGFloat = 50
        
        let data = NSMutableData()
        
        // Create PDF context
        UIGraphicsBeginPDFContextToData(data, CGRect(x: 0, y: 0, width: pageWidth, height: pageHeight), nil)
        UIGraphicsBeginPDFPage()
        
        let context = UIGraphicsGetCurrentContext()!
        
        // Force light mode for PDF generation
        UITraitCollection(userInterfaceStyle: .light).performAsCurrent {
            // Page number and date at the top
            let pageNumberFont = UIFont.systemFont(ofSize: 12)
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "dd MMMM yyyy"
            
            "1 of 2".draw(at: CGPoint(x: margins, y: margins),
                         withAttributes: [.font: pageNumberFont])
            
            "Date: \(dateFormatter.string(from: Date()))".draw(
                at: CGPoint(x: pageWidth - margins - 200, y: margins),
                withAttributes: [.font: pageNumberFont]
            )
            
            // Company Info - Centered
            let titleFont = UIFont.boldSystemFont(ofSize: 24)
            let normalFont = UIFont.systemFont(ofSize: 14)
            
            let titleAttributes: [NSAttributedString.Key: Any] = [
                .font: titleFont,
                .paragraphStyle: {
                    let style = NSMutableParagraphStyle()
                    style.alignment = .center
                    return style
                }()
            ]
            
            let normalAttributes: [NSAttributedString.Key: Any] = [
                .font: normalFont,
                .paragraphStyle: {
                    let style = NSMutableParagraphStyle()
                    style.alignment = .center
                    return style
                }()
            ]
            
            // Draw centered company info
            let companyNameRect = CGRect(x: margins, y: margins + 40,
                                       width: pageWidth - (margins * 2), height: 30)
            companyInfo.name.draw(in: companyNameRect, withAttributes: titleAttributes)
            
            let addressRect = CGRect(x: margins, y: margins + 70,
                                   width: pageWidth - (margins * 2), height: 20)
            companyInfo.address.draw(in: addressRect, withAttributes: normalAttributes)
            
            let emailRect = CGRect(x: margins, y: margins + 90,
                                 width: pageWidth - (margins * 2), height: 20)
            companyInfo.email.draw(in: emailRect, withAttributes: normalAttributes)
            
            let phoneRect = CGRect(x: margins, y: margins + 110,
                                 width: pageWidth - (margins * 2), height: 20)
            companyInfo.phone.draw(in: phoneRect, withAttributes: normalAttributes)
            
            // Worker Schedule Report title
            let reportTitleRect = CGRect(x: margins, y: margins + 160,
                                       width: pageWidth - (margins * 2), height: 30)
            "Worker Schedule Report".draw(in: reportTitleRect, withAttributes: [
                .font: UIFont.boldSystemFont(ofSize: 18),
                .paragraphStyle: {
                    let style = NSMutableParagraphStyle()
                    style.alignment = .center
                    return style
                }()
            ])
            
            // Table headers
            let startY = margins + 220
            let rowHeight: CGFloat = 80
            let columnSpacing: CGFloat = 20
            
            // Draw table borders and headers
            let nameWidth: CGFloat = 150
            let scheduleWidth: CGFloat = pageWidth - margins - nameWidth - margins - 100 // 100 for hours column
            let hoursWidth: CGFloat = 100
            
            // Draw header row
            context.setStrokeColor(UIColor.black.cgColor)
            context.setLineWidth(1.0)
            
            // Header cells
            let headerFont = UIFont.boldSystemFont(ofSize: 14)
            let headerAttributes: [NSAttributedString.Key: Any] = [
                .font: headerFont
            ]
            
            "Name".draw(at: CGPoint(x: margins + 10, y: startY - 25),
                       withAttributes: headerAttributes)
            "Schedule".draw(at: CGPoint(x: margins + nameWidth + columnSpacing, y: startY - 25),
                          withAttributes: headerAttributes)
            "Total Hours".draw(at: CGPoint(x: pageWidth - margins - hoursWidth + 10, y: startY - 25),
                             withAttributes: headerAttributes)
            
            // Draw content for each worker
            var currentY = startY
            
            for worker in workers {
                // Draw cell borders
                drawTableRow(context: context, y: currentY, pageWidth: pageWidth, margins: margins,
                           nameWidth: nameWidth, scheduleWidth: scheduleWidth)
                
                // Draw worker info
                let cellPadding: CGFloat = 10
                let workerNameAttributes: [NSAttributedString.Key: Any] = [
                    .font: UIFont.systemFont(ofSize: 14, weight: .medium)
                ]
                
                // Name and job title
                let nameY = currentY + cellPadding
                worker.name.draw(at: CGPoint(x: margins + cellPadding, y: nameY),
                               withAttributes: workerNameAttributes)
                
                if !worker.jobTitle.isEmpty {
                    worker.jobTitle.draw(
                        at: CGPoint(x: margins + cellPadding, y: nameY + 20),
                        withAttributes: [.font: UIFont.systemFont(ofSize: 12),
                                       .foregroundColor: UIColor.darkGray]
                    )
                }
                
                // Shifts
                let shiftsX = margins + nameWidth + columnSpacing
                var shiftY = nameY
                
                for shift in worker.shifts {
                    let shiftText = formatShiftTime(shift)
                    shiftText.draw(at: CGPoint(x: shiftsX, y: shiftY),
                                 withAttributes: [.font: UIFont.systemFont(ofSize: 14)])
                    shiftY += 20
                }
                
                // Hours
                let hoursText = String(format: "%.1f hours", worker.weeklyHours)
                hoursText.draw(
                    at: CGPoint(x: pageWidth - margins - hoursWidth + cellPadding, y: nameY),
                    withAttributes: [.font: UIFont.systemFont(ofSize: 14)]
                )
                
                currentY += rowHeight
            }
            
            // After drawing all workers and before ending PDF context
            // Add director name at bottom right
            let directorText = "Director: \(companyInfo.directorName)"
            let directorFont = UIFont.systemFont(ofSize: 12)
            let directorAttributes: [NSAttributedString.Key: Any] = [
                .font: directorFont
            ]
            
            let directorSize = directorText.size(withAttributes: directorAttributes)
            let directorX = pageWidth - margins - directorSize.width
            let directorY = pageHeight - margins - directorSize.height
            
            directorText.draw(
                at: CGPoint(x: directorX, y: directorY),
                withAttributes: directorAttributes
            )
        }
        
        UIGraphicsEndPDFContext()
        return data as Data
    }
    
    private func drawTableRow(context: CGContext, y: CGFloat, pageWidth: CGFloat, margins: CGFloat,
                            nameWidth: CGFloat, scheduleWidth: CGFloat) {
        let hoursWidth: CGFloat = 100
        let rowHeight: CGFloat = 80
        
        // Draw horizontal lines
        context.move(to: CGPoint(x: margins, y: y))
        context.addLine(to: CGPoint(x: pageWidth - margins, y: y))
        context.move(to: CGPoint(x: margins, y: y + rowHeight))
        context.addLine(to: CGPoint(x: pageWidth - margins, y: y + rowHeight))
        
        // Draw vertical lines
        context.move(to: CGPoint(x: margins, y: y))
        context.addLine(to: CGPoint(x: margins, y: y + rowHeight))
        
        context.move(to: CGPoint(x: margins + nameWidth, y: y))
        context.addLine(to: CGPoint(x: margins + nameWidth, y: y + rowHeight))
        
        context.move(to: CGPoint(x: pageWidth - margins - hoursWidth, y: y))
        context.addLine(to: CGPoint(x: pageWidth - margins - hoursWidth, y: y + rowHeight))
        
        context.move(to: CGPoint(x: pageWidth - margins, y: y))
        context.addLine(to: CGPoint(x: pageWidth - margins, y: y + rowHeight))
        
        context.strokePath()
    }
}

// Share Sheet
struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        let controller = UIActivityViewController(activityItems: items, applicationActivities: nil)
        return controller
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// Company Settings View
struct CompanySettingsView: View {
    @Environment(\.dismiss) private var dismiss
    @Binding var companyInfo: CompanyInfo
    @Binding var companyInfoData: Data
    
    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Company Information")) {
                    TextField("Company Name", text: $companyInfo.name)
                    TextField("Address", text: $companyInfo.address)
                    TextField("Email", text: $companyInfo.email)
                        .keyboardType(.emailAddress)
                    TextField("Phone", text: $companyInfo.phone)
                        .keyboardType(.phonePad)
                }
                
                Section(header: Text("Authorization")) {
                    TextField("Director Name", text: $companyInfo.directorName)
                        .textContentType(.name)
                        .autocapitalization(.words)
                }
            }
            .navigationTitle("Company Settings")
            .navigationBarItems(
                trailing: Button("Done") {
                    // Save company info when dismissing
                    if let encoded = try? JSONEncoder().encode(companyInfo) {
                        companyInfoData = encoded
                    }
                    dismiss()
                }
            )
        }
    }
}

struct SettingsView: View {
    @Environment(\.openURL) var openURL
    @Environment(\.dismiss) private var dismiss
    @State private var showingPrivacyPolicy = false
    @State private var showingTerms = false
    @State private var showingHowToUse = false
    @State private var showingTips = false
    
    var body: some View {
        NavigationView {
            List {
                // Features Section
                Section {
                    FeatureRow(
                        icon: "person.3.fill",
                        title: "Employee Management",
                        description: "Add, edit, and organize your staff"
                    )
                    FeatureRow(
                        icon: "calendar",
                        title: "Shift Planning",
                        description: "Easily schedule and manage shifts"
                    )
                    FeatureRow(
                        icon: "doc.text.fill",
                        title: "PDF Export",
                        description: "Export rotas in professional PDF format"
                    )
                } header: {
                    Text("Features")
                }
                
                // How to Use Section
                Section(header: Text("How to Use")) {
                    Button {
                        showingHowToUse = true
                    } label: {
                        Label("Quick Start Guide", systemImage: "book.fill")
                    }
                    
                    Button {
                        showingTips = true
                    } label: {
                        Label("Tips & Tricks", systemImage: "lightbulb.fill")
                    }
                }
                
                // Support Section
                Section(header: Text("Support")) {
                    Button {
                        openURL(URL(string: "mailto:sheakhappstudio@icloud.com")!)
                    } label: {
                        Label("Contact Support", systemImage: "envelope.fill")
                    }
                    
                    Button {
                        if let url = URL(string: "https://apps.apple.com/app/id<your-app-id>") {
                            openURL(url)
                        }
                    } label: {
                        Label("Rate on App Store", systemImage: "star.fill")
                    }
                }
                
                // Legal Section
                Section(header: Text("Legal")) {
                    Button(action: { showingPrivacyPolicy = true }) {
                        Label("Privacy Policy", systemImage: "lock.shield")
                    }
                    
                    Button(action: { showingTerms = true }) {
                        Label("Terms of Use", systemImage: "doc.text")
                    }
                }
                
                // About Section
                Section {
                    HStack {
                        Text("Version")
                        Spacer()
                        Text(Bundle.main.appVersion)
                            .foregroundColor(.secondary)
                    }
                } header: {
                    Text("About")
                }
            }
            .navigationTitle("Settings")
            .navigationBarItems(trailing: Button("Done") {
                dismiss()
            })
        }
        .sheet(isPresented: $showingPrivacyPolicy) {
            PrivacyPolicyView()
        }
        .sheet(isPresented: $showingTerms) {
            TermsOfUseView()
        }
        .sheet(isPresented: $showingHowToUse) {
            NavigationView {
                HowToUseView()
            }
        }
        .sheet(isPresented: $showingTips) {
            NavigationView {
                TipsView()
            }
        }
    }
}

// Supporting Views
struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.accentColor)
                .frame(width: 32)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.body)
                    .fontWeight(.medium)
                
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    ContentView()
}
