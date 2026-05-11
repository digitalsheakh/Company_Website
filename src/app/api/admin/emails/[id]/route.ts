import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
let db: any = null;

if (!getApps().length) {
  try {
    const serviceAccount = require('../../../../../../firebase-service-account.json');
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Database not available' }, { status: 500 });
    }

    const { id } = await params;
    await db.collection('contact_submissions').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting email:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
