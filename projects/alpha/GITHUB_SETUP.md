# GitHub Setup for Narrative Canvas Platform

Your local commit is ready to push! Follow these steps to set up GitHub.

## Quick Setup (2 minutes)

### Step 1: Create Repository on GitHub (Manual - 1 minute)

1. Go to: https://github.com/new
2. Enter:
   - **Repository name:** `narrative-canvas`
   - **Description:** "AI-powered story generation engine with visual organization and AI-assisted prose generation"
   - **Visibility:** Public or Private (your choice)
   - **Important:** DO NOT check "Add a README file" (you already have files locally)
   - **Important:** DO NOT initialize with .gitignore (you already have it)
3. Click **"Create repository"**

### Step 2: Push Code to GitHub (In Claude Code Terminal)

After creating the repository on GitHub, you'll see instructions. Copy your repository HTTPS URL (looks like: `https://github.com/YOUR-USERNAME/narrative-canvas.git`)

Then run in Claude Code terminal:

```bash
cd projects/alpha
git remote set-url origin https://github.com/YOUR-USERNAME/narrative-canvas.git
git push -u origin main
```

**That's it!** Your code is now on GitHub.

## Verification

After pushing, visit: `https://github.com/YOUR-USERNAME/narrative-canvas`

You should see:
- ✅ Commit message: "[FEAT] Story 1.1: Initialize Convex + React project..."
- ✅ Files: src/, convex/, index.html, package.json, README.md, etc.
- ✅ 5,509 insertions

## What's Being Pushed

**Commit ff42a46 includes:**

### Project Structure
- `src/App.tsx` - React component with Convex integration
- `src/main.tsx` - Entry point
- `src/index.css` - Tailwind CSS
- `convex/schema.ts` - Database schema (stories, chapters, scenes, characters)
- `convex/example.ts` - Example queries and mutations
- Config files (vite.config.ts, tsconfig.json, tailwind.config.ts, etc.)
- `package.json` with all dependencies

### Documentation
- `README.md` - Project overview and getting started
- `CLOUD_IDE_SETUP.md` - Cloud IDE development workflows
- `GITHUB_SETUP.md` - This file

### Design Artifacts (from planning phase)
- `../output/PRD.md` - Product requirements
- `../output/architecture.md` - Technical architecture
- `../output/epics.md` - 26 user stories for implementation
- `../output/implementation-readiness-report-2025-11-14.md` - Gate check validation

### Configuration
- `.env.local.example` - Environment variable template
- `.gitignore` - Git ignore rules
- TypeScript configurations

## Troubleshooting

### "Permission denied"
- Make sure you're using your GitHub username/repo name
- Verify GitHub PAT has `repo` scope

### "Branch is ahead of origin"
- This is expected (you have local commits)
- `git push -u origin main` will sync them

### "Repository not found"
- Verify you created it on GitHub.com
- Check the URL spelling
- Make sure it's not marked as private (unless intended)

## Next Steps

Once code is pushed to GitHub:

1. Continue development in Claude Code
2. Push frequently: `git push`
3. Track progress in sprint-status.yaml
4. Implement next stories (1.2, 1.3, 1.4, 1.5...)

## GitHub Actions (Optional - Post-PoC)

After PoC completion, add CI/CD:
- Automated tests
- Linting and formatting
- Build verification
- Deployment to production

(Deferred to post-PoC per Architecture ADR-003)
