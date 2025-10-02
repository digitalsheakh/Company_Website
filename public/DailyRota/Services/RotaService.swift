//
//  RotaService.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import Firebase
import FirebaseFirestore
import FirebaseFirestoreSwift

class RotaService {
    private let db = Firestore.firestore()
    
    func createRota(rota: Rota, completion: @escaping (Result<Rota, Error>) -> Void) {
        do {
            var newRota = rota
            let docRef = db.collection("rotas").document()
            newRota.id = docRef.documentID
            
            try docRef.setData(from: newRota)
            completion(.success(newRota))
        } catch {
            completion(.failure(error))
        }
    }
    
    func updateRota(rota: Rota, completion: @escaping (Result<Rota, Error>) -> Void) {
        guard let rotaId = rota.id else {
            completion(.failure(NSError(domain: "RotaService", code: 0, userInfo: [NSLocalizedDescriptionKey: "Rota ID is missing"])))
            return
        }
        
        do {
            var updatedRota = rota
            updatedRota.updatedAt = Date()
            
            try db.collection("rotas").document(rotaId).setData(from: updatedRota)
            completion(.success(updatedRota))
        } catch {
            completion(.failure(error))
        }
    }
    
    func fetchRotas(completion: @escaping (Result<[Rota], Error>) -> Void) {
        db.collection("rotas")
            .order(by: "startDate", descending: true)
            .getDocuments { snapshot, error in
                if let error = error {
                    completion(.failure(error))
                    return
                }
                
                do {
                    let rotas = try snapshot?.documents.compactMap {
                        try $0.data(as: Rota.self)
                    } ?? []
                    
                    completion(.success(rotas))
                } catch {
                    completion(.failure(error))
                }
            }
    }
    
    func fetchRotaById(rotaId: String, completion: @escaping (Result<Rota, Error>) -> Void) {
        db.collection("rotas").document(rotaId).getDocument { snapshot, error in
            if let error = error {
                completion(.failure(error))
                return
            }
            
            do {
                if let snapshot = snapshot, snapshot.exists, let rota = try? snapshot.data(as: Rota.self) {
                    completion(.success(rota))
                } else {
                    completion(.failure(NSError(domain: "RotaService", code: 0, userInfo: [NSLocalizedDescriptionKey: "Rota not found"])))
                }
            }
        }
    }
    
    func deleteRota(rotaId: String, completion: @escaping (Result<Void, Error>) -> Void) {
        db.collection("rotas").document(rotaId).delete { error in
            if let error = error {
                completion(.failure(error))
            } else {
                completion(.success(()))
            }
        }
    }
} 