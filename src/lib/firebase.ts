import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

export { app, auth, db, storage };
