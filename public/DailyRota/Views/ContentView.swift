//
//  ContentView.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var dataManager: DataManager
    
    var body: some View {
        NavigationView {
            Group {
                if dataManager.isLoading {
                    ProgressView("Loading...")
                } else if dataManager.isAuthenticated, let user = dataManager.currentUser {
                    switch user.role {
                    case .owner:
                        OwnerDashboardView()
                    case .manager:
                        ManagerDashboardView()
                    case .worker:
                        WorkerDashboardView()
                    }
                } else {
                    LoginView()
                }
            }
            .navigationTitle("Daily Rota")
            .alert(item: Binding<AlertItem?>(
                get: { 
                    if let errorMessage = dataManager.errorMessage {
                        return AlertItem(message: errorMessage)
                    }
                    return nil
                },
                set: { _ in dataManager.errorMessage = nil }
            )) { alertItem in
                Alert(
                    title: Text("Error"),
                    message: Text(alertItem.message),
                    dismissButton: .default(Text("OK"))
                )
            }
        }
    }
}

struct AlertItem: Identifiable {
    var id = UUID()
    var message: String
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .environmentObject(DataManager())
    }
} 