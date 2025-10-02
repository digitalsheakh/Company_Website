//
//  AuthService.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import Firebase
import FirebaseFirestore
import FirebaseAuth

class AuthService {
    private let db = Firestore.firestore()
    
    func signIn(email: String, password: String, completion: @escaping (Result<User, Error>) -> Void) {
        Auth.auth().signIn(withEmail: email, password: password) { authResult, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let userId = authResult?.user.uid else {
                completion(.failure(NSError(domain: "AuthService", code: 0, userInfo: [NSLocalizedDescriptionKey: "User ID not found"])))
                return
            }
            
            self.fetchUserData(userId: userId, completion: completion)
        }
    }
    
    func signUp(email: String, password: String, name: String, role: UserRole, completion: @escaping (Result<User, Error>) -> Void) {
        Auth.auth().createUser(withEmail: email, password: password) { authResult, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            guard let userId = authResult?.user.uid else {
                completion(.failure(NSError(domain: "AuthService", code: 0, userInfo: [NSLocalizedDescriptionKey: "User ID not found"])))
                return
            }
            
            let newUser = User(
                id: userId,
                email: email,
                name: name,
                role: role
            )
            
            do {
                try self.db.collection("users").document(userId).setData(from: newUser)
                completion(.success(newUser))
            } catch {
                completion(.failure(error))
            }
        }
    }
    
    func signOut() throws {
        try Auth.auth().signOut()
    }
    
    private func fetchUserData(userId: String, completion: @escaping (Result<User, Error>) -> Void) {
        db.collection("users").document(userId).getDocument { snapshot, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            do {
                if let snapshot = snapshot, snapshot.exists, let user = try? snapshot.data(as: User.self) {
                    completion(.success(user))
                } else {
                    completion(.failure(NSError(domain: "AuthService", code: 0, userInfo: [NSLocalizedDescriptionKey: "User data not found"])))
                }
            }
        }
    }
} 