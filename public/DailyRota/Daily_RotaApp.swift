//
//  Daily_RotaApp.swift
//  Daily Rota
//
//  Created by Sheakh Emon on 23/12/2024.
//
// Note: Add GoogleService-Info.plist to the project root after downloading from Firebase Console

import SwiftUI
import Firebase

@main
struct Daily_RotaApp: App {
    @StateObject private var dataManager = DataManager()
    
    init() {
        // Configure Firebase
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(dataManager)
        }
    }
} 