# Alpha Project

**Version**: 1.0  
**Created**: 2025-11-13  
**Using**: BMAD Method (v6.0.0-alpha.9)  

---

## 📖 Overview

Alpha is a project built using the BMAD Method - a structured, agent-driven approach to software development that balances ambitious vision with systematic execution.

This README serves as your project entry point. For detailed information, see the `.project/` folder.

---

## 📁 Project Structure

```
alpha/
├── .project/              # Project metadata & planning
│   ├── prd.md             # Product Requirements Document
│   ├── architecture.md    # Technical Architecture
│   ├── epics.md           # Epic Breakdown
│   ├── stories/           # Individual Stories
│   ├── decisions.md       # Architecture Decision Records
│   └── status.yaml        # Current Sprint Status
│
├── src/                   # Source Code
│   ├── agents/            # Custom agents
│   ├── workflows/         # Custom workflows
│   └── components/        # Reusable components
│
├── tests/                 # Test Suite
│
├── docs/                  # Project Documentation
│
└── README.md              # This file
```

---

## 🚀 Getting Started

### 1. Understand Current Status
```bash
cat .project/status.yaml
```

### 2. Read Project Documentation
```bash
# Product vision
cat .project/prd.md

# Technical design
cat .project/architecture.md

# Work breakdown
cat .project/epics.md
```

### 3. Check Out Current Work
```bash
# See current sprint
cat .project/status.yaml | grep current_

# Browse available stories
ls .project/stories/
```

---

## 🔄 BMAD Method Workflow

Alpha uses the BMAD Method, which follows these phases:

### Phase 1: Discovery
- Brainstorm project ideas
- Research market/domain/technical
- Create product brief

**Workflows**: 
- `/bmad:bmm:workflows:brainstorm-project`
- `/bmad:bmm:workflows:domain-research`
- `/bmad:bmm:workflows:product-brief`

### Phase 2: Planning
- Create PRD (Product Requirements Document)
- Design architecture
- Break down into epics and stories
- Create UX designs

**Workflows**:
- `/bmad:bmm:workflows:prd`
- `/bmad:bmm:workflows:architecture`
- `/bmad:bmm:workflows:create-epics-and-stories`
- `/bmad:bmm:workflows:create-ux-design`

### Phase 3: Technical Design
- Generate technical specifications
- Plan testing strategy
- Create implementation roadmap

**Workflows**:
- `/bmad:bmm:workflows:epic-tech-context`
- `/bmad:bmm:testarch/test-design`

### Phase 4: Implementation
- Develop individual stories
- Write tests
- Code review
- Integration

**Workflows**:
- `/bmad:bmm:workflows:story-context`
- `/bmad:bmm:workflows:dev-story`
- `/bmad:bmm:workflows:code-review`
- `/bmad:bmm:workflows:story-done`

### Phase 5: Release
- Final testing
- Deployment planning
- Launch

---

## 📝 Working on Stories

### Starting a New Story

1. **Prepare Story Context**
   ```bash
   /bmad:bmm:workflows:story-context
   ```
   - Reads project PRD and Architecture
   - Generates technical context
   - Marks story as READY-FOR-DEV

2. **Develop the Story**
   ```bash
   /bmad:bmm:workflows:dev-story
   ```
   - Follow acceptance criteria in story file
   - Implement in `src/`
   - Write tests in `tests/`
   - Update story status to IN-PROGRESS

3. **Code Review**
   ```bash
   /bmad:bmm:workflows:code-review
   ```
   - Verify implementation quality
   - Check against acceptance criteria
   - Append review notes to story file
   - Mark as REVIEW

4. **Mark Done**
   ```bash
   /bmad:bmm:workflows:story-done
   ```
   - Marks story as DONE
   - Updates project status
   - Advances to next story

---

## 💻 Development Workflow

### Daily Standup
```bash
# Check current status
cat .project/status.yaml

# See current story
cat .project/stories/epic-{N}/story-{N}.{N}.md
```

### Start Development Session
```bash
# Update BMAD Method (always do this first!)
./START.bat

# Check what story you're on
/bmad:bmm:workflows:workflow-status

# Generate context if needed
/bmad:bmm:workflows:story-context

# Start developing
/bmad:bmm:workflows:dev-story
```

### Commit Your Work
```bash
# Stage project files only
git add src/ tests/ docs/ .project/

# Commit with clear message
git commit -m "[STORY 1.1] Feature X implemented"

# Push to origin
git push origin main
```

---

## 🧪 Testing

### Run All Tests
```bash
pytest tests/ -v
```

