# Narrative Canvas Platform - Action Plan

**Date:** 2025-11-13  
**Project:** Alpha - Narrative Writing Platform  
**Phase:** Discovery → Research  

---

## IMMEDIATE NEXT STEPS (BMAD Method)

### This Week

**1. Review Brainstorming Results**
- [ ] Read complete brainstorming document
- [ ] Highlight any unclear points
- [ ] Note additional questions that arise

**2. Begin Research Phase**
- [ ] Convex tutorials and documentation (Actions, Mutations, Scheduler)
- [ ] OpenRouter API documentation and model options
- [ ] Competitive analysis (2-3 tools)
- [ ] Create worldbuilding doc (schema fields, agent prompts)

---

## PROOF OF CONCEPT (Weeks 1-3)

### Priority #1: Convex Setup & Agent Orchestration

**Goal:** Validate that Character Agent + Scene Writer Agent can work together via Convex Actions

**Tasks:**
- [ ] Set up Convex project (npx convex dev)
- [ ] Create Convex tables schema:
  - [ ] `stories` table (id, title, createdAt)
  - [ ] `characters` table (id, storyId, name, traits from worldbuilding doc)
  - [ ] `scenes` table (id, storyId, sceneNumber, outline, prose, status)
- [ ] Design Convex Action for agent pipeline:
  - [ ] Action calls OpenRouter API (Character Agent)
  - [ ] Action calls OpenRouter API (Scene Writer Agent)
  - [ ] Action saves results to scenes table
- [ ] Implement scheduler pattern:
  - [ ] Mutation saves scene outline + schedules Action
  - [ ] Action executes async (no UI blocking)
- [ ] Obtain/design prompt templates from worldbuilding doc:
  - [ ] Character Agent prompt template
  - [ ] Scene Writer Agent prompt template
- [ ] Test pipeline with 3 scene outlines
- [ ] Validate: Consistent character voice across 3 scenes

**Resources Needed:**
- Convex account (free tier)
- OpenRouter API key
- Worldbuilding doc (prompts + schema)
- Node.js installed

**Success Metric:** Action orchestrates both agents, saves results to DB, consistent character voice in 3 generations

---

### Priority #2: Agent Prompt Design & Testing

**Goal:** Create effective prompts that produce consistent character voice

**Tasks:**
- [ ] Reference worldbuilding doc for Character Agent prompt template
  - [ ] If missing: Design prompt for character voice/perspective generation
  - [ ] Define input format (character traits, scene context)
  - [ ] Define output format (emotional state, perspective, voice guidance)
- [ ] Reference worldbuilding doc for Scene Writer Agent prompt template
  - [ ] If missing: Design prompt for prose generation
  - [ ] Define how Character Agent output integrates
  - [ ] Define prose length and style requirements
- [ ] Test Character Agent prompt via OpenRouter:
  - [ ] Use sample character data
  - [ ] Try multiple scenes with same character
  - [ ] Validate output format consistency
- [ ] Test Scene Writer Agent prompt via OpenRouter:
  - [ ] Use Character Agent outputs
  - [ ] Generate prose for 3 different scenes
  - [ ] Validate character voice consistency
- [ ] Iterate on prompts to improve quality
- [ ] Document final prompt templates in worldbuilding doc

**Resources Needed:**
- OpenRouter API account and key
- Worldbuilding doc (or create if missing)
- Sample character/scene data for testing

**Success Metric:** Consistent character voice across 3 separate prose generations

---

### Priority #3: Basic UI with Real-time Visualization

**Goal:** Build React interface with real-time status updates

**Tasks:**
- [ ] Create React app with Vite
- [ ] Install Convex React SDK
- [ ] Set up Convex React hooks (useQuery, useMutation)
- [ ] Build Character Creation Form:
  - [ ] Fields from worldbuilding doc (name, traits, etc.)
  - [ ] Save to Convex `characters` table
  - [ ] Display saved characters list
- [ ] Build Scene Input Form:
  - [ ] Scene outline textarea
  - [ ] "Generate Prose" button
  - [ ] Real-time status display ("Generating..." → "Complete")
- [ ] Wire "Generate" button to Convex mutation:
  - [ ] Mutation saves outline + schedules Action
  - [ ] Returns immediately (no waiting)
