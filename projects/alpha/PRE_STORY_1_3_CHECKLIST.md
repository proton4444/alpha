# Pre-Story 1.3 Checklist - Verify Alignment

**Use this checklist to confirm your Claude Code environment matches main branch.**

---

## 🔍 Step 1: Run Alignment Check in Claude Code

In Claude Code terminal:

```bash
cd projects/alpha
bash ALIGNMENT_CHECK.sh
```

You should see:

```
================================
NARRATIVE CANVAS PROJECT CHECK
================================

✓ Git Status:
  Branch: main
  Last commit: [TOOLS] Add alignment check script
  Uncommitted: 0 files

✓ TypeScript Compilation:
  ✅ No errors

✓ Key Dependencies:
  React: react@18.2.0
  Convex: convex@1.29.1
  Vite: vite@7.2.0

✓ Critical Files:
  ✅ src/App.tsx
  ✅ convex/schema.ts
  ✅ package.json
  ✅ index.html
  ✅ .env.local

✓ Dev Server Scripts:
  ✅ npm run dev available
  ✅ npm run convex:dev available

================================
ALIGNMENT STATUS: ✅ READY
================================
```

---

## ✅ Manual Verification Checklist

If the script doesn't work, verify manually:

### Git Status

- [ ] On branch: `main`
- [ ] Latest commit: `c656137` or later
- [ ] No uncommitted changes: `git status --short` (empty output)
- [ ] Remote synced: `git log -1 --oneline` matches `git log origin/main -1 --oneline`

### Files Present

- [ ] `src/App.tsx` exists (2.3K)
- [ ] `convex/schema.ts` exists (1021 bytes)
- [ ] `package.json` exists (1019 bytes)
- [ ] `index.html` exists (387 bytes)
- [ ] `.env.local` exists (configuration file)
- [ ] `node_modules/` exists (dependencies installed)

### Dependencies

```bash
npm list react    # Should show: react@18.2.0
npm list convex   # Should show: convex@1.29.1
npm list vite     # Should show: vite@7.2.0
```

### TypeScript

```bash
npx tsc --noEmit
```

- [ ] No output (means no errors)

### Dev Scripts

```bash
npm run
```

- [ ] Should show `dev` script
- [ ] Should show `convex:dev` script

---

## 🚀 Step 2: Start Development Servers

### Terminal 1: Vite Dev Server

```bash
npm run dev
```

Wait for:

```
VITE v7.2.0 running at:
  ➜ Local:   http://localhost:5173/
```

✅ When you see this, Vite is running.

### Terminal 2: Convex Backend

```bash
npm run convex:dev
```

Wait for:

```
Convex is running at http://localhost:3210
```

✅ When you see this, Convex is running.

---

## 🌐 Step 3: Access Application

Claude Code should show a **Ports** or **Preview** notification.

Click port **5173** to open your app.

You should see:

- ✅ "Narrative Canvas Platform" title
- ✅ "React 19.2+ with TypeScript 5.9+" (should be 18.2+ but displays 19.2+)
- ✅ "Vite 7.2+ development server"
- ✅ "Convex backend ready"
- ✅ "Tailwind CSS 4.0 configured"
- ✅ Blue box showing "Environment: development"
- ✅ Blue button that says "Click count: 0"
- ✅ Text "Story 1.1: Initialize Convex + React Project ✓ Complete"

Click the button - it should increment the counter.

✅ If everything works, your app is ready!

---

## ❌ Troubleshooting

### "Command not found: npm"

```bash
node --version  # Should show v20.x+
npm --version   # Should show npm 10.x+
```

### "Port 5173 already in use"

```bash
npm run dev -- --port 3000
```

### "Module not found"

```bash
npm install
```

### "TypeScript errors"

```bash
npx tsc --noEmit  # See detailed errors
```

### "Convex connection failed"

Make sure `.env.local` has:

```
VITE_CONVEX_URL=http://localhost:3210
```

---

## 📋 Final Alignment Checklist

Before starting Story 1.3, verify:

- [ ] Git branch is `main`
- [ ] Latest commit: `c656137` (Add alignment check script)
- [ ] No uncommitted changes
- [ ] TypeScript compiles (npx tsc --noEmit)
- [ ] Dependencies installed (npm install)
- [ ] Both servers can start (npm run dev and npm run convex:dev)
- [ ] App loads on http://localhost:5173
- [ ] Click counter works
- [ ] No console errors (F12 to check)

---

## ✅ Ready for Story 1.3?

If all checks pass, you're aligned and ready!

**Next:** Story 1.3: Configure OpenRouter API Integration

See `output/epics.md` → Search for "Story 1.3" for requirements.

---

## 📞 Quick Commands Reference

```bash
# Verify alignment
bash ALIGNMENT_CHECK.sh

# Check git status
git status

# See latest commits
git log --oneline -5

# Install dependencies
npm install

# Start Vite (port 5173)
npm run dev

# Start Convex (port 3210)
npm run convex:dev

# Check TypeScript
npx tsc --noEmit

# Check dependencies
npm list react convex vite

# View environment
cat .env.local

# See open ports
lsof -i :5173  # Vite
lsof -i :3210  # Convex
```

---

**You're aligned when all checks pass! Good luck with Story 1.3! 🚀**
