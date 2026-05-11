# Stripe Payment Integration Guide

## ✅ What's Already Done:

1. **Pricing Page Created** (`/pricing`)
   - Beautiful white/black/grey design
   - Toggle between One-Time Services and Monthly Subscriptions
   - 3 One-Time Plans: Basic ($499), Professional ($999), Enterprise ($1999)
   - 3 Monthly Plans: Social Media Basic ($199/mo), Pro ($399/mo), Maintenance ($99/mo)
   - Custom solution section
   - Fully responsive design

2. **Homepage Integration**
   - "View Pricing & Plans" button added to homepage
   - Matches your clean white design theme

## 🔧 Next Steps to Complete Stripe Integration:

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Sign up for a free account
3. Complete your business profile

### Step 2: Get Your Stripe API Keys
1. Go to Stripe Dashboard → Developers → API keys
2. Copy your **Publishable key** (starts with `pk_`)
3. Copy your **Secret key** (starts with `sk_`)

### Step 3: Add Environment Variables
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Step 4: Create Stripe Products & Prices
In your Stripe Dashboard:

**One-Time Products:**
1. Create product: "Basic Website" - Price: $499
2. Create product: "Professional Website" - Price: $999
3. Create product: "Enterprise Website" - Price: $1999

**Recurring Products (Monthly):**
1. Create product: "Social Media Basic" - Price: $199/month
2. Create product: "Social Media Pro" - Price: $399/month
3. Create product: "Website Maintenance" - Price: $99/month

Copy each Price ID (starts with `price_`)

### Step 5: Update Pricing Page with Price IDs
Edit `/src/app/pricing/page.tsx` and add the `priceId` to each plan:

```typescript
{
  id: 'website-basic',
  name: 'Basic Website',
  price: 499,
  priceId: 'price_YOUR_STRIPE_PRICE_ID_HERE', // Add this
  // ... rest of plan
}
```

### Step 6: Create Stripe Checkout API Route
I'll create this file for you next. It will handle:
- Creating checkout sessions
- Processing payments
- Handling webhooks for subscription events

### Step 7: Create User Dashboard (Optional but Recommended)
A page where customers can:
- View active subscriptions
- Cancel subscriptions
- Update payment methods
- View payment history

## 📝 Files That Need to Be Created:

1. `/src/app/api/create-checkout-session/route.ts` - Checkout API
2. `/src/app/api/webhooks/route.ts` - Webhook handler
3. `/src/app/dashboard/page.tsx` - User dashboard
4. `/src/app/success/page.tsx` - Payment success page
5. `/src/app/cancel/page.tsx` - Payment cancelled page

## 💡 Features Included:

✅ One-time payments for website development
✅ Monthly recurring subscriptions
✅ Beautiful pricing cards with hover effects
✅ Mobile-responsive design
✅ Black/white/grey color scheme
✅ "Most Popular" badge on recommended plans
✅ Custom solution inquiry option

## 🚀 Would You Like Me To:

1. **Create the Stripe API routes** for checkout and webhooks?
2. **Build the user dashboard** for subscription management?
3. **Add payment success/cancel pages**?
4. **Set up email notifications** for successful payments?

Let me know and I'll implement these next!

## 📞 Support

If you need help with Stripe setup:
- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
