# Alpha Project Structure - BMAD Method Integration

**Version**: 1.0
**Created**: 2025-11-13
**Purpose**: Define project structure that keeps BMAD Method synced while maintaining clean project Git workflow

---

## 📁 Directory Structure

```
C:\knosso\Alpha\
├── .git/                          # BMAD Method repository (from github.com/bmad-code-org/BMAD-METHOD)
├── .bmad/                         # BMAD configuration (DO NOT EDIT - synced from remote)
├── .claude/                       # Claude Code configuration (DO NOT EDIT)
├── docs/                          # BMAD documentation (DO NOT EDIT - synced from remote)
├── src/                           # BMAD source code (DO NOT EDIT - synced from remote)
│
├── START.bat                      # Update & initialization script
├── .gitignore                     # Git ignore rules
├── README.md                      # BMAD Method overview
│
├── projects/                      # YOUR PROJECT FILES (THIS IS EDITABLE)
│   └── alpha/
│       ├── .project/              # Project-specific metadata
│       │   ├── prd.md             # Project requirements document
│       │   ├── architecture.md    # Technical architecture decisions
│       │   ├── epics.md           # Epic breakdown
│       │   ├── stories/           # Story files (one per file)
│       │   │   ├── epic-1/
│       │   │   ├── epic-2/
│       │   │   └── ...
│       │   ├── decisions.md       # ADRs (Architecture Decision Records)
│       │   └── status.yaml        # Current sprint status
│       │
│       ├── src/                   # Project source code
│       │   ├── agents/            # Custom agents for this project
│       │   ├── workflows/         # Custom workflows for this project
│       │   ├── components/        # Reusable components
│       │   └── ...
│       │
│       ├── tests/                 # Project tests
│       ├── docs/                  # Project documentation
│       └── README.md              # Alpha project overview
│
├── output/                        # BMAD Method execution outputs (generated)
│   ├── bmm-workflow-status.yaml   # Workflow tracking
│   ├── research-*.md              # Research outputs
│   ├── prd.md                     # Generated PRD
│   └── ...
│
└── .gitignore                     # Prevents BMAD conflicts
```

---

## 🎯 Key Principles

### 1. **BMAD Method is Read-Only**
- Everything in `/src`, `/docs`, `/.bmad`, `/.claude` is synced from GitHub
- **Never** edit these files directly
- Always pull updates via `START.bat`
- Any customizations go in `projects/alpha/.project/_cfg/` (created later if needed)

### 2. **Your Project is in `/projects/alpha/`**
- All your code, tests, stories, and documentation live here
- This folder is **fully git-tracked** in Alpha repo
- Separate from BMAD Method updates
- Can commit/push without affecting BMAD sync

### 3. **Output is Generated**
- `/output` folder contains results from BMAD workflows
- Generated files (PRD, Epics, etc.) created here
- Can be regenerated anytime without losing data
- Often ignored in git (optional)

### 4. **No Conflicts Between BMAD & Your Project**
- BMAD files: `src/`, `docs/`, `.bmad/`, `.claude/` → **Read-only, auto-updated**
- Your project: `projects/alpha/` → **Your exclusive workspace**
- Generated: `output/` → **Auto-generated, can be ignored**

---

## 🚀 Workflow: Using BMAD Method on Your Project

### Phase 1: Project Discovery & Analysis
```
├── Brainstorm project ideas
│   └── /bmad:bmm:workflows:brainstorm-project
│
├── Research domain/market/technical
│   └── /bmad:bmm:workflows:domain-research
│
└── Create product brief
    └── /bmad:bmm:workflows:product-brief
    
Output: Brief summary of vision and approach
Location: output/product-brief.md
```

### Phase 2: Planning & Design
```
├── Create PRD (Product Requirements Document)
│   └── /bmad:bmm:workflows:prd
│   Output: output/PRD.md
│
├── Create Architecture
│   └── /bmad:bmm:workflows:architecture
│   Output: output/ARCHITECTURE.md
│
├── Generate Epics & Stories
│   └── /bmad:bmm:workflows:create-epics-and-stories
│   Output: output/epics.md + output/stories/
│
└── Create UX Design
    └── /bmad:bmm:workflows:create-ux-design
    Output: output/ux-specification.md
    
Save to Project: Copy outputs to projects/alpha/.project/
```

