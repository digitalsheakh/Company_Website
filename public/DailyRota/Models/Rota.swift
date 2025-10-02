//
//  Rota.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import FirebaseFirestoreSwift

struct Rota: Identifiable, Codable {
    @DocumentID var id: String?
    var title: String
    var startDate: Date
    var endDate: Date
    var assignments: [Assignment]
    var notes: String?
    var createdBy: String
    var createdAt: Date = Date()
    var updatedAt: Date = Date()
    
    struct Assignment: Identifiable, Codable {
        var id = UUID().uuidString
        var workerId: String
        var shifts: [Shift]
        
        struct Shift: Identifiable, Codable {
            var id = UUID().uuidString
            var date: Date
            var startTime: Date
            var endTime: Date
            var location: String?
            var notes: String?
        }
    }
} 