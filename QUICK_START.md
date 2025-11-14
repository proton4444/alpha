# Alpha Project - Quick Start Guide

**Created**: 2025-11-13  
**Using**: BMAD Method v6.0.0-alpha.9

---

## 🎯 5-Minute Setup

### 1. Verify Everything is Ready

```bash
cd C:\knosso\Alpha
./START.bat
```

✅ This pulls latest BMAD updates and confirms your setup

### 2. Check Project Status

```bash
cat projects/alpha/.project/status.yaml
```

### 3. Read Project Overview

```bash
cat projects/alpha/README.md
```

---

## 🚀 First Steps (Pick One)

### Option A: Start Fresh Brainstorm

**For**: New project with no requirements yet

```bash
/bmad:bmm:workflows:brainstorm-project
```

- This generates ideas for your Alpha project
- Results saved to `output/`
- Copy interesting findings to `projects/alpha/.project/prd.md`

### Option B: Create from Existing Vision

**For**: You know what you want to build

```bash
# 1. Edit your project requirements
nano projects/alpha/.project/prd.md

# 2. Create the PRD workflow
/bmad:bmm:workflows:prd

# 3. Design the architecture
/bmad:bmm:workflows:architecture

# 4. Commit your planning
git add projects/alpha/
git commit -m "[PLAN] Initial PRD and Architecture"
```

### Option C: Continue Existing Project

**For**: Resuming work on Alpha

```bash
# 1. Check where you left off
cat projects/alpha/.project/status.yaml

# 2. See current story
cat projects/alpha/.project/stories/epic-*/story-*.md

# 3. Continue development
/bmad:bmm:workflows:dev-story
```

---

## 📋 Daily Workflow (5 Minutes)

```bash
# 1. Start your day
cd C:\knosso\Alpha
./START.bat

# 2. Check what needs doing
/bmad:bmm:workflows:workflow-status

# 3. Work on current story
/bmad:bmm:workflows:dev-story

# 4. End of day: commit work
git add projects/alpha/
git commit -m "[STORY X.X] Description of work"
git push origin main
```

---

## 🔄 Full Development Cycle

### Phase 1: Discovery (Days 1-2)

```bash
/bmad:bmm:workflows:brainstorm-project
# Output: ideas and vision
```

### Phase 2: Planning (Days 3-5)

```bash
/bmad:bmm:workflows:prd                    # Create PRD
/bmad:bmm:workflows:architecture           # Design system
/bmad:bmm:workflows:create-epics-and-stories # Break down work
```

### Phase 3: Technical Design (Days 6-7)

```bash
/bmad:bmm:workflows:epic-tech-context      # Technical specs
/bmad:bmm:testarch/test-design            # Test strategy
```

### Phase 4: Implementation (Week 2+)

```bash
# For each story:
/bmad:bmm:workflows:story-context         # Prepare
/bmad:bmm:workflows:dev-story             # Implement
/bmad:bmm:workflows:code-review           # Review
/bmad:bmm:workflows:story-done            # Complete
```

---

## 💾 Git Workflow (Keep It Simple)

### Commit Your Work

```bash
# Stage your project files
git add projects/alpha/

# Commit with clear message
git commit -m "[STORY 1.1] Implemented feature X"

# Push to origin
git push origin main
```

### Messages Format

```
[TYPE] Description

Types:
[INIT]   - Initial setup
[PLAN]   - Planning documents (PRD, Architecture)
[STORY]  - Story implementation
[FIX]    - Bug fix
[TEST]   - Test additions
[REFACTOR] - Code cleanup
[DOCS]   - Documentation
```

### Example Commits

```bash
git commit -m "[PLAN] PRD and Architecture created"
git commit -m "[STORY 1.1] User authentication implemented"
git commit -m "[TEST] Added unit tests for auth"
git commit -m "[FIX] Fixed password validation bug"
```

---

## 📁 Key Files & Folders

| Path                                      | Purpose              | Edit?                |
| ----------------------------------------- | -------------------- | -------------------- |
| `projects/alpha/.project/prd.md`          | Product requirements | ✅ Yes               |
| `projects/alpha/.project/architecture.md` | Technical design     | ✅ Yes               |
| `projects/alpha/.project/status.yaml`     | Sprint status        | ⚠️ Via workflows     |
| `projects/alpha/src/`                     | Your code            | ✅ Yes               |
| `projects/alpha/tests/`                   | Your tests           | ✅ Yes               |
| `.bmad/`                                  | BMAD Method          | ❌ No - auto-managed |
| `src/` (root)                             | BMAD source          | ❌ No - auto-managed |
| `docs/` (root)                            | BMAD docs            | ❌ No - auto-managed |