- [ ] Display generated prose with real-time updates:
  - [ ] useQuery automatically shows status changes
  - [ ] Prose appears when Action completes
- [ ] Add action buttons:
  - [ ] Accept (mark as final)
  - [ ] Regenerate (trigger mutation again)
- [ ] Build scene list view:
  - [ ] Show all scenes with status
  - [ ] Click to view prose
- [ ] Test complete workflow end-to-end
- [ ] Basic styling (CSS)

**Resources Needed:**
- React knowledge
- Convex React SDK
- Worldbuilding doc (form field definitions)
- Basic HTML/CSS

**Success Metric:** End-to-end workflow with automatic UI updates when agents complete

---

## RESEARCH PHASE (1-2 Days)

### Convex Research

**Questions to Answer:**
- [ ] How do Convex Actions work? (lifecycle, deployment)
- [ ] How does the scheduler pattern work? (mutation → schedules → action)
- [ ] How to structure relational data in Convex? (tables with references)
- [ ] How to call LLM APIs from Actions securely? (environment variables)
- [ ] What are Durable Workflows and when to use them?
- [ ] What are cost implications? (free tier limits)
- [ ] How to handle Action failures/retries?

**Resources:**
- Convex official docs (https://docs.convex.dev)
- Convex Actions tutorial
- Convex Workflows documentation
- Convex free tier pricing page

---

### OpenRouter Research

**Questions to Answer:**
- [ ] How does OpenRouter API work? (unified interface)
- [ ] What models are available? (Claude, GPT-4, Gemini, etc.)
- [ ] How to handle model selection and fallbacks?
- [ ] What are cost differences between models?
- [ ] How to handle rate limits and errors?
- [ ] How to pass system/user prompts correctly?

**Resources:**
- OpenRouter docs (https://openrouter.ai/docs)
- OpenRouter pricing page
- OpenRouter API reference

---

### Competitive Analysis

**Tools to Analyze:**
- [ ] **Scrivener** - Structure and organization approach
- [ ] **Sudowrite** - AI prose generation features
- [ ] **NovelAI** - Story generation capabilities

**Questions:**
- What do they do well?
- What's missing or frustrating?
- How does our approach differ?
- What features can we skip for PoC?

---

## WORLDBUILDING DOCUMENTATION

**Before coding, create/update worldbuilding doc:**

- [ ] Define Convex table schemas:
  - [ ] Stories table fields
  - [ ] Characters table fields (name, traits, backstory, etc.)
  - [ ] Scenes table fields (outline, prose, status, etc.)
- [ ] Agent prompt templates:
  - [ ] Character Agent prompt template (exact wording)
  - [ ] Scene Writer Agent prompt template (exact wording)
  - [ ] Input/output formats for each agent
- [ ] Character form field definitions:
  - [ ] What fields appear in UI
  - [ ] Validation rules
  - [ ] Default values

**Output:** `worldbuilding.md` or similar

---

## PRD/PRODUCT BRIEF

**After research, document:**

- [ ] PoC Scope (formalize what we discussed)
- [ ] Technical architecture diagram (Convex tables + Actions flow)
- [ ] User workflow (step-by-step with real-time updates)
- [ ] Success criteria
- [ ] Known risks and mitigation

**Output:** `narrative-canvas-platform-prd.md`

---

## ARCHITECTURE DESIGN

**Before coding, document:**

- [ ] Convex schema (exact table structures with references)
- [ ] Convex Actions architecture:
  - [ ] Action signatures (parameters, return types)
  - [ ] Scheduler pattern flow diagram
  - [ ] Error handling approach
  - [ ] OpenRouter integration details
- [ ] Agent prompt templates (reference worldbuilding doc)
- [ ] Data flow diagrams:
  - [ ] Mutation → Scheduler → Action → OpenRouter → DB
  - [ ] useQuery reactivity flow
- [ ] API contract between frontend/backend (Convex functions)

**Output:** `narrative-canvas-platform-architecture.md`

---

## DEFERRED TO LATER PHASES

### Phase 2: Canvas Visualization
- React Flow or Cytoscape integration
- Tree structure display
- Interactive node manipulation

### Phase 3: Memory System
- Character memory (traits, knowledge, arc)
- Plot memory (timeline, events)
- Style memory (voice, tone)

### Phase 4: Knowledge Timeline
- AI-detected knowledge extraction
- Timeline validation
- Character knowledge state tracking

### Phase 5: Additional Agents
- Consistency Checker Agent
- Scene Outliner Agent
- Director orchestration

### Phase 6: Template Framework
- 24-chapter template
- Hero's Journey template
- Custom template support
- Template plugin system

### Phase 7: Optimization
- TOON encoding
- Token usage optimization
- Performance tuning
- Convex Action optimization

---

## SUCCESS METRICS

### PoC Complete When:

✅ Can create 1 character with traits  
✅ Can input 3 scene outlines  
✅ Can generate prose for each scene  
✅ Character voice is consistent across scenes  
✅ Can save/load story from Convex  
✅ Real-time UI updates show generation status  
✅ Can regenerate scenes if unsatisfied  

### PoC Validates:

✅ Convex Actions work for agent orchestration  
✅ Scheduler pattern decouples UI from long-running LLM calls  
✅ OpenRouter integration is functional  
✅ Real-time reactivity provides good UX  
✅ Agent pipeline executes correctly  
✅ Core generation loop feels good  
✅ Character consistency is achievable  

---

## RISK MITIGATION

### High-Risk Areas:

**1. Agent Orchestration Complexity**
- Mitigation: Start with simplest possible prompts
- Mitigation: Test prompts via OpenRouter before integrating
- Mitigation: Use Convex scheduler pattern (simpler than custom orchestration)
- Mitigation: Leverage Convex Workflows for retry logic

**2. OpenRouter API Reliability**
- Mitigation: Implement error handling in Actions
- Mitigation: Use Convex retry mechanisms
- Mitigation: Consider fallback models (Claude → GPT-4o)
- Mitigation: Monitor API status and rate limits

**3. Character Consistency**
- Mitigation: Explicit character traits in every prompt
- Mitigation: Test prompts across multiple generations
- Mitigation: Iterate on prompt design based on results
- Mitigation: Manual review initially, automated checker later

**4. Dev Skill Gaps (Convex + React)**
- Mitigation: Follow Convex tutorials step-by-step
- Mitigation: Start with simple Convex + React example
- Mitigation: Reference Convex documentation frequently
- Mitigation: Test each component independently before integration

**5. Worldbuilding Doc Dependency**
- Mitigation: Create minimal worldbuilding doc early in process
- Mitigation: Start with basic schema, iterate as needed
- Mitigation: Prompt design can happen in parallel with Convex setup
- Mitigation: Use placeholder data for initial testing

---

## TIMELINE OVERVIEW

**Note:** Timeline is flexible - no fixed deadline. Focus on learning and quality.

```
Current:
└─ Brainstorming complete ✅
└─ Action plan updated with Convex architecture ✅

Research Phase (1-2 days):
├─ Convex documentation (Actions, Mutations, Scheduler)
├─ OpenRouter API documentation
├─ Competitive analysis (Scrivener, Sudowrite, NovelAI)
└─ Create minimal worldbuilding doc

Priority #1: Convex Setup & Agent Orchestration
├─ Set up Convex project
├─ Create table schemas
├─ Design Action for agent pipeline
├─ Implement scheduler pattern
├─ Test with sample data
└─ Success: Action orchestrates agents, saves to DB

Priority #2: Agent Prompt Design & Testing
├─ Reference/create prompts from worldbuilding doc
├─ Test Character Agent via OpenRouter
├─ Test Scene Writer Agent via OpenRouter
├─ Iterate for consistency
└─ Success: Consistent voice across 3 generations

Priority #3: Basic UI with Real-time Visualization
├─ Create React + Convex app
├─ Build character form
├─ Build scene form with status display
├─ Wire mutations + queries
├─ Test end-to-end workflow
└─ Success: Real-time updates work

PoC COMPLETE 🎉
```

---

## CONTACT/NOTES

**When Stuck:**
- Review brainstorming results
- Check Convex documentation
- Search OpenRouter API docs
- Test components independently
- Try simplified version first

**When PoC Complete:**
- Celebrate! 🎉
- Document lessons learned
- Update worldbuilding doc with final prompts/schema
- Decide: Build Phase 2 (Canvas visualization) OR refine PoC
- Update BMAD workflow status

---

**Remember:** PoC goal is to VALIDATE, not to be perfect. Ship fast, learn, iterate.

