//
//  WorkerDashboardView.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import SwiftUI

struct WorkerDashboardView: View {
    @EnvironmentObject var dataManager: DataManager
    @State private var selectedTab = 0
    
    private let authService = AuthService()
    
    var body: some View {
        TabView(selection: $selectedTab) {
            // My Schedule Tab
            NavigationView {
                Text("View My Schedule")
                    .navigationTitle("My Schedule")
            }
            .tabItem {
                Label("Schedule", systemImage: "calendar")
            }
            .tag(0)
            
            // Tasks Tab
            NavigationView {
                Text("My Assigned Tasks")
                    .navigationTitle("Tasks")
            }
            .tabItem {
                Label("Tasks", systemImage: "checklist")
            }
            .tag(1)
            
            // Settings Tab
            NavigationView {
                List {
                    Section(header: Text("Account")) {
                        if let user = dataManager.currentUser {
                            Text("Name: \(user.name)")
                            Text("Email: \(user.email)")
                            Text("Role: \(user.role.rawValue.capitalized)")
                        }
                    }
                    
                    Section {
                        Button("Sign Out") {
                            signOut()
                        }
                        .foregroundColor(.red)
                    }
                }
                .navigationTitle("Settings")
            }
            .tabItem {
                Label("Settings", systemImage: "gear")
            }
            .tag(2)
        }
    }
    
    private func signOut() {
        do {
            try authService.signOut()
        } catch {
            print("Error signing out: \(error.localizedDescription)")
        }
    }
}

struct WorkerDashboardView_Previews: PreviewProvider {
    static var previews: some View {
        WorkerDashboardView()
            .environmentObject(DataManager())
    }
} 