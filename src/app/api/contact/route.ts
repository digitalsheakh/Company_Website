import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend
const resendApiKey = process.env.RESEND_API_KEY || 're_placeholder';
const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, source } = await request.json();

    // Send email via Resend
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_placeholder') {
      console.warn('Resend API key not configured');
      return NextResponse.json({ success: true, message: 'Contact saved' });
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
