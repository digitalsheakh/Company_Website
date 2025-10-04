#!/bin/bash

# Digital Sheakh - Deployment Script
# This script will help you push to GitHub and deploy to Vercel

echo "🚀 Digital Sheakh Deployment Script"
echo "===================================="
echo ""

# Check if changes are committed
if [[ -n $(git status -s) ]]; then
    echo "⚠️  You have uncommitted changes!"
    echo "Please commit your changes first."
    exit 1
fi

echo "✅ All changes are committed"
echo ""

# Try to push to GitHub
echo "📤 Pushing to GitHub..."
if git push origin main; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "Please authenticate with GitHub first:"
    echo ""
    echo "Option 1 - Use GitHub CLI (Easiest):"
    echo "  gh auth login"
    echo ""
    echo "Option 2 - Use Personal Access Token:"
    echo "  1. Go to: https://github.com/settings/tokens"
    echo "  2. Generate new token with 'repo' scope"
    echo "  3. Run: git remote set-url origin https://YOUR_TOKEN@github.com/digitalsheakh/Company_Website.git"
    echo ""
    echo "Then run this script again: ./deploy.sh"
    exit 1
fi

echo ""
echo "🌐 Ready to deploy to Vercel!"
echo ""
echo "Run these commands:"
echo "  npm install -g vercel"
echo "  vercel login"
echo "  vercel --prod"
echo ""
echo "Or deploy to Netlify:"
echo "  npm install -g netlify-cli"
echo "  netlify login"
echo "  netlify deploy --prod"
echo ""
echo "✨ Deployment guide: See DEPLOYMENT_GUIDE.md"
