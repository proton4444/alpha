# Brainstorming Session Results

**Session Date:** 2025-11-13
**Facilitator:** Mary (Business Analyst)
**Participant:** knosso

## Executive Summary

**Topic:** Narrative Canvas Platform - AI-Assisted Story Writing Tool

**Session Goals:** 
- Define hierarchical story structure (24-chapter template integration)
- Clarify multi-agent orchestration (Director-led system)
- Solve technical architecture (frontend-only + Supabase, no backend complexity)
- Design scene-level workflow (outlining chapters → scenes with purpose/conflict/stakes)
- Differentiate from horizontal, chaotic writing tools

**Techniques Used:** First Principles Thinking, Morphological Analysis, Reversal Inversion, Six Thinking Hats

**Total Ideas Generated:** 50+

### Key Themes Identified:

1. **Hierarchical over Horizontal** - Tree structure (Story → Chapters → Scenes) vs. flat chaos
2. **Template-Agnostic Framework** - Engine separate from content structure (24-chapter is one option)
3. **Character Cognitive Intelligence** - Knowledge timeline prevents premature reveals
4. **Split-Panel Context** - Everything visible, no tab switching
5. **AI-Guided Workflow** - Always know next step
6. **Convex for Agent Orchestration** - Actions + Durable Workflows perfect for multi-agent pipelines
7. **Proof of Concept First** - Validate core before complexity

## Technique Sessions

### Phase 1: First Principles Thinking (Divergent Exploration)

**Fundamental Truths Identified:**

**On Writer Methods:**
- ✓ Writers have individual methods - no single "right way"
- ✓ Platform should support multiple methodologies
- ✓ Structure is flexible - same framework, different approaches

**On Story Coherence:**
- ✓ Consistency is the foundation of coherence
- ✓ Requires memory system (characters remember events, maintain traits)
- ✓ Consistency checkers needed (later stage, not MVP)

**On AI Capabilities:**
- ✓ AI transforms simple creative concepts → full narrative (when well-guided)
- ✓ AI can't create from nothing (yet)
- ✓ Human-in-loop is essential for creative direction

**Critical Future Topic Identified:**
- 🧠 **Character Cognitive Intelligence** - Characters need memory, personality consistency, decision-making logic
- Must be designed before implementing memory system

---

**Rebuilding From First Principles:**

**Minimum Requirements (Bare Essentials):**
1. **Strong Subject** - Core story concept/premise
2. Everything else builds from this foundation

**Core Creation Loop:**
```
1. Writer inputs creative concept
2. AI uses tree chart + templates → generates multiple prose variations
3. AI performs checks (consistency, coherence)
4. Writer reviews options and chooses preferred version
5. Writer accepts OR refines
6. Repeat cycle
```

**Key Insight:** AI generates OPTIONS (not single output) - writer has choice

**Template System Architecture:**

**Fixed (Platform Core):**
- Tree/hierarchical structure (Story → Chapters → Scenes)
- Node relationships and connections
- Memory system for consistency

**Flexible (Template-Specific):**
- 24-chapter structure is ONE template option
- Different templates can plug into same system
- Substructure adapts to template requirements

