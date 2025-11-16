# Quick Start Guide - Test UI & Deploy

**Date**: 2025-11-15
**Status**: Ready for testing and deployment

---

## Part 1: Test UI Locally (5 minutes)

### Step 1: Start Convex Backend (Terminal 1)

```bash
cd /home/user/alpha/projects/alpha
npm run convex:dev
```

**Expected output:**

```
✔ Convex functions ready!
  http://localhost:3000
```

**Leave this terminal running!**

---

### Step 2: Start Vite Dev Server (Terminal 2)

Open a **new terminal** and run:

```bash
cd /home/user/alpha/projects/alpha
npm run dev
```

**Expected output:**

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 3: Open Browser & Test

1. **Open browser**: http://localhost:5173

2. **Hard refresh**: Press `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)

3. **Open DevTools**: Press `F12`

4. **Navigate to test page**: Look for Story 6 test harnesses

---

### Visual Verification Checklist

Once the page loads, verify these visual elements are styled:

#### ✅ Filter Buttons (Top of Chapter Overview)

- [ ] "All" button - Dark slate background when active
- [ ] "Complete" button - **GREEN** background when active
- [ ] "Draft" button - Gray background when active
- [ ] "Generating" button - **BLUE** background when active
- [ ] "Error" button - **RED** background when active
- [ ] Count badges visible on each button

#### ✅ Chapter Cards

- [ ] Visible **borders** around cards (light gray)
- [ ] **Shadows** on cards (subtle drop shadow)
- [ ] **Grid spacing** - 1rem gaps between cards
- [ ] Proper **responsive layout**:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 3-4 columns

#### ✅ Scene Cards (Expand a chapter first)

- [ ] **Complete scenes** - Green background
- [ ] **Draft scenes** - Gray background
- [ ] **Generating scenes** - Blue background with pulse animation
- [ ] **Error scenes** - Red background

#### ✅ Character Badges

- [ ] Colored circles with initials
- [ ] Multiple colors (blue, purple, pink, orange, green, etc.)
- [ ] Hover shows full character name in tooltip

#### ✅ Progress Bars

- [ ] Green fill showing completion percentage
- [ ] Smooth transitions when filtering

---

### If Styles Don't Appear

**Quick fix:**

1. Stop both servers (Ctrl+C in both terminals)
2. Clear cache: `rm -rf .vite node_modules/.vite`
3. Restart both servers
4. Hard refresh browser (Ctrl+Shift+R)

**Still not working?**

- See `TAILWIND_FIX_GUIDE.txt` for detailed troubleshooting

---

## Part 2: Deploy to Production (15-30 minutes)

### Prerequisites

1. **Accounts needed** (all free tier):
   - Convex account: https://convex.dev
   - Vercel account: https://vercel.com
   - GitHub account: https://github.com (optional but recommended)

2. **Install Convex CLI** (if not installed):

   ```bash
   npm install -g convex
   ```

3. **Install Vercel CLI** (optional - can use dashboard instead):
   ```bash
   npm install -g vercel
   ```

---

### Deployment Steps

#### Step 1: Deploy Convex Backend

```bash
cd /home/user/alpha/projects/alpha
npx convex deploy --prod
```

**Follow prompts:**

- Login to Convex (browser will open)
- Select "Create new project" or choose existing
- Wait for deployment to complete

**IMPORTANT:** Copy the deployment URL that's shown:

```
✔ Deployment complete!
  https://your-unique-name.convex.cloud
```

**Save this URL!** You'll need it in Step 2.

---

#### Step 2A: Deploy Frontend to Vercel (Dashboard Method - Recommended)

1. **Push code to GitHub** (if not already done):

   ```bash
   git push origin main
   ```

2. **Go to Vercel Dashboard**: https://vercel.com/dashboard

3. **Import project**:
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite configuration

4. **Add environment variable**:
   - Click "Environment Variables"
   - Add variable:
     - **Name**: `VITE_CONVEX_URL`
     - **Value**: [Your Convex URL from Step 1]
     - **Environment**: Production
   - Click "Add"

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-5 minutes for build

6. **Visit your site**:
   - Vercel will provide a URL like: `https://your-app.vercel.app`

---

#### Step 2B: Deploy Frontend to Vercel (CLI Method - Alternative)

```bash
cd /home/user/alpha/projects/alpha

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? alpha-narrative-canvas
# - In which directory is your code located? ./
# - Auto-detected settings? Yes

# Add environment variable
vercel env add VITE_CONVEX_URL
# Paste your Convex URL when prompted

# Deploy to production
vercel --prod
```

---

### Step 3: Post-Deployment Verification

1. **Visit your deployed site**: `https://your-app.vercel.app`

2. **Open DevTools**: Press `F12`

3. **Check Console**: Should be no errors

4. **Test features**:
   - [ ] Create a story
   - [ ] Add chapters
   - [ ] Add scenes
   - [ ] Add characters
   - [ ] Test Story 6 features:
     - [ ] Chapter cards display
     - [ ] Filter buttons work
     - [ ] Drag-drop reordering
     - [ ] Character badges appear
     - [ ] Expand/collapse chapters

5. **Check Convex Dashboard**: https://dashboard.convex.dev
   - View real-time function calls
   - Check data in database tables

---

## Troubleshooting

### Local Development Issues

**Problem**: Styles not showing

- **Solution**: See `TAILWIND_FIX_GUIDE.txt`

**Problem**: Convex connection failed

- **Solution**: Ensure `npm run convex:dev` is running in separate terminal

**Problem**: Port 5173 already in use

- **Solution**: `pkill -f vite` then restart

---

### Deployment Issues

**Problem**: Vercel build fails

- **Solution**: Check environment variable is set correctly
- **Solution**: Ensure Convex backend deployed first

**Problem**: Site loads but no data

- **Solution**: Check `VITE_CONVEX_URL` environment variable matches Convex deployment URL
- **Solution**: Check Convex dashboard for errors

**Problem**: 404 on routes

- **Solution**: Already configured in `vercel.json` - should auto-work

---

## Quick Reference

### Local Development Commands

```bash
# Terminal 1: Convex
npm run convex:dev

# Terminal 2: Vite
npm run dev
```

### Deployment Commands

```bash
# Deploy backend
npx convex deploy --prod

# Deploy frontend (CLI)
vercel --prod
```

### Important URLs

- **Local Dev**: http://localhost:5173
- **Convex Dashboard**: https://dashboard.convex.dev
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Production Site**: https://your-app.vercel.app (after deployment)

---

## Next Steps After Deployment

1. **Share the link** with team/users
2. **Monitor usage** in Convex dashboard
3. **Set up custom domain** (optional) in Vercel settings
4. **Enable analytics** in Vercel dashboard (optional)

---

## Support Documentation

- **Comprehensive Guide**: `DEPLOYMENT.md`
- **Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Quick Reference**: `DEPLOYMENT_SUMMARY.md`
- **Tailwind Troubleshooting**: `TAILWIND_FIX_GUIDE.txt`

---

**Status**: Ready to test and deploy! 🚀

**Estimated time**:

- Local testing: 5 minutes
- Deployment: 15-30 minutes
- **Total**: 20-35 minutes

Good luck! 🎉
