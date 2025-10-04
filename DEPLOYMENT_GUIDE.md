# Deployment Guide - Digital Sheakh Website

## 🚨 GitHub Authentication Issue

Your code is ready to push, but there's a GitHub authentication mismatch. Here's how to fix it:

### Option 1: Use GitHub CLI (Recommended - Easiest)

```bash
# Install GitHub CLI if not installed
brew install gh

# Login to GitHub
gh auth login

# Select: GitHub.com
# Select: HTTPS
# Authenticate with web browser
# Select account: digitalsheakh

# Then push
git push origin main
```

### Option 2: Use Personal Access Token

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name: "Company Website Deploy"
   - Select scopes: `repo` (all checkboxes under repo)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Update Git Remote with Token:**
   ```bash
   cd /Users/sheakhemon/Desktop/Company_Website
   
   # Remove old remote
   git remote remove origin
   
   # Add new remote with token
   git remote add origin https://YOUR_TOKEN@github.com/digitalsheakh/Company_Website.git
   
   # Push
   git push -u origin main
   ```

### Option 3: Use SSH (Most Secure)

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "digitalsheakh@gmail.com"
   # Press Enter for all prompts (use default location)
   
   # Start SSH agent
   eval "$(ssh-agent -s)"
   
   # Add SSH key
   ssh-add ~/.ssh/id_ed25519
   
   # Copy public key
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```

2. **Add SSH Key to GitHub:**
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Title: "Mac - Company Website"
   - Paste the key you copied
   - Click "Add SSH key"

3. **Update Git Remote:**
   ```bash
   cd /Users/sheakhemon/Desktop/Company_Website
   
   # Change remote to SSH
   git remote set-url origin git@github.com:digitalsheakh/Company_Website.git
   
   # Push
   git push origin main
   ```

---

## 🚀 Deploy to Vercel (Recommended)

Once GitHub push is successful, deploy to Vercel:

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
# Enter your email: digitalsheakh@gmail.com
# Click the verification link in your email
```

### Step 3: Deploy
```bash
cd /Users/sheakhemon/Desktop/Company_Website

# First deployment
vercel

# Follow prompts:
# Set up and deploy? Yes
# Which scope? Your account
# Link to existing project? No
# Project name? company-website (or leave default)
# Directory? ./ (press Enter)
# Override settings? No

# Production deployment
vercel --prod
```

### Step 4: Add Custom Domain
```bash
# Add your domain
vercel domains add sheakh.digital

# Follow instructions to update DNS records
```

**DNS Records to Add:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 🌐 Alternative: Deploy to Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
# Browser will open for authentication
```

### Step 3: Deploy
```bash
cd /Users/sheakhemon/Desktop/Company_Website

# Build the site
npm run build

# Deploy
netlify deploy --prod

# Follow prompts:
# Create new site
# Team: Your team
# Site name: digital-sheakh (or custom)
# Publish directory: .next
```

### Step 4: Add Custom Domain
```bash
netlify domains:add sheakh.digital
```

---

## 📱 Quick Deploy Commands

### After fixing GitHub auth, run these:

```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Vercel
vercel --prod

# Done! Your site is live! 🎉
```

---

## 🔧 Environment Variables (If Needed)

If you need to add environment variables (like EmailJS keys):

### Vercel:
```bash
vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID
vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

### Netlify:
```bash
netlify env:set NEXT_PUBLIC_EMAILJS_SERVICE_ID "your_value"
netlify env:set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID "your_value"
netlify env:set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY "your_value"
```

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Visit your live site and test all pages
- [ ] Test contact form
- [ ] Test live chat widget
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test on different browsers
- [ ] Submit sitemap to Google Search Console
- [ ] Setup Google Analytics
- [ ] Create Google Business Profile

---

## 🆘 Troubleshooting

### "Build failed on Vercel/Netlify"
```bash
# Test build locally first
npm run build

# If it works locally, check build logs on platform
```

### "Domain not connecting"
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Use https://dnschecker.org to check propagation

### "Site is slow"
- Images might be too large - compress them
- Check Vercel/Netlify analytics
- Enable caching

---

## 📞 Need Help?

If you get stuck:
1. Check the error message carefully
2. Google the specific error
3. Check Vercel/Netlify documentation
4. Email: digitalsheakh@gmail.com

---

## 🎉 Your Site Will Be Live At:

- **Vercel:** https://company-website-xxx.vercel.app (temporary)
- **Custom Domain:** https://sheakh.digital (after DNS setup)

---

**Good luck with the deployment!** 🚀
