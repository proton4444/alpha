# Deploy to Production - Simple Guide

**Skip local testing - Deploy directly to production!**

---

## **STEP 1: Deploy Convex Backend** ⚡

Run this command:

```bash
cd /home/user/alpha/projects/alpha
npx convex deploy --prod
```

**What happens:**
1. Browser opens for Convex login
2. Login with Google/GitHub
3. Choose "Create new project" or select existing
4. Wait 1-2 minutes for deployment

**CRITICAL:** When it finishes, you'll see:
```
✓ Deployment complete!
  https://happy-animal-123.convex.cloud
```

**📋 COPY THIS URL!** You'll need it in Step 2.

---

## **STEP 2: Deploy Frontend to Vercel** 🚀

### **Option A: Via Vercel Dashboard** (Easiest)

1. **Push code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com/dashboard
   - Sign up/login (free account)

3. **Import Project:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repo: `proton4444/alpha`
   - Vercel auto-detects Vite

4. **Configure:**
   - **Root Directory:** `projects/alpha`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)

5. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
     - **Name:** `VITE_CONVEX_URL`
     - **Value:** [Paste your Convex URL from Step 1]
     - **Environments:** Production ✓

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-5 minutes
   - Get your URL: `https://your-app.vercel.app`

---

### **Option B: Via Vercel CLI** (Alternative)

If you prefer command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /home/user/alpha/projects/alpha
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name? alpha-narrative-canvas
# - Directory? ./
# - Override settings? No

# Add environment variable
vercel env add VITE_CONVEX_URL production
# Paste your Convex URL when prompted

# Deploy to production
vercel --prod
```

---

## **STEP 3: Test Your Live Site** ✅

1. **Visit your deployment URL**
   - Vercel gives you: `https://your-app.vercel.app`

2. **Open DevTools**
   - Press F12
   - Check Console for errors (should be none)

3. **Test Story 6 Features:**
   - [ ] Filter buttons show colors (GREEN, BLUE, RED)
   - [ ] Chapter cards have borders and shadows
   - [ ] Character badges display with colors
   - [ ] Grid layout responsive
   - [ ] Expand/collapse chapters works
   - [ ] Drag-drop scene reordering works
   - [ ] All visual styling present

4. **Create Test Data:**
   - [ ] Create a story
   - [ ] Add chapters
   - [ ] Add scenes
   - [ ] Add characters
   - [ ] Test filtering

---

## **Common Issues**

### ❌ "Convex connection failed"
**Solution:** Check `VITE_CONVEX_URL` environment variable
- Go to Vercel project settings
- Environment Variables
- Verify URL is correct (no trailing slash)
- Redeploy if you changed it

### ❌ "Build failed"
**Solution:** Check build logs
- Missing environment variable
- TypeScript errors (expected if Convex not deployed first)

### ❌ "404 on page refresh"
**Solution:** Already fixed in `vercel.json`
- Rewrites configured for client-side routing

---

## **Deployment Checklist**

Before deploying:
- [x] Tailwind CSS v4 fix applied
- [x] Story 6 MVP complete (all 6 stories)
- [x] Test harnesses created
- [x] Deployment configs ready
- [x] Documentation complete

After deploying:
- [ ] Convex backend deployed
- [ ] Frontend deployed to Vercel
- [ ] Environment variable set
- [ ] Site loads without errors
- [ ] Visual styling works
- [ ] All features functional

---

## **URLs to Save**

After deployment, save these URLs:

| Service | URL | Purpose |
|---------|-----|---------|
| **Production Site** | https://your-app.vercel.app | Share with users |
| **Convex Backend** | https://your-name.convex.cloud | API endpoint |
| **Convex Dashboard** | https://dashboard.convex.dev | Monitor backend |
| **Vercel Dashboard** | https://vercel.com/dashboard | Manage deployments |

---

## **Monitoring**

**Convex Dashboard:**
- View real-time function calls
- Check database tables
- Monitor errors
- See usage metrics

**Vercel Dashboard:**
- View deployment logs
- Check analytics
- Monitor performance
- Manage domains

---

## **Next Steps After Deployment**

1. **Test thoroughly**
   - All Story 6 features
   - Create real content
   - Test on mobile

2. **Share with team**
   - Send production URL
   - Gather feedback

3. **Optional:**
   - Set up custom domain
   - Enable analytics
   - Configure monitoring

---

## **Cost**

**FREE TIER:**
- Convex: 1M function calls/month
- Vercel: 100GB bandwidth/month
- Total: $0/month

**Plenty for testing and early users!**

---

## **Support**

- **Convex Docs:** https://docs.convex.dev
- **Vercel Docs:** https://vercel.com/docs
- **Full Guide:** See `DEPLOYMENT.md`
- **Troubleshooting:** See `TAILWIND_FIX_GUIDE.txt`

---

**Ready? Start with Step 1!** 🚀

Run: `npx convex deploy --prod`
