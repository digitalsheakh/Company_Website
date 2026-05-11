import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Resend with fallback
const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
const resend = new Resend(resendApiKey);

// Initialize Firebase Admin
let db: any = null;

if (!getApps().length) {
  try {
    const serviceAccount = require('../../../../firebase-service-account.json');
    initializeApp({
      credential: cert(serviceAccount)
    });
    db = getFirestore();
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    console.warn('Firestore will not be available');
  }
} else {
  try {
    db = getFirestore();
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, source } = await request.json();

    // Save to Firestore if available
    if (db) {
      try {
        await db.collection('contact_submissions').add({
          name,
          email,
          phone: phone || '',
          message,
          source: source || 'Contact Form',
          timestamp: new Date(),
        });
      } catch (firestoreError) {
        console.error('Firestore save error:', firestoreError);
      }
    }

    // Send email via Resend only if API key is valid
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
      console.warn('Resend API key not configured, skipping email');
      return NextResponse.json({ success: true, message: 'Saved to database' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Digital Sheakh <onboarding@resend.dev>',
      to: ['digitalsheakh@gmail.com'],
      subject: `New Contact Form Submission - ${source || 'Website'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Source:</strong> ${source || 'Contact Form'}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
