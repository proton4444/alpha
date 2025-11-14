# 🚀 Quick Start for Narrative Canvas Platform in Claude Code

**Your project is ready! Here's everything you need to get started immediately.**

---

## 📍 You Are Here

✅ **Story 1.1** - Initialize Convex + React Project  
✅ **Story 1.2** - Define Convex Database Schema  
🚀 **Next: Story 1.3** - Configure OpenRouter API Integration  

**Total Progress:** 2/26 stories complete (8%)  
**Time to PoC Success:** ~10-15 more hours

---

## 🎯 Start Development in 3 Steps

### Step 1: Open Two Terminal Tabs

**Tab 1 - Vite Dev Server:**
```bash
cd projects/alpha
npm run dev
```

Wait for:
```
VITE v7.2.0 running at:
  ➜ Local:   http://localhost:5173/
```

**Tab 2 - Convex Backend:**
```bash
cd projects/alpha
npm run convex:dev
```

Wait for:
```
Convex is running at http://localhost:3210
```

### Step 2: Access Your Application

Claude Code will show a **"Ports"** or **"Preview"** button → Click port **5173**

You'll see:
- ✅ "Narrative Canvas Platform" title
- ✅ React + Vite + Convex status
- ✅ Click counter button (verify interactivity)

### Step 3: Ready to Code!

Both servers are running. You're ready to implement stories.

---

## 📚 Documentation Map

### Quick References
- **`README.md`** - Project overview
- **`CLAUDE_CODE_START.md`** - Detailed startup instructions
- **`STORY_1_2_GUIDE.md`** - Story 1.2 (already complete!)

### Planning Documents (in `output/`)
- **`PRD.md`** - What the product does
- **`architecture.md`** - How to build it (17 ADRs, implementation patterns)
- **`epics.md`** - All 26 user stories with acceptance criteria

### Sprint Tracking
- **`.temp/sprint-status.yaml`** - Track which stories are done

### Environment
- **`.env.local`** - Your environment configuration
- **`.env.local.example`** - Template for new vars

---

## 🎬 Stories Overview

### Completed ✅
- **1.1** Initialize Convex + React with TypeScript and Tailwind
- **1.2** Define Convex Database Schema (stories, chapters, scenes, characters)

### Ready to Start 🚀
- **1.3** Configure OpenRouter API Integration
- **1.4** Implement TOON Parser Utility  
- **1.5** Set Up shadcn/ui Component Library

### Data Layer (After 1.5)
- **2.1-2.6** Story Structure Management (CRUD operations, Tree UI, Auto-save)

### AI Pipeline (After 2.6) ← PoC Success! 🎉
- **3.1-3.3** Character System
- **4.1-4.6** AI Scene Generation (Multi-agent pipeline)

### Polish (After 4.6)
- **5.1-5.5** Split-Screen Workspace & UX Polish

---

## 📂 Project Structure

```
projects/alpha/
├── src/                          # React Frontend
│   ├── App.tsx                  # Root component + Convex provider
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind CSS
│   └── vite-env.d.ts            # TypeScript definitions
│
├── convex/                       # Convex Backend
│   ├── schema.ts                # Database schema (✅ Complete)
│   ├── example.ts               # Example mutations/queries
│   ├── actions/                 # AI actions (Story 4.x)
│   ├── lib/                     # Utilities (TOON parser in 1.4)
│   └── _generated/              # Auto-generated types
│
├── Configuration
│   ├── vite.config.ts           # Vite setup
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.ts       # Tailwind CSS
│   ├── postcss.config.js        # PostCSS
│   └── package.json             # 262 dependencies
│
└── Documentation
    ├── README.md                # Getting started
    ├── CLAUDE_CODE_START.md     # Startup guide
    ├── STORY_1_2_GUIDE.md       # Story 1.2 details
    └── CLOUD_IDE_SETUP.md       # Cloud IDE workflows
```

---

## ⚡ Available npm Scripts

```bash
npm run dev              # Start Vite dev server (port 5173)
npm run convex:dev      # Start Convex backend (port 3210)
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Lint TypeScript (find errors)
```