### Phase 3: Implementation (Sprint Cycles)
```
For each story:
  1. Generate context
     └── /bmad:bmm:workflows:story-context
     
  2. Develop story
     └── /bmad:bmm:workflows:dev-story
     Location: projects/alpha/src/
     
  3. Code review
     └── /bmad:bmm:workflows:code-review
     
  4. Mark done
     └── /bmad:bmm:workflows:story-done
     
  5. Commit to Git
     git add projects/alpha/
     git commit -m "[STORY] 1.1: Feature X implemented"
```

### Phase 4: Testing & Quality
```
├── Design test architecture
│   └── /bmad:bmm:testarch/test-design
│
├── Implement tests
│   └── /bmad:bmm:testarch/automate
│   Location: projects/alpha/tests/
│
└── Review test quality
    └── /bmad:bmm:testarch/test-review
```

### Phase 5: Continuous Improvement
```
├── Retrospectives
│   └── /bmad:bmm:workflows:retrospective
│
├── Course corrections
│   └── /bmad:bmm:workflows:correct-course
│
└── Sprint planning (next cycle)
    └── /bmad:bmm:workflows:sprint-planning
```

---

## 📝 File Organization Examples

### `.project/prd.md`
```markdown
# Alpha Project - Product Requirements Document

**Last Updated**: 2025-11-13
**Generated From**: /bmad:bmm:workflows:prd

## Vision
...

## Requirements
...

## Success Criteria
...
```

### `.project/stories/epic-1/story-1.1.md`
```markdown
# Story 1.1: Feature X

**Epic**: 1 - Core System
**Status**: READY-FOR-DEV
**Acceptance Criteria**: 
- [ ] AC 1
- [ ] AC 2

**Implementation Notes**:
- See /projects/alpha/src/feature-x.ts
- Tests in /projects/alpha/tests/feature-x.test.ts
```

### `.project/status.yaml`
```yaml
project: alpha
phase: 3-implementation
current_epic: 1
current_story: 1.2
sprint: 1

stories_completed: 5
stories_in_progress: 1
stories_backlog: 12

last_update: 2025-11-13
```

---

## 🔄 Git Workflow (No BMAD Conflicts)

### Daily Workflow
```bash
# 1. Start session - pull BMAD updates
./START.bat
# This updates .bmad/, src/, docs/ from GitHub

# 2. Work on your project
cd projects/alpha/
# Edit src/, tests/, docs/

# 3. Commit your work (NEVER touches BMAD files)
git add projects/alpha/
git add output/           # (optional - generated files)
git commit -m "[FEATURE] Implement X"

# 4. Push to your repo
git push origin main
```

### Avoiding Conflicts
**DO:**
- ✅ Commit only `projects/alpha/` folder
- ✅ Commit `.project/` status files (prd.md, status.yaml, etc.)
- ✅ Commit `output/` if you want to track generated docs (optional)
- ✅ Run `./START.bat` to update BMAD regularly

**DON'T:**
- ❌ Never commit `.bmad/`, `src/`, `docs/` (except projects/alpha/ subdirs)
- ❌ Don't manually edit BMAD files
- ❌ Don't merge BMAD updates into your commits
- ❌ Don't create files at repo root (keep everything in `projects/alpha/`)

### `.gitignore` Setup
```gitignore
# BMAD files (auto-updated, don't track)
.bmad/
.claude/
src/
docs/
tools/
test/
.husky/
.npm*
.nvmrc
eslint.config.mjs
prettier.config.mjs
package*.json
CHANGELOG.md
CONTRIBUTING.md
LICENSE

# Generated outputs (optional - can track or ignore)
# output/

# Node/Python deps
node_modules/
__pycache__/
*.egg-info/
venv/

# IDE
.vscode/
.idea/
*.swp

# Misc
.DS_Store
nul
```

---

## 📊 Example: Full Cycle from Brainstorm to Deployment

### Day 1: Brainstorm & Research
```bash
# Run brainstorm workflow
/bmad:bmm:workflows:brainstorm-project

# Results saved to output/
# Review and document in projects/alpha/.project/vision.md
```

### Day 2-3: Create PRD & Architecture
```bash
# Generate PRD
/bmad:bmm:workflows:prd
# Output: output/PRD.md

# Generate Architecture
/bmad:bmm:workflows:architecture
# Output: output/ARCHITECTURE.md

# Copy to project
cp output/PRD.md projects/alpha/.project/prd.md
cp output/ARCHITECTURE.md projects/alpha/.project/architecture.md

# Commit
git add projects/alpha/.project/
git commit -m "[PLAN] PRD and Architecture created"
```

