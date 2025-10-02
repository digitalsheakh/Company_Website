# Daily Rota - Worker Rota Management App

Daily Rota is an iOS application designed to help businesses manage worker schedules, tasks, and generate reports.

## Features

- User authentication with different roles (Owner, Manager, Worker)
- Rota creation and management
- Task assignment and tracking
- PDF report generation
- User management

## Setup Instructions

### Prerequisites

- Xcode 13.0 or later
- CocoaPods
- iOS 15.0 or later
- Firebase account

### Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add an iOS app to your Firebase project
   - Use the bundle identifier from your Xcode project
   - Download the `GoogleService-Info.plist` file
4. Add the `GoogleService-Info.plist` file to your Xcode project root

### Installation

1. Clone the repository
2. Navigate to the project directory in Terminal
3. Install dependencies:
   ```
   pod install
   ```
4. Open the `.xcworkspace` file in Xcode
5. Build and run the project

### Firebase Authentication Setup

1. In the Firebase Console, go to Authentication
2. Enable Email/Password authentication
3. Optionally, add test users or enable other authentication methods

### Firestore Database Setup

1. In the Firebase Console, go to Firestore Database
2. Create a new database in test mode
3. Set up the following collections:
   - `users`
   - `rotas`
   - `todos`

## Project Structure

- `/Models` - Data models (User, Rota, Todo)
- `/Views` - SwiftUI views for different screens
- `/Services` - Firebase services (Auth, Rota, etc.)
- `/Utilities` - Helper functions and utilities

## License

This project is licensed under the MIT License - see the LICENSE file for details. 