---

## 🆘 Troubleshooting

### "I don't know what to work on"

```bash
cat projects/alpha/.project/status.yaml
cat projects/alpha/.project/stories/epic-1/story-*.md
```

### "BMAD files are conflicting"

```bash
# Don't edit .bmad/, src/, docs/ directly
# Always work in projects/alpha/
# Run ./START.bat to refresh BMAD files
./START.bat
```

### "I want to check my progress"

```bash
/bmad:bmm:workflows:workflow-status
cat projects/alpha/.project/status.yaml
```

### "I need to update the plan"

```bash
/bmad:bmm:workflows:prd
# Update projects/alpha/.project/prd.md with results
```

---

## ⚡ Essential Commands

| Command                                          | What It Does                    |
| ------------------------------------------------ | ------------------------------- |
| `./START.bat`                                    | Update BMAD, initialize project |
| `/bmad:bmm:workflows:brainstorm-project`         | Generate ideas                  |
| `/bmad:bmm:workflows:prd`                        | Create product requirements     |
| `/bmad:bmm:workflows:architecture`               | Design system                   |
| `/bmad:bmm:workflows:story-context`              | Prep a story                    |
| `/bmad:bmm:workflows:dev-story`                  | Implement a story               |
| `/bmad:bmm:workflows:code-review`                | Review code                     |
| `/bmad:bmm:workflows:story-done`                 | Mark story complete             |
| `/bmad:bmm:workflows:workflow-status`            | Check progress                  |
| `git add projects/alpha/ && git commit -m "..."` | Save work                       |
| `git push origin main`                           | Push to GitHub                  |

---

## 🎓 Learning Resources

### BMAD Method Guides

```
C:\knosso\Alpha\docs/index.md           # Documentation index
C:\knosso\Alpha\docs/ide-info/          # IDE-specific guides
C:\knosso\Alpha\README.md               # BMAD overview
```

### Your Project Docs

```
C:\knosso\Alpha\projects\alpha\README.md              # Project overview
C:\knosso\Alpha\projects\alpha\.project\prd.md       # Requirements
C:\knosso\Alpha\projects\alpha\.project\architecture.md # Design
```

### Claude Code Resources

```
https://docs.claude.com/en/docs/claude-code/
```

---

## 🏁 Your First Task

**Pick one and do it now:**

### Quick (15 min)

```bash
./START.bat
/bmad:bmm:workflows:workflow-status
cat projects/alpha/README.md
```

### Medium (1 hour)

```bash
./START.bat
/bmad:bmm:workflows:brainstorm-project
# Read output, update projects/alpha/.project/prd.md
git add projects/alpha/
git commit -m "[PLAN] Initial project brainstorm"
```

### Full Setup (3 hours)

```bash
./START.bat
/bmad:bmm:workflows:brainstorm-project
/bmad:bmm:workflows:prd
/bmad:bmm:workflows:architecture
/bmad:bmm:workflows:create-epics-and-stories
# Copy outputs to .project/, commit everything
git add projects/alpha/
git commit -m "[PLAN] Complete planning phase"
```

---

## ✨ Next Steps After Quick Start

1. **Define Your Vision**: Use `/bmad:bmm:workflows:brainstorm-project`
2. **Create PRD**: Use `/bmad:bmm:workflows:prd`
3. **Design Architecture**: Use `/bmad:bmm:workflows:architecture`
4. **Break Down Work**: Use `/bmad:bmm:workflows:create-epics-and-stories`
5. **Start Implementing**: Use `/bmad:bmm:workflows:dev-story` for each story
6. **Track Progress**: Update `.project/status.yaml` via workflows
7. **Ship Code**: Commit to git regularly

---

## 💡 Pro Tips

- ✅ Run `./START.bat` every morning to keep BMAD synced
- ✅ Use BMAD workflows - they handle planning automatically
- ✅ Commit frequently (after each story)
- ✅ Always run tests before committing
- ✅ Keep `.project/status.yaml` updated
- ✅ Save workflow outputs to `.project/` for safekeeping

- ❌ Don't edit BMAD files directly
- ❌ Don't commit BMAD folders
- ❌ Don't skip story acceptance criteria
- ❌ Don't manually edit sprint status (use workflows)

---

**Ready? Start here:**

```bash
cd C:\knosso\Alpha
./START.bat
/bmad:bmm:workflows:brainstorm-project
```

Good luck! 🚀
