//
//  User.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import FirebaseFirestoreSwift

enum UserRole: String, Codable {
    case owner
    case manager
    case worker
}

struct User: Identifiable, Codable {
    @DocumentID var id: String?
    var email: String
    var name: String
    var role: UserRole
    var phoneNumber: String?
    var profileImageURL: String?
    var isActive: Bool = true
    var createdAt: Date = Date()
    
    enum CodingKeys: String, CodingKey {
        case id
        case email
        case name
        case role
        case phoneNumber
        case profileImageURL
        case isActive
        case createdAt
    }
} 