### Run Tests for Specific Story
```bash
pytest tests/test_story_1_1.py -v
```

### Coverage Report
```bash
pytest tests/ --cov=src --cov-report=html
```

---

## 📊 Project Status

**Current Phase**: Discovery  
**Current Sprint**: 0 (Project Setup)  
**Epics**: 0 (To be defined)  
**Stories**: 0 (To be defined)  
**Last Updated**: 2025-11-13  

For detailed status, see: `.project/status.yaml`

---

## 🔗 Important Files

| File | Purpose |
|------|---------|
| `.project/prd.md` | What you're building |
| `.project/architecture.md` | How you're building it |
| `.project/epics.md` | Work breakdown (epics) |
| `.project/stories/` | Individual work items |
| `.project/status.yaml` | Real-time project status |
| `.project/decisions.md` | Architecture decisions |

---

## 📚 BMAD Method Resources

### Get Help
```bash
# See all available BMAD workflows
/help

# Check workflow status
/bmad:bmm:workflows:workflow-status

# View specific workflow instructions
/bmad:bmm:workflows:prd
```

### Key BMAD Workflows for Alpha

| Workflow | Use When |
|----------|----------|
| `/bmad:bmm:workflows:brainstorm-project` | Starting project / generating ideas |
| `/bmad:bmm:workflows:prd` | Need to create product requirements |
| `/bmad:bmm:workflows:architecture` | Need to design technical approach |
| `/bmad:bmm:workflows:create-epics-and-stories` | Ready to break down work |
| `/bmad:bmm:workflows:story-context` | Starting a new story |
| `/bmad:bmm:workflows:dev-story` | Implementing a story |
| `/bmad:bmm:workflows:code-review` | Need code review |
| `/bmad:bmm:workflows:story-done` | Story is complete |
| `/bmad:bmm:workflows:workflow-status` | Check project progress |

---

## ⚠️ Important Notes

### DO:
✅ Run `./START.bat` before starting work  
✅ Use BMAD workflows for planning and development  
✅ Keep `.project/` files updated  
✅ Commit only `src/`, `tests/`, `docs/`, `.project/` folders  
✅ Follow story acceptance criteria  

### DON'T:
❌ Don't edit `.bmad/`, `src/` (BMAD Method), or `docs/` (BMAD Method)  
❌ Don't skip story context generation  
❌ Don't manually edit sprint-status.yaml (use workflows)  
❌ Don't commit BMAD Method files  
❌ Don't push without running tests  

---

## 🎯 Quick Start Guide

### Day 1: Brainstorm Project
```bash
1. cd C:\knosso\Alpha
2. ./START.bat
3. /bmad:bmm:workflows:brainstorm-project
4. Edit projects/alpha/.project/prd.md with ideas
5. git add projects/alpha/ && git commit -m "[INIT] Project brainstorm"
```

### Day 2-3: Create Plan
```bash
1. /bmad:bmm:workflows:prd
2. /bmad:bmm:workflows:architecture
3. Copy output files to .project/
4. git add projects/alpha/ && git commit -m "[PLAN] PRD and Architecture"
```

### Day 4-5: Break Down Work
```bash
1. /bmad:bmm:workflows:create-epics-and-stories
2. Copy to .project/epics.md and .project/stories/
3. git add projects/alpha/ && git commit -m "[PLAN] Epics and stories"
```

### Week 2+: Implement Stories
```bash
For each story:
  1. /bmad:bmm:workflows:story-context
  2. /bmad:bmm:workflows:dev-story
  3. /bmad:bmm:workflows:code-review
  4. /bmad:bmm:workflows:story-done
  5. git add projects/alpha/ && git commit -m "[STORY 1.1] ..."
```

---

## 📞 Support

### Documentation
- **BMAD Method Guide**: See `C:\knosso\Alpha\docs/`
- **IDE Setup**: See `C:\knosso\Alpha\docs/ide-info/` (pick your IDE)
- **Troubleshooting**: Check `/bmad:bmm:workflows:workflow-status`

### Common Commands
```bash
# Update BMAD Method
./START.bat

# Check project status
/bmad:bmm:workflows:workflow-status

# Get help
/help

# View Claude Code docs
https://docs.claude.com/en/docs/claude-code/
```

---

## 📈 Success Metrics

Track progress using:
- **Phase Completion**: Current phase vs target
- **Story Velocity**: Stories completed per sprint
- **Code Coverage**: Test coverage percentage
- **Quality Gates**: Code review pass rate

All tracked in `.project/status.yaml`

---

**Let's build something great! 🚀**

Start with: `/bmad:bmm:workflows:brainstorm-project`
