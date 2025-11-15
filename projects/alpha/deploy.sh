#!/bin/bash

# Deployment Script for Alpha Narrative Canvas Platform
# This script automates the production deployment process

set -e  # Exit on any error

echo "=================================="
echo "Alpha Platform Deployment Script"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Deploy Convex Backend
echo -e "${BLUE}Step 1: Deploying Convex Backend...${NC}"
echo ""
echo "This will:"
echo "  1. Login to Convex (browser will open)"
echo "  2. Deploy all backend functions"
echo "  3. Generate production deployment URL"
echo ""
echo "Press ENTER to continue..."
read

npx convex deploy --prod

echo ""
echo -e "${GREEN}✓ Convex backend deployed!${NC}"
echo ""
echo -e "${YELLOW}IMPORTANT: Copy the Convex deployment URL above!${NC}"
echo "It looks like: https://your-name-123.convex.cloud"
echo ""
echo "You'll need this URL for the next step."
echo ""
echo "Press ENTER when you've copied the URL..."
read

# Step 2: Instructions for Vercel deployment
echo ""
echo -e "${BLUE}Step 2: Deploy Frontend to Vercel${NC}"
echo ""
echo "Since this is a CLI environment, you'll need to deploy via:"
echo ""
echo "Option A: Vercel Dashboard (Recommended)"
echo "  1. Push code to GitHub:"
echo "     git push origin main"
echo ""
echo "  2. Go to: https://vercel.com/dashboard"
echo ""
echo "  3. Click 'Add New...' → 'Project'"
echo ""
echo "  4. Import your GitHub repository"
echo ""
echo "  5. Add environment variable:"
echo "     Name:  VITE_CONVEX_URL"
echo "     Value: [Your Convex URL from Step 1]"
echo ""
echo "  6. Click 'Deploy'"
echo ""
echo "Option B: Vercel CLI"
echo "  npm install -g vercel"
echo "  vercel login"
echo "  vercel"
echo "  vercel env add VITE_CONVEX_URL"
echo "  vercel --prod"
echo ""
echo -e "${GREEN}After deployment:${NC}"
echo "  1. Visit your Vercel URL"
echo "  2. Test all Story 6 features"
echo "  3. Verify Convex connection works"
echo ""
echo "=================================="
echo -e "${GREEN}Deployment Guide Complete!${NC}"
echo "=================================="
