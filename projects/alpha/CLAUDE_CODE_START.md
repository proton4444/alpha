# Starting Narrative Canvas Platform in Claude Code Online

## Quick Start (Copy & Paste)

In Claude Code terminal, run these commands in **separate terminal tabs**:

### Terminal 1: Vite Dev Server
```bash
cd projects/alpha
npm run dev
```

Wait for this output:
```
VITE v7.2.0 running at:
  ➜ Local:   http://localhost:5173/
```

### Terminal 2: Convex Backend (NEW TAB)
```bash
cd projects/alpha
npm run convex:dev
```

Wait for this output:
```
Convex is running at http://localhost:3210
```

## Accessing Your App

1. Once both servers are running, Claude Code should show a **"Ports"** or **"Preview"** notification
2. Click on port **5173** to open your application
3. You should see the "Narrative Canvas Platform" homepage

## Verification Checklist

✅ Vite running on port 5173  
✅ Convex running on port 3210  
✅ App loads in browser  
✅ No console errors  

## Common Issues

### "command not found: npm"
```bash
node --version  # Should show v20+
npm --version   # Should show npm 10+
```

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

### "Cannot find module 'convex'"
```bash
npm install
```

## Next: Story 1.2

Once servers are running, you're ready for **Story 1.2: Define Convex Database Schema**

See `epics.md` for full requirements.

## Scripts Available

```bash
npm run dev          # Vite development server (port 5173)
npm run convex:dev   # Convex backend (port 3210)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint TypeScript
```

---

**Need help?** Check `README.md` or `CLOUD_IDE_SETUP.md`
