# Deployment Checklist

Use this checklist to ensure you've completed all necessary steps before deploying the Narrative Canvas Platform.

## Pre-Deployment Checklist

### 1. Code Quality

- [ ] All code is committed to version control
- [ ] No console.log statements in production code
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Code is tested locally
- [ ] All features from Story 6 are complete and working

### 2. Dependencies

- [ ] All dependencies are listed in `package.json`
- [ ] No dev dependencies used in production code
- [ ] Dependencies are up to date
- [ ] `package-lock.json` is committed

### 3. Environment Setup

- [ ] `.env.local.example` is up to date
- [ ] `.env` files are in `.gitignore`
- [ ] Environment variables documented in `DEPLOYMENT.md`

### 4. Build Verification

- [ ] Build completes successfully: `npm run build`
- [ ] Built files are in `dist/` directory
- [ ] Preview works locally: `npm run preview`
- [ ] No build warnings or errors

### 5. Repository Setup

- [ ] Code pushed to GitHub
- [ ] Repository is accessible for deployment platform
- [ ] Branch protection rules set (optional)
- [ ] README.md is up to date

---

## Convex Deployment Checklist

### 1. Convex Account

- [ ] Convex account created at https://convex.dev
- [ ] Logged in to Convex CLI

### 2. Convex Deployment

- [ ] Run: `npx convex deploy --prod`
- [ ] Deployment successful
- [ ] Production deployment URL received
- [ ] URL saved for frontend deployment

### 3. Convex Verification

- [ ] Convex Dashboard shows active deployment
- [ ] Database schema is deployed
- [ ] All functions are visible in dashboard
- [ ] No errors in Convex logs

---

## Frontend Deployment Checklist (Vercel)

### 1. Vercel Account

- [ ] Vercel account created at https://vercel.com
- [ ] Connected GitHub account to Vercel

### 2. Project Import

- [ ] Repository imported to Vercel
- [ ] Framework detected as "Vite"
- [ ] Build settings are correct:
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

### 3. Environment Variables

- [ ] `VITE_CONVEX_URL` added to Vercel
- [ ] Variable set for all environments (Production, Preview, Development)
- [ ] Variable value is the Convex production URL

### 4. Deployment

- [ ] First deployment initiated
- [ ] Build completed successfully
- [ ] Deployment URL received

---

## Post-Deployment Verification

### 1. Application Access

- [ ] Deployment URL is accessible
- [ ] Application loads without errors
- [ ] No console errors in browser DevTools

### 2. Convex Connection

- [ ] Application connects to Convex (check browser console)
- [ ] No "Failed to connect to Convex" errors
- [ ] Database queries work correctly

### 3. Feature Testing

- [ ] Story creation works
- [ ] Chapter creation works
- [ ] Scene management works
- [ ] Character management works
- [ ] AI generation works (if Story 4 implemented)
- [ ] Data persists correctly

### 4. Performance

- [ ] Page load time is acceptable (< 3 seconds)
- [ ] No performance warnings in browser DevTools
- [ ] Images and assets load correctly

### 5. Monitoring Setup

- [ ] Vercel Analytics enabled (optional)
- [ ] Convex function logs reviewed
- [ ] Error tracking configured (optional)

---

## Optional: Custom Domain Setup

If you want to use a custom domain:

- [ ] Domain purchased/available
- [ ] Domain added in Vercel Dashboard
- [ ] DNS records updated
- [ ] SSL certificate generated (automatic)
- [ ] Domain accessible and working

---

## Troubleshooting Resources

If you encounter issues, refer to:

1. **DEPLOYMENT.md** - Comprehensive deployment guide
2. **Vercel Dashboard** - Check deployment logs
3. **Convex Dashboard** - Check function execution logs
4. **Browser DevTools** - Check console errors
5. **Deployment Platforms**:
   - Vercel Docs: https://vercel.com/docs
   - Convex Docs: https://docs.convex.dev

---

## Deployment Information (Fill after deployment)

**Deployment Date**: **\*\***\_\_\_\_**\*\***

**Deployment URL**: **\*\***\_\_\_\_**\*\***

**Convex Production URL**: **\*\***\_\_\_\_**\*\***

**Custom Domain** (if applicable): **\*\***\_\_\_\_**\*\***

**Deployment Platform**: [ ] Vercel [ ] Netlify [ ] Other: **\*\***\_\_\_\_**\*\***

---

## Next Steps After Deployment

- [ ] Share deployment URL with team/stakeholders
- [ ] Set up monitoring and alerts
- [ ] Configure custom domain (optional)
- [ ] Set up automated backups
- [ ] Document any deployment-specific configurations
- [ ] Plan for regular updates and maintenance

---

**Last Updated**: 2025-11-15
