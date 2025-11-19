import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBjjEHj7kjNVZNQ9WlEg0hAPcRGDnF6Zo8",
  authDomain: "digital-sheakh-blog.firebaseapp.com",
  projectId: "digital-sheakh-blog",
  storageBucket: "digital-sheakh-blog.firebasestorage.app",
  messagingSenderId: "203033754031",
  appId: "1:203033754031:web:466087f019b0287409975a",
  measurementId: "G-9NJWGZF9N3"
};

// Initialize Firebase
function initializeFirebase() {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  
  return getApps()[0];
}

const app = initializeFirebase();
const auth = app ? getAuth(app) : (null as unknown as Auth);
const db = app ? getFirestore(app) : (null as unknown as Firestore);
const storage = app ? getStorage(app) : (null as unknown as FirebaseStorage);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== 'undefined' && app) {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    // Analytics might not be available in all environments
    console.log('Analytics initialization error:', error);
  }
}

export { app, auth, db, storage, analytics };
