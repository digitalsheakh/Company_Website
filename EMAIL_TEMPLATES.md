# EmailJS Templates for Sheakh Digital

## Your EmailJS Credentials

✅ **Service ID:** `service_w4y5j3f`  
✅ **Public Key:** `_5VLmkhbpDyqVK5Qn`  
⚠️ **Private Key:** `_GO4a29noqZ5c4iGKYfVJ` (Keep this secret!)

---

## Setup Instructions

### Step 1: Create Template 1 - Feedback Request (For Your Team)

1. Go to EmailJS Dashboard → **Email Templates**
2. Click **Create New Template**
3. Name it: **"Feedback Request"**
4. **To Email:** Your business email (digitalsheakh@gmail.com)
5. **Subject:** `New Contact Form Submission from {{from_name}}`
6. **Content:** Copy the HTML code below
7. Save and note the **Template ID**

#### HTML Code for Feedback Request Template:

```html
<div style="font-family: 'Poppins', system-ui, -apple-system, sans-serif; font-size: 16px; color: #2c3e50; max-width: 600px; margin: 0 auto;">
  <!-- Header -->
  <div style="text-align: center; background: linear-gradient(135deg, #2d667c 0%, #4a8fa8 100%); padding: 40px 20px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
      📬 New Contact Form Submission
    </h1>
  </div>
  
  <!-- Main Content -->
  <div style="background: #ffffff; padding: 40px 30px;">
    <p style="font-size: 18px; color: #2d667c; font-weight: 600; margin-bottom: 24px;">
      Hello Sheakh Digital Team,
    </p>
    
    <p style="line-height: 1.8; margin-bottom: 24px; color: #4a5568;">
      You have received a new contact form submission from your website. Please review the details below:
    </p>
    
    <!-- Customer Details Box -->
    <div style="background: #f8f9fa; border: 2px solid #2d667c; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <h3 style="color: #2d667c; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #e0e0e0; padding-bottom: 12px;">
        Customer Information
      </h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; color: #2c3e50; font-weight: 600; width: 140px; vertical-align: top;">
            👤 Name:
          </td>
          <td style="padding: 12px 0; color: #4a5568;">
            {{from_name}}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #2c3e50; font-weight: 600; vertical-align: top;">
            📧 Email:
          </td>
          <td style="padding: 12px 0;">
            <a href="mailto:{{from_email}}" style="color: #2d667c; text-decoration: none;">{{from_email}}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #2c3e50; font-weight: 600; vertical-align: top;">
            🏢 Company:
          </td>
          <td style="padding: 12px 0; color: #4a5568;">
            {{company}}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #2c3e50; font-weight: 600; vertical-align: top;">
            📱 Phone:
          </td>
          <td style="padding: 12px 0; color: #4a5568;">
            {{phone}}
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #2c3e50; font-weight: 600; vertical-align: top;">
            🎯 Services:
          </td>
          <td style="padding: 12px 0; color: #4a5568;">
            {{services}}
          </td>
        </tr>
      </table>
    </div>
    
    <!-- Action Required Box -->
    <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 24px 0; border-radius: 8px;">
      <p style="margin: 0; color: #856404; font-weight: 600;">
        ⏰ Action Required
      </p>
      <p style="margin: 8px 0 0 0; color: #856404;">
        Please respond to this inquiry within <strong>24 hours</strong> to maintain our service standards.
      </p>
    </div>
    
    <!-- Quick Actions -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="mailto:{{from_email}}" style="display: inline-block; background: #2d667c; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 8px;">
        📧 Reply to Customer
      </a>
    </div>
    
    <div style="border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 32px;">
      <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
        This email was automatically generated from your website contact form at <a href="https://sheakh.digital" style="color: #2d667c; text-decoration: none;">sheakh.digital</a>
      </p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2c3e50; padding: 24px 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="color: #cbd5e0; margin: 0; font-size: 14px;">
      Sheakh Digital - Website Contact Form System
    </p>
    <p style="color: #7bb3d3; margin: 8px 0 0 0; font-size: 12px;">
      digitalsheakh@gmail.com | www.sheakh.digital
    </p>
  </div>
</div>
```

---

### Step 2: Create Template 2 - Auto-Reply (For Customers)