**Design Principle:** 
- **Template = Content structure** (24 chapters, Hero's Journey, 3-Act, Save the Cat, etc.)
- **Platform = System that HOLDS any template**
- Separation of concerns: engine vs. content framework

---

**Refined Core Loop (Token-Optimized):**

```
1. Writer inputs creative concept
2. AI generates 1 prose variation (using tree context + template)
3. AI performs comprehensive checks:
   - Character consistency (traits, knowledge, relationships)
   - Plot logic (cause/effect, timeline coherence)
   - Tone/voice matching (maintains narrative style)
4. Writer reviews single output
5. Accept OR Retry (regenerate) OR Refine (edit + regenerate)
6. Repeat
```

**Token Cost Strategy:**
- Single generation per cycle (not multiple options)
- Retry button available if unsatisfied (costs another generation)
- Balance: Cost control vs. user choice

**AI Check System (Comprehensive):**
✓ Character consistency monitoring
✓ Plot logic validation  
✓ Tone/voice coherence
- All three run automatically before presenting to writer
- Flags issues for writer review

---

### Phase 2: Morphological Analysis (Systematic Design Exploration)

**Parameter 1: Director/Orchestrator Agent Responsibilities**

**Selected:** A + B

**Director handles:**
- ✓ **Story-level coordination** - Maintains overall narrative arc, themes, pacing
- ✓ **Agent task assignment** - Decides which specialized agent handles each task

**What Director does NOT handle:**
- ✗ Consistency enforcement (delegated to specialized checker agents)
- ✗ Context management (memory system handles this)
- ✗ Quality control (writer evaluates quality)

**Design Implication:**
- Director is a **strategic coordinator**, not a micromanager
- Think: Film director (vision + delegation) vs. editor (quality control)
- Keeps architecture clean: Director orchestrates, specialists execute

---

**Parameter 2: Specialized Agent Types (MVP)**

**Selected:** D, A, B, C (Priority order)

**1. Scene Outliner Agent** (First)
- Helps writer structure scene details
- Input: Chapter purpose + writer's rough ideas
- Output: Structured scene outline (goal, conflict, stakes, characters, setting, structure)

**2. Scene Writer Agent** (Second)
- Generates prose for specific scene
- Input: Scene outline from Outliner Agent
- Output: Narrative prose

**3. Character Agent** (One per character)
- Maintains character voice, traits, memory
- Generates character-specific dialogue/actions
- Input: Scene context + character history
- Output: Character-specific content

**4. Consistency Checker Agent** (Final step)
- Runs 3 checks: character consistency, plot logic, tone/voice
- Input: Generated content + story memory
- Output: Flagged issues or approval

**Agent Flow:**
```
Writer rough idea 
  → Scene Outliner Agent (structures it)
  → Scene Writer Agent (generates prose with Character Agents)
  → Consistency Checker Agent (validates)
  → Present to writer
```

**NOT in MVP:**
- Summary Agent (later)
- Prose Refiner Agent (writer edits manually for now)

---

**Parameter 3: Memory System Design (MVP)**

**Essential Memory Types:** D, A, B (Priority order)

**D. Style Memory** (Critical for consistency)
- Narrative voice/tone
- POV character preferences  
- Writing style patterns
- Ensures prose feels unified across scenes

**A. Character Memory** (Per character node)
- Traits, personality, backstory
- Knowledge state (what they know/don't know per scene)
- Relationships with other characters
- Character arc progression tracking

**B. Plot Memory** (Global story level)
- Timeline of events (what happened when)
- Cause-effect relationships between scenes
- Unresolved conflicts/story threads
- Story arc checkpoints

**NOT Essential for MVP:**
- World Memory (writer maintains this manually for now)
- Session Memory (browser state handles this)

**Memory Storage Architecture:**

```
Story (root)
  ├─ Style Memory (global)
  ├─ Plot Memory (global timeline)
  └─ Characters/
      ├─ Character A
      │   └─ Character Memory (node-specific)
      ├─ Character B
      │   └─ Character Memory (node-specific)
      └─ ...
```

**Memory Access Pattern:**
- **Character Agents** → Read own character memory + plot memory
- **Scene Writer Agent** → Read all relevant character memories + plot memory + style memory
- **Consistency Checker** → Compare generated content against all three memory types

---

**Parameter 4: Technical Stack Decision**

**Evaluated Options:**
- Supabase (PostgreSQL + Edge Functions)
- Firebase (Firestore + Cloud Functions)
- Convex (Reactive DB + Server Functions)

**SELECTED: Convex** 🚀

**Why Convex Wins:**

**1. Actions + Durable Workflows = Built for Agent Orchestration**
- **Actions** designed specifically for calling external APIs (OpenRouter for LLMs)
- **Durable Workflows** with built-in retry logic, idempotency, and multi-step orchestration
- No cold starts (functions stay warm)
- Better reliability for chaining multiple agent calls

**2. Scheduler Pattern for Async Agent Execution**
```typescript
// User clicks "Generate" → Mutation saves intent → Schedules Action
mutation: Save user intent to DB
  ↓
scheduler: runAfter(0, generateScene)
  ↓
action: Call Character Agent → Call Scene Writer → Save results
```
- Decouples user interaction from long-running LLM calls
- Automatic retry on failures
- Better UX (immediate response to user)

**3. Real-time Reactivity by Default**
- All queries are reactive → UI updates automatically when agents complete
- No need to poll for generation status
- Perfect for showing "AI generating..." → "Complete" transitions

**4. TypeScript End-to-End**
- Backend functions are native TypeScript (not JavaScript)
- Type-safe database queries with Convex schemas
- Better DX, fewer runtime errors

**5. Relational Data Model with References**
```typescript
// Convex uses tables with references (like SQL)
stories table: { _id, title, createdAt }
characters table: { _id, storyId (ref), name, traits }
scenes table: { _id, storyId (ref), chapterId (ref), outline, prose }
```
- Clear separation of concerns
- Efficient queries with indexes
- Memory system stored as separate tables (not deeply nested)

**Final Tech Stack:**

```
Frontend:
  ├─ React + TypeScript
  ├─ Canvas: React Flow or Cytoscape.js
  ├─ Convex React hooks (useQuery, useMutation)
  └─ Hosting: Vercel (free tier)

Backend:
  ├─ Convex Actions (agent orchestration)
  ├─ Convex Mutations (data writes)
  ├─ Convex Queries (data reads)
  └─ LLM API calls via OpenRouter (unified API for all models)

Database:
  ├─ Convex (relational tables with references)
  ├─ Tables: stories, chapters, scenes, characters, memory
  └─ Real-time sync automatic

Auth:
  └─ Convex Auth (built-in, future: multi-user support)
```

**Data Model: Relational with References**
```typescript
// Example: Fetching scene with character data
const scene = await ctx.db.get(sceneId);
const character = await ctx.db.get(scene.characterId);
// References maintained via IDs, queries use indexes
```

**LLM Integration: OpenRouter**
- Unified API for Claude, GPT-4, Gemini, and other models
- Single API key, multiple providers
- Cost optimization (choose model per task)
- Fallback strategies (try Claude, fallback to GPT-4o)

---

### Phase 3: Reversal Inversion (Creative Problem Solving)

**Exercise: "How to Make the WORST Writing Tool"**

**Anti-Patterns Identified:**

❌ **No clear guidance**
- Writer has no idea what to do next
- No prompts, no suggestions, just blank canvas
- Paralysis and confusion

❌ **Invisible structure**
- Can't see story outline or hierarchy
- No visual representation of chapters/scenes
- Writer lost in their own story

❌ **Tab hell navigation**
- Need to switch tabs to see different parts
- Check character info → switch tab
- Check scene outline → switch tab
- Review prose → switch tab
- Context constantly lost

❌ **Broken character knowledge (cognitive intelligence failure)**
- Characters know things they shouldn't yet
- "I knew you'd betray me!" (but betrayal is 5 chapters later)
- No tracking of what character knows at each point in timeline
- Immersion-breaking inconsistencies

---

**REVERSALS → Design Principles:**

✅ **Clear Next Steps**
- System ALWAYS suggests what to do next
- "You've outlined Chapter 1, Scene 1. Ready to generate prose?" 
- "Scene complete. Add another scene or move to Chapter 2?"
- Guided workflow, never lost

✅ **Visible Structure Always**
- Canvas shows ENTIRE story hierarchy at once
- Tree view: Story → Chapters → Scenes (expandable)
- Current location highlighted
- Can see "where you are" in the story at all times

✅ **Single-Screen Context**
- **Split-panel design is CRITICAL**
- Left: Canvas (structure + current scene)
- Right: Prose output + scene details
- NO tab switching required
- Everything visible simultaneously

✅ **Character Knowledge Tracking (Cognitive Intelligence)**
- Character memory includes **knowledge timeline**
- Track: "Sarah learns about betrayal in Scene 3.2"
- Consistency Checker validates: "Does Sarah know this yet?"
- Prevents premature reveals
- Each character has "knowledge state" per scene

**Key Differentiation:**
- **Other tools:** Horizontal, chaotic, tab-based
- **This tool:** Vertical hierarchy, visual, single-screen, context-aware

---

**Character Knowledge Timeline System:**

**Implementation: AI-Detected (Automatic)**

**How it works:**
1. Scene Writer Agent generates prose
2. Consistency Checker reads the prose before presenting to writer
3. **Knowledge Extraction:** AI detects knowledge events:
   - "Sarah discovered the letter" → Sarah.knowledge["letter"] = Scene 3.2
   - "Marcus revealed his past" → Sarah.knowledge["marcus_past"] = Scene 3.2
   - "Sarah overheard the conversation" → Sarah.knowledge["conspiracy"] = Scene 3.2
4. System updates character memory automatically
5. Future scenes: Checker validates character knowledge against timeline

**Example:**
```
Scene 3.2 (generated prose): "Sarah gasped as she read the letter. Marcus had lied."
  → Checker extracts: Sarah now knows about Marcus's deception
  → Updates: Sarah.knowledge_timeline["marcus_deception"] = "Scene 3.2"

Scene 2.1 (earlier scene, generated later): "Sarah trusted Marcus completely..."
  → Checker validates: Does Sarah know about deception yet? NO (Scene 2.1 < 3.2)
  → ✅ Approved

Scene 4.1 (later scene): "Sarah confronted Marcus about his lies..."
  → Checker validates: Does Sarah know about deception? YES (Scene 4.1 > 3.2)  
  → ✅ Approved

Scene 2.5 (earlier scene): "Sarah suspected Marcus was hiding something about his past..."
  → Checker validates: Does Sarah know specifics yet? NO (Scene 2.5 < 3.2)
  → ✅ Approved (suspicion ≠ knowledge)
```

**Advantages:**
- ✅ Zero manual input required
- ✅ Automatically maintains consistency
- ✅ Works even when writing out of order
- ✅ Catches knowledge leaks ("how does she know that yet?")

**For MVP:**
- Basic knowledge extraction (major plot reveals, character discoveries)
- More sophisticated extraction in later versions

---

### Phase 4: Six Thinking Hats (Balanced Analysis)

**🤍 White Hat: Facts & Constraints**

**Critical Constraints Identified:**

**1. Dev Skills Gap:**
- Need to learn: Firebase, Cloud Functions, React Flow/Cytoscape
- Need to learn: Agent orchestration patterns
- Risk: Learning curve may slow MVP development

**2. Library Dependencies:**
- Canvas visualization: React Flow or Cytoscape.js (both complex)
- LLM integration: OpenAI SDK or Anthropic SDK
- Firebase SDK
- TOON encoding library (if exists, or build custom)

**3. Framework Building Challenge:**
- This is NOT a simple app - it's a FRAMEWORK
- Must be extensible (template system)
- Testing agent interactions is complex
- Debugging multi-agent flows is hard

---

**❤️ Red Hat: Gut Feelings**

**What excites you:**
- 🎯 Agent interaction orchestration
- 🎯 Building the framework foundation
- 🎯 Testing everything works together

**What concerns you:**
- ⚠️ Personal dev skill gaps
- ⚠️ Complex library integrations
- ⚠️ Framework complexity vs. MVP timeline

**Emotional insight:** You're excited by the HARD parts (agents, framework) but concerned about foundations (libraries, skills).

---

**💛 Yellow Hat: Benefits & Opportunities**

**Benefits Despite Challenges:**
- ✅ Learning valuable, marketable skills (Firebase, agent orchestration)
- ✅ Personal tool - full control, no external users to satisfy
- ✅ Framework thinking - reusable architecture for future projects
- ✅ Innovative features - knowledge timeline is unique competitive advantage
- ✅ Solves real problem - existing tools ARE chaotic
- ✅ No timeline pressure - can build properly

---

**🖤 Black Hat: Risks & Critical Challenges**

**Realistic Risk Assessment:**

⚠️ **MVP Scope Creep: VERY HIGH**
- Building framework, not simple app
- Agent orchestration = complex debugging
- Memory system = complex state management
- Knowledge extraction = AI-dependent (may fail)
- Canvas library = steep learning curve

⚠️ **Timeline Reality: 6+ months** (solo dev with learning)
- Firebase learning: 2-3 weeks
- React Flow/Canvas: 2-3 weeks
- Agent orchestration: 4-6 weeks
- Memory system: 3-4 weeks
- Integration + debugging: 4+ weeks

⚠️ **Technical Risks:**
- Agent debugging complexity (multi-step failures)
- OpenRouter API reliability (dependent on provider uptime)
- TOON encoding ROI unclear
- Knowledge extraction accuracy unknown

**DECISION POINT:**

**User has NO timeline constraint** - flexible approach possible

**Strategy: Proof of Concept First, Then Scale**

Build minimal PoC to validate core concepts, then expand incrementally.

---

**🟢 Green Hat: Creative Alternatives - PoC Design**

**PROOF OF CONCEPT: "Single Story, 3 Scenes, 1 Character"**

**Goal:** Validate agent orchestration + Convex + core loop WITHOUT complexity

### **PoC Scope:**

**✅ Structure (Minimal)**
- 1 Story
- 1 Chapter  
- 3 Scenes (simple list, not tree)
- 1 Character

**✅ Agents (Minimal)**
- Scene Writer Agent (generates prose from outline)
- Character Agent (maintains character voice)
- NO Scene Outliner (writer types manually)
- NO Consistency Checker (manual review)
- NO Director (direct agent calls via scheduler)

**✅ Memory (EXCLUDED from PoC)**
- ❌ NO memory system
- ❌ NO knowledge timeline
- ❌ NO character/plot/style memory
- Character traits: Simple object only
- **Memory deferred to Phase 2**

**✅ UI (Basic Visualization from Start)**
- React interface with **basic status visualization**
- Shows: Character info, Scene list, Generation status ("Generating...", "Complete")
- Input: Scene outline text box
- Button: "Generate Prose"
- Output: Display generated prose with real-time updates
- **Real-time status updates** (Convex reactivity shows agent progress)

**✅ Tech Stack (Minimal)**
- Frontend: React + Convex React hooks (useQuery, useMutation)
- Backend: Convex Actions (agent orchestration via scheduler pattern)
- Database: Convex tables (stories, characters, scenes)
- LLM: OpenRouter API (unified access to Claude, GPT-4, etc.)
- NO TOON encoding (plain JSON)
- NO template framework

**✅ Schema & Prompts**
- Schema details: Defined in **worldbuilding phase** document
- Agent prompts: Provided in **worldbuilding phase** or prompted at runtime
- If missing: System will prompt user to provide during development

### **PoC Workflow:**

```
1. Writer creates character:
   Name: "Sarah"
   Traits: "brave warrior, haunted past"
   (Fields defined in worldbuilding doc)
   
2. Writer writes Scene 1 outline (text box):
   "Sarah enters market, sees her enemy Marcus"
   
3. Click "Generate Prose" button

4. Convex Mutation executes:
   - Saves scene outline to DB
   - Updates status: "generating"
   - Schedules Action (runAfter(0, generateScene))
   - Returns immediately (no waiting for LLM)
   
5. Convex Action executes (async):
   - Loads character data from DB
   - Calls OpenRouter API (Character Agent prompt)
   - Calls OpenRouter API (Scene Writer Agent prompt)
   - Saves generated prose + status: "complete"
   
6. UI updates automatically (Convex reactivity):
   - Shows "Generating..." → "Complete"
   - Displays generated prose

7. Writer can:
   - Accept (mark as final)
   - Regenerate (triggers same flow)
   - Edit outline and regenerate

8. Repeat for Scene 2, 3
```

### **What PoC Validates:**

✅ Convex Actions work for agent orchestration  
✅ Scheduler pattern decouples UI from long-running LLM calls  
✅ Agent pipeline executes correctly (Character → Scene Writer)  
✅ Character voice consistency achievable  
✅ OpenRouter integration functional  
✅ Real-time UI updates work automatically  
✅ Core generation loop feels good  
✅ Convex data storage and retrieval works  

### **What PoC Defers:**

🔜 **Phase 2:** Canvas visualization + tree structure  
🔜 **Phase 3:** Memory system (character/plot/style)  
🔜 **Phase 4:** Knowledge timeline + Consistency Checker  
🔜 **Phase 5:** Scene Outliner Agent + Director orchestration  
🔜 **Phase 6:** Template framework (24-chapter, etc.)  
🔜 **Phase 7:** TOON optimization  

**Key Advantage:** Each phase builds on proven foundation from previous phase.

---

**🔵 Blue Hat: Process & Action Planning**

### **TOP 3 IMMEDIATE PRIORITIES (PoC - Weeks 1-3)**

**#1 Priority: Convex Setup & Agent Orchestration**
- Set up Convex project + create tables (stories, characters, scenes)
- Design Convex Action for Character Agent + Scene Writer Agent pipeline
- Implement scheduler pattern (mutation → schedules action)
- Integrate OpenRouter API for LLM calls
- **Success:** Action successfully orchestrates both agents and saves results

**#2 Priority: Agent Prompt Design**
- Obtain or design Character Agent prompt template (from worldbuilding doc)
- Obtain or design Scene Writer Agent prompt template (from worldbuilding doc)
- Test prompts via OpenRouter API with sample data
- Validate character voice consistency across multiple generations
- **Success:** Consistent character voice in 3 test generations

**#3 Priority: Basic UI with Real-time Visualization**
- React app with Convex React hooks (useQuery, useMutation)
- Character creation form (fields from worldbuilding doc)
- Scene input form with "Generate Prose" button
- Real-time status display ("Generating..." → "Complete")
- Display generated prose with Accept/Regenerate buttons
- **Success:** End-to-end workflow with automatic UI updates

### **DEFERRED TO LATER PHASES**

Phase 2: Canvas visualization (React Flow)
Phase 3: Memory system (character/plot/style)
Phase 4: Knowledge timeline + Consistency Checker
Phase 5: Scene Outliner + Director
Phase 6: Template framework (24-chapter, etc.)
Phase 7: TOON optimization

{{hats_continued}}

## Idea Categorization

### Immediate Opportunities

_Ideas ready to implement now (PoC Phase)_

1. **Agent Orchestration** - Character Agent + Scene Writer Agent pipeline
2. **Firebase Setup** - Firestore + Cloud Functions foundation
3. **Form-Based UI** - Simple React forms for character/scene input
4. **Core Generation Loop** - Outline → Generate → Review → Accept/Retry
5. **Hardcoded 3-Scene Structure** - Validate workflow before adding complexity

### Future Innovations

_Ideas requiring development/research (Phase 2+)_

1. **Canvas Visualization** - React Flow or Cytoscape for tree structure display
2. **Memory System** - Character/Plot/Style memory with persistence
3. **Knowledge Timeline** - AI-detected character knowledge tracking
4. **Consistency Checker Agent** - Automated validation of character/plot/tone
5. **Scene Outliner Agent** - Helps structure scenes with purpose/conflict/stakes
6. **Director Orchestration** - Strategic coordinator managing all agents
7. **Template Framework** - Pluggable templates (24-chapter, Hero's Journey, etc.)
8. **TOON Encoding** - Token optimization for LLM context
9. **Real-time Canvas Sync** - Live updates as prose generates
10. **Collaborative Features** - Multi-user story development

### Moonshots

_Ambitious, transformative concepts (Long-term vision)_

1. **AI Character Actors** - Characters that autonomously interact with each other
2. **Multi-Timeline Branching** - "What if" scenarios create alternate story branches
3. **Cross-Story Universe** - Characters/worlds shared across multiple stories
4. **Emotional Arc Visualization** - Graph of character emotional states across story
5. **Auto-Adaptation** - Story automatically adapts to different formats (screenplay, novel, game)
6. **Narrative AI Co-Author** - AI proactively suggests plot developments based on themes
7. **Reader-Responsive Stories** - Adapt narrative based on reader feedback/choices

### Insights and Learnings

_Key realizations from the session_

**Major Breakthroughs:**

1. **Template ≠ Platform** - Separating story structure (template) from platform (engine) unlocks scalability
2. **Knowledge Timeline is Unique** - No existing tool tracks character knowledge state across scenes
3. **Convex for Multi-Agent Systems** - Actions + Durable Workflows + Scheduler pattern built for agent orchestration
4. **PoC Over Perfection** - Starting with 3 scenes validates core faster than building full framework
5. **Single-Screen UX is Critical** - Split-panel (canvas + prose) prevents context loss from tab switching
6. **Agent Orchestration is the Hard Part** - Not UI, not database - getting agents to work together consistently
7. **Personal Project Advantage** - No timeline pressure allows proper foundation building
8. **OpenRouter Flexibility** - Unified API enables model switching and cost optimization

**Anti-Patterns Identified:**

- ❌ Horizontal, chaotic layout (existing tools)
- ❌ Tab-based navigation (loses context)
- ❌ No guidance on next steps (writer paralysis)
- ❌ Characters knowing things they shouldn't yet (breaks immersion)

**Design Principles Established:**

- ✅ Always show full story structure
- ✅ Always suggest next action
- ✅ Everything on one screen
- ✅ Character knowledge must be timeline-aware

## Action Planning

### Top 3 Priority Ideas (PoC Phase)

#### #1 Priority: Convex Setup & Agent Orchestration

- **Rationale:** Core innovation of platform; everything builds on this; Convex scheduler pattern perfect for async agent pipelines
- **Next steps:** 
  1. Set up Convex project + initialize tables (stories, characters, scenes)
  2. Design Convex Action for agent orchestration (Character → Scene Writer)
  3. Implement scheduler pattern (mutation schedules action)
  4. Integrate OpenRouter API for LLM calls
  5. Test pipeline: mutation → action → OpenRouter → save results
- **Resources needed:** Convex account, OpenRouter API key, Convex documentation
- **Success metric:** Action successfully orchestrates both agents and saves results to DB

#### #2 Priority: Agent Prompt Design

- **Rationale:** Prompts determine output quality; character voice consistency depends on prompt design
- **Next steps:**
  1. Reference worldbuilding doc for Character Agent prompt template (or design if missing)
  2. Reference worldbuilding doc for Scene Writer Agent prompt template (or design if missing)
  3. Test prompts via OpenRouter API with sample character/scene data
  4. Iterate on prompts to improve consistency
  5. Validate character voice across 3 test generations
- **Resources needed:** Worldbuilding doc (schema + prompts), OpenRouter API access
- **Success metric:** Consistent character voice in 3 separate generations

#### #3 Priority: Basic UI with Real-time Visualization

- **Rationale:** Validates end-to-end workflow; Convex real-time updates provide instant feedback; enables iterative testing
- **Next steps:**
  1. Create React app with Convex React hooks (useQuery, useMutation)
  2. Build character creation form (fields from worldbuilding doc)
  3. Build scene input form with "Generate Prose" button
  4. Display real-time status ("Generating..." → "Complete")
  5. Show generated prose with Accept/Regenerate buttons
- **Resources needed:** React, Convex React SDK, worldbuilding doc (form field definitions)
- **Success metric:** End-to-end workflow with automatic UI updates when agents complete

## Reflection and Follow-up

### What Worked Well

✅ **First Principles Thinking** - Stripped away assumptions, rebuilt from fundamentals (strong subject, template vs. platform)  
✅ **Morphological Analysis** - Systematically mapped parameters (Director role, agent types, memory system, tech stack)  
✅ **Reversal Inversion** - Identified anti-patterns by designing "worst tool," then reversing them  
✅ **Six Thinking Hats** - Balanced analysis (facts, feelings, benefits, risks, alternatives, process)  
✅ **Progressive flow** - Started broad, went deep, converged to concrete PoC  
✅ **Honest constraint discussion** - Acknowledged dev skills, complexity, timeline realities  

### Areas for Further Exploration

1. **Convex Durable Workflows** - Advanced patterns for multi-step agent orchestration with retries
2. **OpenRouter Best Practices** - Model selection strategies, cost optimization, fallback patterns
3. **Competitive Analysis** - Deep dive into Scrivener, Sudowrite, NovelAI feature sets
4. **React Flow vs. Cytoscape** - Which canvas library fits better (Phase 2)
5. **TOON Encoding** - Research if this actually saves significant tokens
6. **Character Cognitive Models** - Psychology research on how characters "think"
7. **Worldbuilding Documentation** - Define schema structure, agent prompts, character fields

### Recommended Follow-up Techniques

For next brainstorming sessions:

- **SCAMPER** - When iterating on PoC features (Substitute, Combine, Adapt, Modify, etc.)
- **Mind Mapping** - For visualizing agent interaction flows
- **Assumption Reversal** - When stuck on technical challenges
- **Question Storming** - Before building memory system (Phase 3)

### Questions That Emerged

1. How complex should agent prompts be? Simple vs. detailed instructions?
2. Should Character Agent generate full dialogue or just voice guidance?
3. How to handle LLM API errors gracefully in production?
4. What's the right balance of AI generation vs. manual editing?
5. Should scenes be editable after generation, or locked to maintain consistency?
6. How to migrate from PoC (3 scenes) to full system without rewriting?
7. Is TOON encoding worth the complexity, or just use plain JSON?
8. When should Consistency Checker run - before or after showing to writer?

### Next Session Planning

- **Suggested topics:** 
  - Research Phase findings (competitive analysis, Convex capabilities)
  - PRD/Product Brief (defining PoC scope formally)
  - Architecture design session (Convex schema, Action structure, OpenRouter integration)
  - Worldbuilding documentation (schema fields, agent prompts)
  
- **Recommended timeframe:** 1-2 weeks (after initial research)

- **Preparation needed:** 
  - Complete research on Convex tutorials (Actions, Mutations, Scheduler)
  - Explore OpenRouter API documentation and model options
  - Try simple Convex + React example app
  - Analyze 2-3 competitor tools (Scrivener, Sudowrite)
  - Draft worldbuilding doc (character schema, scene schema, agent prompt templates)

---

_Session facilitated using the BMAD CIS brainstorming framework_
