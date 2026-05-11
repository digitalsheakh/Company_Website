import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source } = body;

    const { data, error } = await resend.emails.send({
      from: 'Digital Sheakh <onboarding@resend.dev>',
      to: ['digitalsheakh@gmail.com'],
      subject: `New Contact Form Submission - ${source || 'Website'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Source:</strong> ${source || 'Contact Form'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
