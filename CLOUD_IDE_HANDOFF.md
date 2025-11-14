# Handoff to Claude Code - Narrative Canvas Platform

## Status Summary

✅ **Story 1.1 COMPLETE** - Convex + React Project Initialized

All work is committed locally and ready to push to GitHub.

---

## Your Current Work

**Commit:** `ff42a46`  
**Branch:** `main`  
**Files Changed:** 26 files  
**Insertions:** 5,509 lines  

### What Was Accomplished

- ✅ React 18.2 + TypeScript 5.9 project initialized
- ✅ Vite 7.2 development server configured
- ✅ Convex backend with complete database schema
- ✅ Tailwind CSS 4.0 styling setup
- ✅ 262 npm dependencies installed (0 vulnerabilities)
- ✅ TypeScript compilation verified
- ✅ Cloud IDE development workflows documented
- ✅ Example mutations and queries ready

---

## Next Steps in Claude Code

### Step 1: Create GitHub Repository (1 minute)

```
1. Go to https://github.com/new
2. Name: "narrative-canvas"
3. DO NOT initialize with README/gitignore
4. Create repository
5. Copy the HTTPS URL
```

### Step 2: Push Code (30 seconds)

```bash
cd projects/alpha
git remote set-url origin https://github.com/YOUR-USERNAME/narrative-canvas.git
git push -u origin main
```

**Done!** Your code is now on GitHub.

### Step 3: Verify Setup

```bash
npm install
npm run dev
```

Should start Vite on port 5173 with working Convex integration.

---

## Files to Know

### Project Root: `projects/alpha/`

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `src/App.tsx` | React root component |
| `convex/schema.ts` | Database schema definition |
| `README.md` | Project overview |
| `CLOUD_IDE_SETUP.md` | Cloud IDE workflows |
| `.env.local` | Environment configuration |

### Documentation: `output/`

| File | Purpose |
|------|---------|
| `PRD.md` | Product requirements |
| `architecture.md` | Technical architecture (17 ADRs) |
| `epics.md` | 5 epics, 26 user stories |
| `implementation-readiness-report-2025-11-14.md` | Gate check validation |

### Sprint Tracking: `.temp/`

| File | Purpose |
|------|---------|
| `sprint-status.yaml` | Story tracking (all 26 stories in backlog) |
| `bmm-workflow-status.yaml` | Phase completion tracking |

---

## Development Workflow in Cloud IDE

### Running the Application

**Option 1: Local Development (Recommended)**
```bash
# Terminal 1
npm run dev

# Terminal 2
npm run convex:dev
```

Then access via Claude Code's port forwarding.

**Option 2: Preview Deployment**
```bash
npx convex deploy --preview
# Update VITE_CONVEX_URL in .env.local
npm run dev
```

See `CLOUD_IDE_SETUP.md` for full details on all 3 options.

### Available npm Scripts

```bash
npm run dev              # Start Vite dev server
npm run convex:dev      # Start Convex backend
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Lint TypeScript
```

---

## Next Story: 1.2 - Define Convex Database Schema

The schema.ts file is already created but ready for enhancement in Story 1.2.

**Acceptance Criteria:**
- ✅ Schema file exists with all table definitions
- ⏳ Story 1.2: Add additional validation, indexes, and relationships

**File Location:** `projects/alpha/convex/schema.ts`

See `epics.md` for full Story 1.2 requirements.

---

## Important Notes

### Environment Variables

`.env.local` is set up with:
```
VITE_CONVEX_URL=http://localhost:3210
```

Update this after deploying Convex to production/preview.

### Git Configuration

Your GitHub PAT is set in `.env`:
```
GITHUB_PERSONAL_ACCESS_TOKEN=github_pat_...
```

This is already configured for git operations.

### Cloud IDE Features

Claude Code provides:
- ✅ Integrated terminal (bash)
- ✅ Port forwarding to localhost
- ✅ File editing and preview
- ✅ Git integration
- ✅ MCP servers (GitHub, Playwright, etc.)

---

## Rapid Development Path

### Stories 1.1 - 1.5 (Infrastructure: ~2-3 hours)
- **1.1** ✅ DONE
- **1.2** Schema finalization
- **1.3** OpenRouter API integration
- **1.4** TOON parser utility
- **1.5** shadcn/ui components

### Stories 2.1 - 2.6 (Data Layer: ~3-4 hours)
- Story CRUD operations
- Chapter management
- Scene management
- UI tree component
- Navigation state
- Auto-save functionality

### Stories 3.1 - 3.3 (Characters: ~1-2 hours)
- Character CRUD
- Character manager UI
- Scene-character integration

### Stories 4.1 - 4.6 (AI Pipeline: ~4-5 hours) **← PoC Success!**
- Scheduler pattern
- Character Agent
- Scene Writer Agent
- Complete pipeline
- Scene editor component
- Accept/Regenerate/Edit

### Stories 5.1 - 5.5 (UX Polish: ~2-3 hours)
- Split-screen layout
- Keyboard shortcuts
- Status badges
- Progress feedback
- Visual design polish

**Total Estimated Time: 12-17 hours for complete PoC**

---

## Critical Path to PoC Success

```
1.1 → 1.2 → 2.1 → 2.2 → 2.3 → 3.1 → 
4.1 → 4.2 → 4.3 → 4.4 → 4.5 ✅ PoC SUCCESS!
```

After Story 4.5: **Generate 10 scenes without losing plot** 🎉

---

## Resources in Cloud IDE

Once in Claude Code:

1. **Check status:** `/bmad:bmm:workflows:workflow-status`
2. **Continue stories:** Use `/bmad:bmm:workflows:dev-story` workflow
3. **Update tracking:** Check `.temp/sprint-status.yaml`

---

## Checklist Before Switching

- ✅ Local commit created (ff42a46)
- ✅ Dependencies installed (262 packages)
- ✅ TypeScript compiling without errors
- ✅ Project structure complete
- ✅ Documentation ready
- ✅ Cloud IDE workflows documented
- ⏳ GitHub repository - create in Claude Code

---

## Support

If you encounter issues in Claude Code:

1. Check `CLOUD_IDE_SETUP.md` for troubleshooting
2. Verify `.env.local` has correct VITE_CONVEX_URL
3. Run `npm install` to refresh dependencies
4. Check Convex dashboard for backend status

---

**You're all set for Claude Code! 🚀**

Your local commit is safe. Once you create the GitHub repo and push, you'll have a full backup and can share with collaborators.

Next: Create the GitHub repo, push the code, and continue with Story 1.2 in Claude Code!
