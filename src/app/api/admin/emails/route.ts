import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
let db: any = null;

if (!getApps().length) {
  try {
    const serviceAccount = require('../../../../../firebase-service-account.json');
    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
} else {
  try {
    db = getFirestore();
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
  }
}

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json({ emails: [] });
    }

    const snapshot = await db.collection('contact_submissions')
      .orderBy('timestamp', 'desc')
      .get();
    
    const emails = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
    }));

    return NextResponse.json({ emails });
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ emails: [] });
  }
}