### Day 4-5: Create Epics & Stories
```bash
# Generate epics and stories
/bmad:bmm:workflows:create-epics-and-stories
# Output: output/epics.md, output/stories/

# Copy to project
cp output/epics.md projects/alpha/.project/epics.md
cp -r output/stories/* projects/alpha/.project/stories/

# Commit
git add projects/alpha/.project/
git commit -m "[PLAN] Epics and stories defined"
```

### Week 1+: Sprint Development
```bash
# For each story
/bmad:bmm:workflows:story-context    # Prepare
/bmad:bmm:workflows:dev-story        # Implement in projects/alpha/src/
/bmad:bmm:workflows:code-review      # Review
/bmad:bmm:workflows:story-done       # Complete

# After each story
git add projects/alpha/
git commit -m "[STORY 1.1] Feature implemented and tested"
```

---

## 🎯 Benefits of This Structure

| Benefit | How It Works |
|---------|-------------|
| **BMAD Always Updated** | `START.bat` pulls latest from GitHub regularly |
| **No Git Conflicts** | Your code in isolated `projects/` folder |
| **Clean Git History** | Only your code in commits, no BMAD noise |
| **Reproducible Builds** | BMAD version always known, your code tracked |
| **Easy Collaboration** | Team pulls BMAD + works on projects/ together |
| **Scalable** | Can have multiple projects (alpha, beta, gamma) |
| **Flexible** | Use BMAD workflows OR work independently |

---

## 🚀 Getting Started

### Step 1: Create Project Structure
```bash
cd C:\knosso\Alpha
mkdir -p projects/alpha/.project/stories/epic-1
mkdir projects/alpha/src
mkdir projects/alpha/tests
mkdir projects/alpha/docs
```

### Step 2: Initialize Project
```bash
# Create initial files
cat > projects/alpha/.project/prd.md << EOF
# Alpha Project PRD

**Version**: 1.0
**Created**: 2025-11-13

## Vision
Define your project vision here

## Key Features
1. Feature X
2. Feature Y

## Success Criteria
...
EOF

# Create status file
cat > projects/alpha/.project/status.yaml << EOF
project: alpha
phase: 1-discovery
sprint: 0
stories_completed: 0
last_update: 2025-11-13
EOF

# Create project README
cat > projects/alpha/README.md << EOF
# Alpha Project

Using BMAD Method for development.

See `.project/` folder for:
- `prd.md` - Product requirements
- `architecture.md` - Technical design
- `epics.md` - Epic breakdown
- `stories/` - Individual stories
- `status.yaml` - Current sprint status
EOF
```

### Step 3: First Git Commit
```bash
cd C:\knosso\Alpha
git add projects/
git commit -m "[INIT] Alpha project structure initialized"
git push origin main
```

### Step 4: Start Using BMAD Workflows
```bash
# Run brainstorm workflow to kick off project
/bmad:bmm:workflows:brainstorm-project

# Then run other workflows as needed
/bmad:bmm:workflows:prd
/bmad:bmm:workflows:architecture
```

---

## 📞 Quick Reference

### Essential Commands

**Update BMAD & Initialize**
```bash
./START.bat
```

**Start New Brainstorm**
```bash
/bmad:bmm:workflows:brainstorm-project
```

**Create PRD**
```bash
/bmad:bmm:workflows:prd
```

**Check Project Status**
```bash
cat projects/alpha/.project/status.yaml
```

**Commit Project Work**
```bash
git add projects/alpha/
git commit -m "[TYPE] Description"
git push origin main
```

**Switch BMAD Branches** (if needed)
```bash
git fetch origin
git checkout -b feature-branch origin/feature-branch
./START.bat
```

---

## ⚠️ Important Notes

1. **Always run `START.bat` before starting work** - Keeps BMAD synced
2. **Put all project files in `projects/alpha/`** - Prevents conflicts
3. **Save BMAD outputs to `.project/`** - Maintains organization
4. **Commit only `projects/` folder** - Clean git history
5. **Use BMAD workflows for planning** - They're purpose-built
6. **Don't edit BMAD files directly** - They're auto-managed

---

**Ready to start? Run `./START.bat` and then `/bmad:bmm:workflows:brainstorm-project`**
