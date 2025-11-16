# Deployment Guide - Narrative Canvas Platform

This guide provides complete instructions for deploying the Narrative Canvas Platform online using Vercel and Convex.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Convex Backend Deployment](#convex-backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Verification](#post-deployment-verification)
7. [Troubleshooting](#troubleshooting)
8. [Alternative Deployment Options](#alternative-deployment-options)

---

## Overview

The Narrative Canvas Platform consists of two main components:

- **Frontend**: React + Vite application (deployed to Vercel)
- **Backend**: Convex serverless backend (deployed to Convex Cloud)

**Recommended Platform**: Vercel

- Zero-config deployment for Vite projects
- Excellent performance and CDN
- Built-in environment variable management
- Great integration with Convex
- Free tier available

---

## Prerequisites

Before deploying, ensure you have:

### Required Accounts

1. **Convex Account**
   - Sign up at: https://convex.dev
   - Free tier available (sufficient for most projects)

2. **Vercel Account**
   - Sign up at: https://vercel.com
   - Free tier available (sufficient for most projects)
   - Can sign in with GitHub for easier integration

3. **GitHub Account** (Optional but recommended)
   - Required if you want to deploy from GitHub repository
   - Enables automatic deployments on git push

### Required Software

1. **Node.js** (v18 or higher)

   ```bash
   node --version  # Should be v18.0.0 or higher
   ```

2. **npm** (comes with Node.js)

   ```bash
   npm --version
   ```

3. **Convex CLI** (will be installed via npx)

4. **Vercel CLI** (optional, for CLI deployment)
   ```bash
   npm install -g vercel
   ```

---

## Convex Backend Deployment

The Convex backend must be deployed **first** because the frontend needs the Convex deployment URL.

### Step 1: Install Dependencies

```bash
cd /home/user/alpha/projects/alpha
npm install
```

### Step 2: Deploy Convex Backend to Production

```bash
npx convex deploy --prod
```

**What this does**:

- Creates a production Convex deployment
- Uploads your schema and backend functions
- Provisions a production database
- Generates a production deployment URL

**Expected output**:

```
✔ Deploying...
✔ Deployment complete!

Deployment URL: https://your-deployment-name.convex.cloud
```

### Step 3: Save Your Convex Deployment URL

Copy the deployment URL from the output. You'll need this for the frontend deployment.

**Example**: `https://happy-animal-123.convex.cloud`

### Step 4: Verify Convex Deployment

Visit the Convex Dashboard:

- Go to: https://dashboard.convex.dev
- Select your project
- Verify that your deployment is active
- Check that your database schema is deployed correctly

---

## Frontend Deployment (Vercel)

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub:

```bash
cd /home/user/alpha/projects/alpha
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Import Project to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Vercel will auto-detect the Vite framework

#### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 4: Add Environment Variables

In the "Environment Variables" section:

| Name              | Value                                                       |
| ----------------- | ----------------------------------------------------------- |
| `VITE_CONVEX_URL` | Your Convex deployment URL from Step 3 of Convex deployment |

**Example**:

```
VITE_CONVEX_URL=https://happy-animal-123.convex.cloud
```

**Important**: Add this variable for all environments (Production, Preview, Development)

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-3 minutes)
3. Vercel will provide a deployment URL

**Expected output**:

```
✓ Build complete
✓ Deployment complete

Your project is live at: https://your-project.vercel.app
```

---

### Method 2: Deploy via Vercel CLI (Alternative)

#### Step 1: Login to Vercel

```bash
vercel login
```

#### Step 2: Deploy

```bash
cd /home/user/alpha/projects/alpha
vercel
```

#### Step 3: Follow the Prompts

```
? Set up and deploy "~/alpha/projects/alpha"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? narrative-canvas
? In which directory is your code located? ./
```

#### Step 4: Add Environment Variable

```bash
vercel env add VITE_CONVEX_URL
```

When prompted, paste your Convex deployment URL.

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## Environment Variables

### Required Environment Variables

The application requires the following environment variable:

| Variable          | Description                      | Example                                 | Required |
| ----------------- | -------------------------------- | --------------------------------------- | -------- |
| `VITE_CONVEX_URL` | Production Convex deployment URL | `https://happy-animal-123.convex.cloud` | ✅ Yes   |

### Setting Environment Variables in Vercel

**Via Dashboard**:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `VITE_CONVEX_URL` with your Convex deployment URL
4. Select all environments (Production, Preview, Development)
5. Click **Save**

**Via CLI**:

```bash
vercel env add VITE_CONVEX_URL production
```

**Redeploy after adding environment variables**:

```bash
vercel --prod
```

### Verifying Environment Variables

After deployment, you can verify the environment variable is set:

1. Open your deployed application
2. Open browser developer console
3. Check that Convex is connecting (no connection errors)

---

## Post-Deployment Verification

After deployment, verify that everything is working correctly.

### Step 1: Access Your Deployed Application

Visit your Vercel deployment URL (e.g., `https://narrative-canvas.vercel.app`)

### Step 2: Check Convex Connection

1. Open browser Developer Console (F12)
2. Look for Convex connection messages
3. Verify no connection errors

**Expected**: You should see Convex successfully connecting to your backend.

**Error indicators**:

- "Failed to connect to Convex"
- "Invalid Convex URL"
- Network errors to convex.cloud

### Step 3: Test Core Functionality

Test the main features of your application:

1. **Story Creation**
   - Create a new story
   - Verify it saves to the database
   - Check that it appears in your story list

2. **Chapter Management**
   - Create chapters within a story
   - Verify chapter data persists

3. **Scene Management**
   - Create scenes within chapters
   - Test scene ordering and organization

4. **Character Management**
   - Add characters to stories
   - Verify character data saves correctly

5. **AI Generation** (If Story 4 is implemented)
   - Test prose generation
   - Verify OpenRouter API integration works

### Step 4: Monitor Deployment

**Vercel Dashboard**:

- Check deployment logs for errors
- Monitor function execution times
- Review build logs if there are issues

**Convex Dashboard**:

- Monitor database queries
- Check function execution logs
- Review error logs

---

## Troubleshooting

### Issue: Build Fails on Vercel

**Symptom**: Deployment fails during the build step

**Solutions**:

1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Ensure TypeScript compiles locally: `npm run build`
4. Check that Node.js version is compatible (v18+)

```bash
# Test build locally first
npm run build
```

### Issue: "Failed to connect to Convex"

**Symptom**: Application loads but shows Convex connection errors

**Solutions**:

1. Verify `VITE_CONVEX_URL` environment variable is set
2. Check that the URL format is correct (should start with `https://`)
3. Ensure Convex deployment is active (check Convex dashboard)
4. Redeploy after setting environment variables:
   ```bash
   vercel --prod
   ```

### Issue: Environment Variable Not Working

**Symptom**: Environment variable seems not to be loaded

**Solutions**:

1. Ensure variable name starts with `VITE_` (required for Vite)
2. Redeploy after adding environment variables
3. Clear Vercel build cache and redeploy
4. Check that environment variable is set for the correct environment (Production)

### Issue: 404 on Page Refresh

**Symptom**: Navigating to a route directly causes 404 error

**Solution**: This should be handled by `vercel.json` rewrites. Verify that `vercel.json` is committed to your repository.

The rewrite rule in `vercel.json`:

```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Issue: Slow Initial Load

**Symptom**: First page load is slow

**Solutions**:

1. Verify Vercel Edge Network is being used (check response headers)
2. Consider enabling Vercel's Edge Functions if needed
3. Optimize bundle size: `npm run build` and check `dist` folder size
4. Consider code splitting for large dependencies

### Issue: Convex Queries Return Errors

**Symptom**: Database queries fail or return errors

**Solutions**:

1. Check Convex dashboard for error logs
2. Verify database schema is deployed: `npx convex deploy --prod`
3. Check that indexes are created if using complex queries
4. Review Convex function logs for specific error messages

---

## Alternative Deployment Options

While Vercel is recommended, you can deploy to other platforms:

### Netlify

#### Configuration File: `netlify.toml`

Create `/home/user/alpha/projects/alpha/netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Deployment Steps:

1. Sign up at https://netlify.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_CONVEX_URL`
6. Deploy

### Cloudflare Pages

#### Deployment Steps:

1. Sign up at https://pages.cloudflare.com
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set build output directory: `dist`
5. Add environment variable: `VITE_CONVEX_URL`
6. Deploy

### Railway

#### Deployment Steps:

1. Sign up at https://railway.app
2. Create new project from GitHub repo
3. Railway will auto-detect Vite
4. Add environment variable: `VITE_CONVEX_URL`
5. Deploy

---

## Continuous Deployment

### Automatic Deployments with Vercel

Once connected to GitHub, Vercel automatically:

- Deploys on every push to main branch (Production)
- Creates preview deployments for pull requests
- Runs build checks on all commits

### Managing Deployments

**Rollback to Previous Deployment**:

1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the deployment you want to rollback to
3. Click "..." → "Promote to Production"

**Environment-Specific Deployments**:

- Production: Deployed from `main` branch
- Preview: Deployed from pull requests
- Development: Local development environment

---

## Monitoring and Analytics

### Vercel Analytics

Enable Vercel Analytics for insights:

1. Go to Project Settings → Analytics
2. Enable Analytics
3. View real-time and historical data

### Convex Monitoring

Monitor backend performance:

1. Go to Convex Dashboard
2. View function execution times
3. Monitor database query performance
4. Check error rates and logs

---

## Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use Vercel's environment variable management
- Rotate secrets periodically

### CORS and Security Headers

Security headers are configured in `vercel.json`:

- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### API Keys

If you add OpenRouter API integration (Story 4):

- Store API keys in Convex environment variables
- Never expose API keys in frontend code
- Use Convex actions for API calls (server-side only)

---

## Cost Considerations

### Vercel Free Tier

- Unlimited personal projects
- 100 GB bandwidth per month
- Automatic SSL certificates
- Edge Network included

### Convex Free Tier

- 1 GB database storage
- 1 GB file storage
- 1,000,000 function calls per month
- Suitable for small to medium projects

### When to Upgrade

Consider upgrading when:

- Traffic exceeds free tier limits
- Need advanced features (Teams, Analytics, etc.)
- Require additional compute resources
- Need priority support

---

## Support and Resources

### Documentation

- **Vercel**: https://vercel.com/docs
- **Convex**: https://docs.convex.dev
- **Vite**: https://vitejs.dev

### Community

- **Convex Discord**: https://convex.dev/community
- **Vercel Discord**: https://vercel.com/discord

### Getting Help

- Check deployment logs in Vercel Dashboard
- Check function logs in Convex Dashboard
- Review this guide's troubleshooting section
- Contact platform support if needed

---

## Next Steps After Deployment

1. **Set up custom domain** (optional)
   - Add domain in Vercel Dashboard
   - Update DNS records
   - SSL certificate auto-generated

2. **Enable monitoring**
   - Set up Vercel Analytics
   - Monitor Convex function performance
   - Set up error tracking (Sentry, etc.)

3. **Configure CI/CD**
   - Set up automated tests
   - Add pre-deployment checks
   - Configure deployment notifications

4. **Optimize performance**
   - Analyze bundle size
   - Implement code splitting
   - Optimize images and assets

5. **Backup strategy**
   - Export Convex data regularly
   - Version control all code changes
   - Document deployment configuration

---

## Quick Reference Commands

```bash
# Build locally
npm run build

# Preview production build locally
npm run preview

# Deploy Convex to production
npx convex deploy --prod

# Deploy to Vercel (CLI)
vercel --prod

# Add environment variable (Vercel CLI)
vercel env add VITE_CONVEX_URL

# View Convex environment variables
npx convex env list

# View deployment logs (Vercel CLI)
vercel logs
```

---

**Deployment Date**: [To be filled after deployment]
**Deployment URL**: [To be filled after deployment]
**Convex Deployment**: [To be filled after deployment]

---

For questions or issues with this deployment guide, please refer to the troubleshooting section or contact your development team.
