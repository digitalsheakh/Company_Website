# EmailJS Setup Instructions

This guide will help you set up EmailJS for the contact form on your website.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Templates

### Template 1: Feedback Request (Main Template - For Your Team)

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it: "Feedback Request"
4. Set up the template:

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
Hello Sheakh Digital Team,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}
Services Interested In: {{services}}

Please respond to this inquiry within 24 hours.

Best regards,
Your Website Contact Form
```

5. Note down the **Template ID** (e.g., `template_xyz789`)

### Template 2: Auto-Reply Template

1. Create another template
2. Name it: "Auto Reply - Thank You"
3. Set up the template:

**Subject:** Thank you for contacting Sheakh Digital!

**Content:**
```
Hello {{to_name}},

Thank you for reaching out to Sheakh Digital!

We've received your inquiry and one of our team members will get back to you within 24 hours.

In the meantime, feel free to:
- Visit our website: https://sheakh.digital
- Follow us on Instagram: @digitalsheakh
- Email us directly: digitalsheakh@gmail.com

We're excited to help bring your digital vision to life!

Best regards,
The Sheakh Digital Team

---
Sheakh Digital
digitalsheakh@gmail.com
Moulvibazar, Sylhet, Bangladesh
```

4. Note down the **Template ID** (e.g., `template_reply123`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdefghijk123`)
3. Copy this key

## Step 5: Update Your Website Code

Open `/src/app/page.tsx` and find these lines (around line 43-46):

```typescript
const serviceId = 'YOUR_SERVICE_ID';
const templateId = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

Replace them with your actual values:

```typescript
const serviceId = 'service_abc123';  // Your Service ID
const templateId = 'template_xyz789';  // Your main template ID
const publicKey = 'user_abcdefghijk123';  // Your Public Key
```

Also update line 60:

```typescript
const autoReplyTemplateId = 'YOUR_AUTO_REPLY_TEMPLATE_ID';
```

Replace with:

```typescript
const autoReplyTemplateId = 'template_reply123';  // Your auto-reply template ID
```

## Step 6: Test Your Form

1. Run your development server: `npm run dev`
2. Navigate to the Contact page
3. Fill out the form with test data
4. Submit the form
5. Check:
   - Your email inbox for the customer inquiry
   - The test email address for the auto-reply

## Troubleshooting

### Form not sending emails?

1. **Check browser console** for error messages
2. **Verify your EmailJS credentials** are correct
3. **Check EmailJS dashboard** for usage limits
4. **Ensure email service is connected** properly

### Auto-reply not working?

1. Make sure the auto-reply template ID is correct
2. Check that the template uses `{{to_name}}` and `{{to_email}}` variables
3. Verify the template is active in EmailJS dashboard

### Getting CORS errors?

EmailJS should work from localhost by default. If you're deploying:
1. Add your domain to EmailJS dashboard under **Account** → **Security**
2. Add allowed origins (e.g., `https://yourdomain.com`)

## Email Template Variables

The following variables are available in your templates:

- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{company}}` - Customer's company (optional)
- `{{phone}}` - Customer's phone (optional)
- `{{services}}` - Services they're interested in
- `{{to_name}}` - Used in auto-reply for customer's name
- `{{to_email}}` - Used in auto-reply for customer's email

## Best Practices

1. **Test regularly** - Send test emails to ensure everything works
2. **Monitor usage** - Check your EmailJS dashboard for usage stats
3. **Upgrade if needed** - Free plan allows 200 emails/month
4. **Backup emails** - Consider forwarding to multiple team members
5. **Response time** - Try to respond within 24 hours as promised

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**Need help?** Contact digitalsheakh@gmail.com