1. Go to EmailJS Dashboard → **Email Templates**
2. Click **Create New Template**
3. Name it: **"Auto-Reply - Thank You"**
4. **To Email:** `{{to_email}}` (This will be the customer's email)
5. **Subject:** `Thank you for contacting Sheakh Digital!`
6. **Content:** Copy the HTML code below
7. Save and note the **Template ID**

#### HTML Code for Auto-Reply Template:

```html
<div style="font-family: 'Poppins', system-ui, -apple-system, sans-serif; font-size: 16px; color: #2c3e50; max-width: 600px; margin: 0 auto;">
  <!-- Header with Logo -->
  <div style="text-align: center; background: linear-gradient(135deg, #2d667c 0%, #4a8fa8 100%); padding: 40px 20px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700;">
      <span style="color: #333333; background: #ffffff; padding: 8px 16px; border-radius: 8px;">Sheakh</span><span style="color: #ffffff;">.Digital</span>
    </h1>
  </div>
  
  <!-- Main Content -->
  <div style="background: #ffffff; padding: 40px 30px;">
    <h2 style="color: #2d667c; font-size: 24px; margin-bottom: 20px;">Hi {{to_name}},</h2>
    
    <p style="line-height: 1.8; margin-bottom: 20px; color: #4a5568;">
      Thank you for reaching out to <strong>Sheakh Digital</strong>!
    </p>
    
    <p style="line-height: 1.8; margin-bottom: 20px; color: #4a5568;">
      We've received your inquiry and one of our team members will get back to you <strong>within 24 hours</strong>.
    </p>
    
    <!-- Info Box -->
    <div style="background: #f8f9fa; border-left: 4px solid #2d667c; padding: 20px; margin: 30px 0; border-radius: 8px;">
      <p style="margin: 0 0 12px 0; color: #2c3e50; font-weight: 600;">In the meantime, feel free to:</p>
      <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.8;">
        <li>Visit our website: <a href="https://sheakh.digital" style="color: #2d667c; text-decoration: none;">sheakh.digital</a></li>
        <li>Follow us on Instagram: <a href="https://www.instagram.com/digitalsheakh/" style="color: #2d667c; text-decoration: none;">@digitalsheakh</a></li>
        <li>Email us directly: <a href="mailto:digitalsheakh@gmail.com" style="color: #2d667c; text-decoration: none;">digitalsheakh@gmail.com</a></li>
      </ul>
    </div>
    
    <p style="line-height: 1.8; margin-bottom: 20px; color: #4a5568;">
      We're excited to help bring your digital vision to life! 🚀
    </p>
    
    <div style="border-top: 2px solid #e0e0e0; padding-top: 24px; margin-top: 32px;">
      <p style="margin: 0 0 8px 0; color: #2c3e50; font-weight: 600;">Best regards,</p>
      <p style="margin: 0 0 4px 0; color: #2d667c; font-weight: 600; font-size: 18px;">The Sheakh Digital Team</p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2c3e50; padding: 30px 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="color: #ffffff; margin: 0 0 12px 0; font-size: 14px;">
      <strong>Sheakh Digital</strong>
    </p>
    <p style="color: #cbd5e0; margin: 0 0 8px 0; font-size: 14px;">
      📧 <a href="mailto:digitalsheakh@gmail.com" style="color: #7bb3d3; text-decoration: none;">digitalsheakh@gmail.com</a>
    </p>
    <p style="color: #cbd5e0; margin: 0 0 8px 0; font-size: 14px;">
      📍 Moulvibazar, Sylhet, Bangladesh
    </p>
    <p style="color: #cbd5e0; margin: 0 0 16px 0; font-size: 14px;">
      🌐 <a href="https://sheakh.digital" style="color: #7bb3d3; text-decoration: none;">www.sheakh.digital</a>
    </p>
    
    <!-- Social Icons -->
    <div style="margin-top: 20px;">
      <a href="https://www.instagram.com/digitalsheakh/" style="display: inline-block; margin: 0 8px; color: #7bb3d3; text-decoration: none; font-size: 14px;">Instagram</a>
      <span style="color: #7bb3d3;">•</span>
      <a href="https://www.facebook.com/digitalsheakh" style="display: inline-block; margin: 0 8px; color: #7bb3d3; text-decoration: none; font-size: 14px;">Facebook</a>
      <span style="color: #7bb3d3;">•</span>
      <a href="https://twitter.com/digitalsheakh" style="display: inline-block; margin: 0 8px; color: #7bb3d3; text-decoration: none; font-size: 14px;">Twitter</a>
    </div>
  </div>
</div>
```

---

## Step 3: Update Your Code

After creating both templates, you'll have two Template IDs. Update your code in `src/app/page.tsx`:

Find lines 45 and 60 and replace:

```typescript
const templateId = 'YOUR_FEEDBACK_TEMPLATE_ID'; // Replace with Template 1 ID
const autoReplyTemplateId = 'YOUR_AUTO_REPLY_TEMPLATE_ID'; // Replace with Template 2 ID
```

With your actual template IDs:

```typescript
const templateId = 'template_abc123'; // Your Feedback Request template ID
const autoReplyTemplateId = 'template_xyz456'; // Your Auto-Reply template ID
```

---

## Template Variables Used

### Feedback Request Template (To You):
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{company}}` - Customer's company
- `{{phone}}` - Customer's phone
- `{{services}}` - Services they selected

### Auto-Reply Template (To Customer):
- `{{to_name}}` - Customer's name (personalized greeting)
- `{{to_email}}` - Customer's email (used as recipient)

---

## Testing Your Setup

1. **Test Feedback Request:**
   - Fill out your contact form
   - Check your business email (digitalsheakh@gmail.com)
   - Verify you receive the formatted email with customer details

2. **Test Auto-Reply:**
   - Use your own email in the contact form
   - Check your inbox
   - Verify you receive the thank you email

3. **Check EmailJS Dashboard:**
   - Go to **Email History** tab
   - Verify both emails were sent successfully
   - Check for any errors

---

## Troubleshooting

### Emails not sending?
- Verify Service ID: `service_w4y5j3f`
- Verify Public Key: `_5VLmkhbpDyqVK5Qn`
- Check template IDs are correct
- Ensure templates are active in EmailJS dashboard

### Variables not showing correctly?
- Check variable names match exactly (case-sensitive)
- Verify template uses `{{variable}}` format
- Test with EmailJS template tester

### HTML not rendering?
- EmailJS supports HTML by default
- Some email clients may strip styles
- Test with Gmail, Outlook, and other clients

---

## Security Notes

⚠️ **Important:**
- Never commit your Private Key to GitHub
- Public Key is safe to use in frontend code
- Private Key should only be used for server-side operations
- EmailJS free tier: 200 emails/month

---

## Support

- EmailJS Docs: https://www.emailjs.com/docs/
- Your Dashboard: https://dashboard.emailjs.com/
- Contact: digitalsheakh@gmail.com

---

**Your email system is ready! Just create the templates and update the template IDs in your code.** 🎉
