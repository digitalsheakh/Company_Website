# EmailJS Setup Instructions for Chat Assistant

This guide will help you set up EmailJS to receive chat inquiries via email.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it: "Chat Inquiry"
4. **Switch to HTML Editor** (toggle in top right)
5. Paste this HTML template:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>A message by {{name}} has been received. Kindly respond at your earliest convenience.</div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{name}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{time}}</div>
          <p style="font-size: 16px">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
```

6. Note down the **Template ID** (e.g., `template_xkh8zhg`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdefghijk123`)
3. Copy this key

## Step 5: Update Your Website Code

**Your Service ID is already set:** `service_rt76vlk`
**Your Template ID is already set:** `template_xkh8zhg`

You only need to add your **Public Key**:

1. Open `/src/app/page.tsx`
2. Find line 22:
```typescript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key
```

3. Replace `YOUR_PUBLIC_KEY` with your actual Public Key from EmailJS dashboard:
```typescript
emailjs.init('user_abcdefghijk123');  // Your actual Public Key
```

**Note:** The service and template IDs are already configured in the code (lines 57-58)

## Step 6: Test Your Chat

1. Run your development server: `npm run dev`
2. Open the chat assistant on your website
3. Go through the conversation flow:
   - Enter your name
   - Describe what you're interested in
   - Provide email
   - Provide phone number
4. Check your email inbox (digitalsheakh@gmail.com) for the inquiry

## Troubleshooting

### Chat not sending emails?

1. **Check browser console** for error messages
2. **Verify your EmailJS credentials** are correct in `page.tsx`
3. **Check EmailJS dashboard** for usage limits (200 emails/month on free plan)
4. **Ensure email service is connected** properly in EmailJS dashboard

### Getting CORS errors?

EmailJS should work from localhost by default. If you're deploying:
1. Add your domain to EmailJS dashboard under **Account** → **Security**
2. Add allowed origins (e.g., `https://yourdomain.com`)

## Email Template Variables

The following variables are sent from the chat:

- `{{user_name}}` - Customer's name
- `{{user_email}}` - Customer's email
- `{{user_phone}}` - Customer's phone number
- `{{user_interest}}` - What they're interested in
- `{{message}}` - Full formatted message

## Best Practices

1. **Test regularly** - Test the chat to ensure emails are being sent
2. **Monitor usage** - Check your EmailJS dashboard for usage stats
3. **Upgrade if needed** - Free plan allows 200 emails/month
4. **Quick response** - Respond to inquiries within 24 hours
5. **Check spam folder** - Sometimes emails may end up in spam

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

---

**Need help?** Contact digitalsheakh@gmail.com