---

## 🔄 Development Workflow

### For Each Story:

1. **Read the requirements** from `output/epics.md`
2. **Check the guide** (like `STORY_1_2_GUIDE.md`)
3. **Implement the code** in appropriate files
4. **Test in browser** on http://localhost:5173
5. **Commit changes:**
   ```bash
   git add -A
   git commit -m "[FEAT] Story X.Y: Description"
   git push origin main
   ```
6. **Update tracking:** Edit `.temp/sprint-status.yaml` to mark story as `done`

### Git Commands You'll Use Often:

```bash
# See what changed
git status

# Commit your work
git add -A
git commit -m "[FEAT] Story X.Y: Title"

# Push to GitHub
git push origin main

# See your commits
git log --oneline -10
```

---

## 📖 How to Find Things

### "How do I implement Story X?"
→ Open `output/epics.md`, search for "Story X"

### "What's the architecture decision for feature Y?"
→ Open `output/architecture.md`, search for the feature

### "How do I use Convex?"
→ Check `convex/example.ts` for examples
→ Read [Convex Docs](https://docs.convex.dev)

### "How do I verify my code is correct?"
→ Run dev servers: `npm run dev` and `npm run convex:dev`
→ Check browser for errors: Open DevTools (F12)

### "What's the status of all stories?"
→ Check `.temp/sprint-status.yaml`

---

## 🎯 Next: Story 1.3

**Configure OpenRouter API Integration and Environment Variables**

### What You'll Do:
1. Add OpenRouter API key to Convex environment
2. Create `convex/actions/openrouter.ts` helper
3. Implement secure API calls to Claude 3.5 Sonnet

### Estimated Time: 30-45 minutes

### Files to Create/Edit:
- `convex/actions/openrouter.ts` (new)
- `.env.local` (update with API key if needed)

### Where to Find Requirements:
→ `output/epics.md` → Search for "Story 1.3"

---

## 💡 Pro Tips

1. **Keep both servers running** - Vite auto-reloads on file changes
2. **Check browser console** for errors (F12)
3. **Git commit frequently** - Small commits are easier to debug
4. **Read the acceptance criteria** before coding - It tells you exactly what to build
5. **Use Ctrl+Shift+F** to search across all project files in Claude Code
6. **npm run lint** to catch TypeScript errors before running

---

## 🆘 Troubleshooting

### "Port 5173 already in use"
```bash
npm run dev -- --port 3000
```

### "npm: command not found"
You need Node.js 20+ and npm installed:
```bash
node --version  # Should show v20.x+
npm --version   # Should show npm 10.x+
```

### "Module not found: convex"
```bash
npm install
```

### "TypeScript errors"
```bash
npx tsc --noEmit  # See detailed errors
```

### "Schema validation failed"
```bash
npm run convex:dev  # Check Convex logs for details
```

---

## 📊 Progress Tracking

Update `.temp/sprint-status.yaml` as you complete stories:

```yaml
development_status:
  epic-1: contexted        # ← Change from "backlog" to "contexted"
  1-1-initialize-convex-react-project-with-starter-template: done
  1-2-define-convex-database-schema: done
  1-3-configure-openrouter-api-integration-and-environment-variables: in-progress
  # ... rest of stories
```

---

## 🚀 You're Ready!

Everything is set up. You have:
- ✅ Project initialized with React + Convex
- ✅ Database schema defined
- ✅ Dependencies installed
- ✅ Documentation ready
- ✅ 24 more stories to implement

**Start with Story 1.3 and keep momentum!**

---

## 📞 Quick Reference

| Need | Location |
|------|----------|
| Story requirements | `output/epics.md` |
| Architecture | `output/architecture.md` |
| API patterns | `convex/example.ts` |
| Dev server setup | `CLAUDE_CODE_START.md` |
| Progress tracking | `.temp/sprint-status.yaml` |
| Environment vars | `.env.local` |
| TypeScript errors | Run `npx tsc --noEmit` |

---

**Happy coding! 🎉**

Your Narrative Canvas Platform awaits. Let's build something amazing!
