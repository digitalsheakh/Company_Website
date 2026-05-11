# 🔥 Firebase Setup Guide

## ✅ What's Been Built:

### 1. **Navigation Bar on All Pages**
- ✅ Homepage
- ✅ Pricing Page
- ✅ Dashboard Page
- ✅ Login Page
- Navigation includes: Home | Pricing | Login
- Mobile-responsive hamburger menu

### 2. **Login Page** (`/login`)
- Email/Password authentication
- Google Sign-In
- Sign up / Sign in toggle
- Clean white/black design
- Error handling
- Redirects to dashboard after login

### 3. **Get In Touch Section**
- Added to all main pages
- WhatsApp, Instagram, Email buttons
- Matches your design exactly

### 4. **Pricing Plans Updated**
- **Basic Plan** - £299/month
- **E-commerce Plan** - £499/month (separate)
- **Social Media Plan** - £399/month (separate)
- **Pro Plan** - £799/month (all combined)

## 🚀 Firebase Setup Steps:

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "Digital Sheakh"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google Sign-In**:
   - Click on "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location (closest to your users)
5. Click "Enable"

### Step 4: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the **Web** icon (</>)
4. Register app name: "Digital Sheakh Website"
5. Copy the `firebaseConfig` object

### Step 5: Add Environment Variables

Create `.env.local` in your project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase config values.

### Step 6: Setup Firestore Security Rules

In Firestore Database → Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Subscriptions
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow write: if request.auth != null;
    }
    
    // Payments
    match /payments/{paymentId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Step 7: Setup Firebase for Payments (Optional)

For payment management with Firebase:

1. Install Firebase Extensions:
   - Go to **Extensions** in Firebase Console
   - Search for "Run Payments with Stripe"
   - Install the extension
   - Configure with your Stripe API keys

2. This will automatically:
   - Create Stripe customers
   - Handle subscriptions
   - Store payment data in Firestore
   - Sync with Stripe webhooks

## 📂 Files Created:

1. `/src/lib/firebase.ts` - Firebase configuration
2. `/src/app/login/page.tsx` - Login/Signup page
3. `/src/components/Navigation.tsx` - Navigation bar
4. `/src/components/GetInTouch.tsx` - Contact section
5. Updated all pages with Navigation

## 🎯 Current Features:

✅ Navigation on all pages
✅ Login/Signup with Firebase
✅ Google Sign-In
✅ 4 separate pricing plans
✅ Get In Touch section on all pages
✅ Mobile-responsive design
✅ Clean white/black/grey theme

## 🔄 Next Steps:

### To Complete Firebase Integration:

1. **Create Firebase project** (follow steps above)
2. **Add environment variables** to `.env.local`
3. **Restart dev server**: `npm run dev`
4. **Test login** at http://localhost:3001/login

### To Add Payment Management:

1. Install Stripe Firebase Extension
2. Create Stripe products for each plan
3. Connect pricing page buttons to create subscriptions
4. Dashboard will show real subscription data from Firestore

### To Protect Dashboard:

Create an authentication wrapper to protect the dashboard page (I can build this next).

## 🧪 Testing:

1. Visit http://localhost:3001
2. Click "Login" in navigation
3. Create an account or sign in with Google
4. After login, you'll be redirected to dashboard
5. Test all pages have navigation bar

## 📞 Need Help?

Let me know if you need:
1. Authentication wrapper for protected routes
2. Stripe payment integration with Firebase
3. User profile management
4. Email verification setup
5. Password reset functionality

Everything is ready - just need to add your Firebase credentials!
