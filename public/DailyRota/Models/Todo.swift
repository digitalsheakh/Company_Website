//
//  Todo.swift
//  Daily Rota
//
//  Created for Daily Rota app
//

import Foundation
import FirebaseFirestoreSwift

enum TodoPriority: String, Codable, CaseIterable {
    case low
    case medium
    case high
}

enum TodoStatus: String, Codable, CaseIterable {
    case pending
    case inProgress = "in_progress"
    case completed
}

struct Todo: Identifiable, Codable {
    @DocumentID var id: String?
    var title: String
    var description: String?
    var assignedTo: String?
    var dueDate: Date?
    var priority: TodoPriority = .medium
    var status: TodoStatus = .pending
    var createdBy: String
    var createdAt: Date = Date()
    var updatedAt: Date = Date()
} 