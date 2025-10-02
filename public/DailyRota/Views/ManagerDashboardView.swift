//
//  ManagerDashboardView.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import SwiftUI

struct ManagerDashboardView: View {
    @EnvironmentObject var dataManager: DataManager
    @State private var selectedTab = 0
    
    private let authService = AuthService()
    
    var body: some View {
        TabView(selection: $selectedTab) {
            // Rotas Tab
            NavigationView {
                Text("Manage Rotas")
                    .navigationTitle("Rotas")
                    .navigationBarItems(trailing: Button(action: {
                        // Action to create new rota
                    }) {
                        Image(systemName: "plus")
                    })
            }
            .tabItem {
                Label("Rotas", systemImage: "calendar")
            }
            .tag(0)
            
            // Workers Tab
            NavigationView {
                Text("View Workers")
                    .navigationTitle("Workers")
            }
            .tabItem {
                Label("Workers", systemImage: "person.3")
            }
            .tag(1)
            
            // Tasks Tab
            NavigationView {
                Text("Manage Tasks")
                    .navigationTitle("Tasks")
                    .navigationBarItems(trailing: Button(action: {
                        // Action to create new task
                    }) {
                        Image(systemName: "plus")
                    })
            }
            .tabItem {
                Label("Tasks", systemImage: "checklist")
            }
            .tag(2)
            
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
            .tag(3)
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

struct ManagerDashboardView_Previews: PreviewProvider {
    static var previews: some View {
        ManagerDashboardView()
            .environmentObject(DataManager())
    }
} 