import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    const serviceAccount = require('../../../../firebase-service-account.json');
    initializeApp({
      credential: cert(serviceAccount)
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

const db = getFirestore();

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, source } = await request.json();

    // Save to Firestore
    await db.collection('contact_submissions').add({
      name,
      email,
      phone: phone || '',
      message,
      source: source || 'Contact Form',
      timestamp: new Date(),
    });

    // Send email via Resend
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
