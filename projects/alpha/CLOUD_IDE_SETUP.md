# Narrative Canvas Platform - Cloud IDE Development Guide

This guide explains how to develop the Narrative Canvas Platform using Claude Code or other cloud-based IDEs.

## Story 1.1: Setup Complete ✓

The Convex + React + TypeScript project has been initialized with:
- ✅ React 18.2 with TypeScript 5.9
- ✅ Vite 7.2 for fast development
- ✅ Convex backend ready to deploy
- ✅ Tailwind CSS 4.0 configured
- ✅ Project structure with database schema

## Development Workflows for Cloud IDE

### Option 1: Local Development (Recommended for PoC)

**When to use:** You want hot-reload and fast iteration

**Setup:**
```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start Convex backend
npm run convex:dev
```

**Access:**
- Vite server runs on `localhost:5173`
- Convex runs on `localhost:3210`
- Claude Code may auto-detect and provide public URL via port forwarding
- Check Claude Code UI for "Ports" or "Preview" panel

**Limitations:**
- Port forwarding depends on Claude Code features
- Check if Claude Code supports `localhost:5173` forwarding

### Option 2: Convex Preview Deployments (Best for Cloud IDE)

**When to use:** Port forwarding unavailable OR want to test in staging environment

**Setup:**

```bash
# Step 1: Deploy Convex backend to staging
npx convex deploy --preview

# Output: "Dashboard: https://dashboard.convex.dev/..."
#         "Preview URL: https://your-app-preview.convex.cloud"

# Step 2: Update .env.local with preview URL
# Copy the preview deployment URL from the output and set:
# VITE_CONVEX_URL=https://your-app-preview.convex.cloud

# Step 3: Start Vite dev server
npm run dev

# Step 4: Access via Claude Code port forwarding
# Your app is served at localhost:5173 with real Convex backend
```

**Advantages:**
- ✅ Real Convex backend (not mock)
- ✅ Data persists between sessions
- ✅ Deployable to production
- ✅ Can share preview URL with collaborators
- ✅ No extra tunneling tools needed

**Workflow:**
```
Make code changes → npm run dev → Preview URL from Claude Code → Test feature
Code changes saved → Browser hot-reloads → See changes instantly
```

### Option 3: Tunneling Service (If Port Forwarding Fails)

**When to use:** Port forwarding unavailable and you need hot-reload

**Setup with LocalTunnel:**

```bash
# Install globally (one-time)
npm install -g localtunnel

# Terminal 1: Start Convex backend
npm run convex:dev

# Terminal 2: Start Vite dev server
npm run dev

# Terminal 3: Create tunnel to Vite
lt --port 5173

# Output: "your url is: https://random-name.loca.lt"
```

**Advantages:**
- ✅ Works with any cloud IDE
- ✅ Hot-reload preserved
- ✅ Real-time development

**Limitations:**
- ⚠️ Extra tool dependency
- ⚠️ URLs change on restart
- ⚠️ May have rate limits

## Recommended Workflow for Narrative Canvas Development

### Phase 1: Stories 1.1 - 2.3 (Data Layer)

Use **Option 2 (Preview Deployments)** for simplicity:

```bash
# Initial setup
npm install
npx convex deploy --preview
# Update .env.local with preview URL
npm run dev
# Access via Claude Code port forwarding
```

**Testing:**
- Open browser to Claude Code's forwarded URL
- Verify page loads with "Narrative Canvas Platform" title
- Check console for any errors
- Convex connection status shown on page

### Phase 2: Stories 2.4 - 4.6 (UI & AI Pipeline)

**Recommended:** Continue with preview deployments for consistency

**Add frequent deployment checkpoints:**
```bash
# Before starting Story 3.x
npx convex deploy --preview

# Update preview URL if it changed
# npm run dev
```

### Phase 3: Story 5.x (UX Polish)

If you need hot-reload for rapid UI iteration:
- **Try Option 1 first** (check Claude Code port forwarding)
- Fall back to **Option 3 (tunneling)** if needed
- Or continue with **Option 2 (preview deployments)** for stability

## Cloud IDE Port Forwarding Detection

### Claude Code

1. Open the application (or run `npm run dev`)
2. Look for a "Ports" tab or notification in Claude Code UI
3. Should show: "Port 5173 is forwarded to: https://5173-...-claudecode.dev"
4. Click the link to access your app

If no port forwarding appears:
- Use Preview Deployments (Option 2) instead
- Or use Tunneling (Option 3)

## Environment Variables

### .env.local (Development)

```env
# For local Convex dev server:
VITE_CONVEX_URL=http://localhost:3210

# For preview deployment:
VITE_CONVEX_URL=https://your-deployment-name.convex.cloud
```

### Setting Up Preview Deployment URL

1. Run `npx convex deploy --preview`
2. Copy the returned preview URL
3. Update `.env.local`: `VITE_CONVEX_URL=https://your-url.convex.cloud`
4. Save and restart `npm run dev`

## Troubleshooting

### Issue: "Cannot find module 'convex/react'"
**Solution:** Run `npm install` in the project root

### Issue: "VITE_CONVEX_URL is not defined"
**Solution:** 
- Create `.env.local` file
- Add `VITE_CONVEX_URL=https://your-deployment.convex.cloud`
- Restart dev server

### Issue: "Port 5173 already in use"
**Solution:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Issue: "Convex connection failed"
**Solution:**
- Verify `VITE_CONVEX_URL` is correct
- Check if preview deployment is still active
- Run `npx convex deploy --preview` again
- Update `.env.local` with new URL

## Next Steps

After Story 1.1 completion:

1. **Story 1.2:** Define Convex Database Schema (backend-focused)
2. **Story 1.3:** Configure OpenRouter API (backend-focused)
3. **Story 1.4:** Implement TOON Parser (backend-focused)
4. **Story 1.5:** Set Up shadcn/ui (frontend-focused)

All stories can be developed using the preview deployment workflow above.

## Resources

- [Vite Docs](https://vitejs.dev/)
- [Convex Docs](https://docs.convex.dev/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
