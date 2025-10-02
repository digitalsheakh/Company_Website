//
//  DataManager.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import Firebase
import FirebaseFirestore
import FirebaseFirestoreSwift
import Combine

class DataManager: ObservableObject {
    @Published var currentUser: User?
    @Published var isAuthenticated = false
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    private let db = Firestore.firestore()
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        setupAuthStateListener()
    }
    
    private func setupAuthStateListener() {
        Auth.auth().addStateDidChangeListener { [weak self] _, user in
            guard let self = self else { return }
            
            if let user = user {
                self.isAuthenticated = true
                self.fetchUserData(userId: user.uid)
            } else {
                self.isAuthenticated = false
                self.currentUser = nil
            }
        }
    }
    
    private func fetchUserData(userId: String) {
        isLoading = true
        
        db.collection("users").document(userId).getDocument { [weak self] snapshot, error in
            guard let self = self else { return }
            self.isLoading = false
            
            if let error = error {
                self.errorMessage = "Error fetching user data: \(error.localizedDescription)"
                return
            }
            
            do {
                if let snapshot = snapshot, snapshot.exists {
                    self.currentUser = try snapshot.data(as: User.self)
                }
            } catch {
                self.errorMessage = "Error decoding user data: \(error.localizedDescription)"
            }
        }
    }
} 