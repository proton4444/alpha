# Narrative Canvas Platform - Product Requirements Document

**Author:** knosso  
**Date:** 2025-11-14  
**Version:** 1.0

---

## Executive Summary

**Narrative Canvas Platform** is an AI-powered story generation engine designed to solve the fundamental problem storytellers face when writing with AI: **losing track of their narrative**.

Current AI writing tools use chat interfaces that are inherently linear and chaotic. As stories grow in complexity—with multiple characters, interwoven plotlines, shifting timelines, and evolving character knowledge—writers lose their grip on the narrative. They can't see the forest for the trees.

Narrative Canvas transforms this experience through **visual organization**. The platform presents the entire story structure as an interactive tree (Story → Chapters → Scenes) alongside a collaborative writing workspace. Writers can see their whole story at a glance, navigate instantly to any scene, and work with AI to generate prose without ever losing their place or breaking their flow.

This isn't just a writing tool—it's a **story generation engine** where writer and AI co-create:
- **Writer provides structure and direction** (outlines chapters, defines scenes, sets story beats)
- **Engine generates narrative prose** (writes scenes with consistent character voices and plot coherence)
- **Iterative refinement** (accept, regenerate, or edit until it's right)

The platform supports stories up to 24 chapters and 100+ scenes (full novel-length), works across all genres, and includes intelligent features like automatic character knowledge tracking to prevent narrative inconsistencies.

### What Makes This Special

**The magic moment:** You can see your entire story structure and never lose track of what's happening.

Traditional AI writing tools trap you in chat history—scroll up to remember what happened in chapter 3, scroll down to continue writing chapter 10, lose context, repeat. It's maddening.

Narrative Canvas gives you **spatial awareness** of your story:
- **Tree visualization** shows every chapter and scene at once
- **Split-screen workspace** keeps structure visible while you write
- **Optional timeline view** (like video editing software) shows chronological flow
- **Automatic character knowledge tracking** prevents premature reveals and maintains consistency
- **Multi-agent orchestration** ensures character voices stay authentic across 100+ scenes

The breakthrough is this: **you never lose your place, and neither does the AI**. The engine knows where you are in the story, what's happened before, what characters know, and what's coming next. Every generated scene fits seamlessly into your narrative.

For storytellers frustrated by AI chat interfaces, this is transformative. Write freely, maintain coherence, see the whole picture.

---

## Project Classification

**Technical Type:** Web Application (SaaS Platform)  
**Domain:** Creative Tools / AI-Assisted Writing  
**Complexity:** High (Multi-agent AI orchestration, real-time collaboration, complex state management)

**Project Classification:**
- **Category:** Story Generation Engine
- **Target Market:** Individual storytellers and narrative writers
- **Deployment:** Web-based application with cloud backend
- **Scale:** Greenfield development (building from scratch)
- **Technical Complexity:** Advanced AI integration, hierarchical data management, reactive UI

**Technology Foundation:**
- Frontend: React + TypeScript with Convex real-time hooks
- Backend: Convex (Actions + Mutations + Scheduler pattern)
- AI Integration: OpenRouter API (unified access to Claude 3.5 Sonnet, GPT-4, etc.)
- Database: Convex relational tables with hierarchical references
- Architecture: Multi-agent system with Character, Scene Writer, and future Consistency Checker agents

---

## Success Criteria

**PoC Success (Primary Goal):**
Generate prose for 10 scenes without losing track of the plot.

**Specific Success Metrics:**

### User Experience
- ✅ Writer can create a story structure (chapters + scenes) and visualize the entire tree
- ✅ Writer can input scene outlines (minimal to detailed) and receive generated prose
- ✅ Writer can navigate between scenes instantly without context loss
- ✅ Writer experiences consistent character voice across all 10 generated scenes
- ✅ UI updates in real-time showing generation status ("Generating..." → "Complete")

### Technical Validation
- ✅ Convex Actions successfully orchestrate multi-agent pipeline (Character Agent → Scene Writer Agent)
- ✅ Agent scheduler pattern decouples UI from long-running LLM calls (no blocking)
- ✅ Character traits and context persist across scene boundaries
- ✅ Generated prose maintains narrative coherence (plot logic, character knowledge consistency)

### Quality Benchmarks
- ✅ Character voice consistency: Same character sounds like themselves across all scenes
- ✅ Prose quality: Readable, engaging narrative suitable for first draft
- ✅ Generation speed: 5-10 seconds per scene (300-500 words)
- ✅ Accept rate: Writer accepts 70%+ of generations without major rewrites

### Post-PoC Success (Growth Indicators)
- Writer completes a full 24-chapter story outline (100+ scenes)
- Character knowledge timeline prevents 5+ potential inconsistencies
- Writer invites 2-3 other storytellers to beta test
- Platform handles multiple concurrent story projects

---

## Product Scope

### MVP - Minimum Viable Product (PoC)

**Core Capabilities:**

**1. Story Structure Management**
- Create story with title and basic metadata
- Define up to 24 chapters using structured template
- Add scenes to chapters (target: 100+ scenes supported)
- Tree visualization showing Story → Chapters → Scenes hierarchy
- Expand/collapse nodes for visual clarity
- Click any scene to work on it

**2. Character System**
- Create characters with:
  - Name
  - Traits (personality, background, key characteristics)
  - Backstory (optional, imported from worldbuilding doc)
- Simple character list view
- Basic character selection for scenes

**3. Scene Generation Workflow**
- Scene outline input (flexible: title only, moderate beats, detailed outline)
- "Generate Prose" button triggers AI pipeline
- Real-time status display:
  - "Generating..." (while agents work)
  - Progress indicators
  - "Complete" (when prose ready)
- Generated prose display (300-500 words per scene)
- Action buttons:
  - **Accept** (save as final)
  - **Regenerate** (trigger new generation)
  - **Edit** (manual refinement)

**4. Multi-Agent Orchestration (Backend)**
- **Character Agent:** Generates character perspective, voice guidance, emotional state
- **Scene Writer Agent:** Generates narrative prose incorporating character voice
- **Convex scheduler pattern:** Mutation → schedules Action → async execution
- **OpenRouter integration:** Unified API for Claude 3.5 Sonnet (primary model)

**5. Split-Screen Workspace**
- **Left panel:** Tree navigation (story structure)
- **Right panel:** Scene editor/viewer
  - Outline input area
  - Generated prose display
  - Scene metadata
- Responsive layout (desktop-focused for PoC)

**6. Data Persistence**
- Save/load story projects from Convex database
- Auto-save scene outlines and generated prose
- Preserve generation history (track regeneration count)

**What's EXCLUDED from MVP:**
- ❌ Memory system (character/plot/style memory - deferred to Phase 2)
- ❌ Knowledge timeline tracking (AI-detected character knowledge - deferred to Phase 3)
- ❌ Consistency Checker Agent (deferred to Phase 4)
- ❌ Scene Outliner Agent (user types outlines manually in PoC)
- ❌ Director/Orchestrator Agent (direct agent calls for PoC)
- ❌ Timeline view at bottom (tree only for PoC)
- ❌ Template framework (24-chapter is hardcoded for PoC)
- ❌ TOON encoding (plain JSON for PoC)
- ❌ Multi-user collaboration
- ❌ Authentication (single-user PoC)
- ❌ Export features (PDF, ePub, etc.)

### Growth Features (Post-MVP)

**Phase 2: Enhanced Visualization**
- Timeline view (bottom panel showing chronological scene flow)
- Visual indicators for scene status (draft, generating, complete, needs review)
- Scene dependencies and connections
- Chapter summaries

**Phase 3: Memory Systems**
- **Character Memory:** Persistent traits, relationships, character arc tracking
- **Plot Memory:** Timeline of events, cause-effect relationships, story threads
- **Style Memory:** Narrative voice, POV preferences, tone consistency

**Phase 4: Knowledge Timeline**
- AI-detected knowledge extraction from generated prose
- Automatic tracking of "what each character knows when"
- Consistency validation (prevent premature reveals)
- Knowledge state visualization per scene

**Phase 5: Additional Agents**
- **Consistency Checker Agent:** Validates character/plot/tone coherence
- **Scene Outliner Agent:** Helps structure scenes with purpose/conflict/stakes
- **Director Orchestration:** Strategic coordinator managing all agents

**Phase 6: Collaboration & Sharing**
- Multi-user authentication
- Story sharing and permissions
- Real-time collaborative editing
- Comments and feedback system

**Phase 7: Export & Publishing**
- Export to PDF, ePub, DOCX
- Format customization
- Chapter/scene selection for partial exports
- Integration with publishing platforms

### Vision (Future)

**Template Framework System**
- Pluggable story structure templates:
  - 24-chapter (default)
  - Hero's Journey
  - 3-Act Structure
  - Save the Cat (Blake Snyder)
  - Custom user-defined templates
- Template marketplace (community templates)

**Advanced AI Features**
- Multi-model support (switch between Claude, GPT-4, Gemini)
- Cost optimization (use cheaper models for simple tasks)
- Fallback strategies (if primary model fails)
- Fine-tuned models for specific genres

**Story Universe Management**
- Multi-story projects
- Shared characters across stories
- World-building knowledge base
- Cross-story references

**Analytics & Insights**
- Story pacing analysis
- Character arc visualization
- Plot complexity metrics
- Writing productivity tracking

**Mobile & Offline Support**
- Progressive Web App (PWA)
- Offline writing and sync
- Mobile-optimized canvas
- Voice input for scene outlines

---

## Web Application Specific Requirements

**Application Architecture:**

**Frontend (React + TypeScript)**
- Single-page application (SPA)
- Component-based architecture:
  - `StoryTree` component (left panel navigation)
  - `SceneEditor` component (right panel workspace)
  - `CharacterManager` component
  - `GenerationStatus` component (real-time updates)
- State management via Convex React hooks:
  - `useQuery` for reactive data fetching
  - `useMutation` for data writes and action scheduling
- Responsive layout system (desktop-first, 1440px+ optimal)

**Backend (Convex)**
- **Tables Schema:**
  - `stories` - Story metadata (id, title, createdAt)
  - `chapters` - Chapter structure (id, storyId, chapterNumber, title)
  - `scenes` - Scene content (id, storyId, chapterId, sceneNumber, outline, prose, status)
  - `characters` - Character data (id, storyId, name, traits, backstory)
  
- **Mutations:** User-initiated writes
  - `createStory`, `createChapter`, `createScene`, `createCharacter`
  - `updateScene`, `updateCharacter`
  - `requestSceneGeneration` (schedules Action, returns immediately)

- **Actions:** AI agent orchestration
  - `generateScene` - Calls OpenRouter API for multi-agent pipeline
  - Executes asynchronously (no UI blocking)
  - Handles retries and error states

- **Queries:** Real-time data reads
  - `getStory`, `getChapters`, `getScenes`, `getCharacters`
  - Automatic reactivity (UI updates when data changes)

**API Integration (OpenRouter)**
- Unified LLM API endpoint
- Primary model: Claude 3.5 Sonnet (anthropic/claude-3.5-sonnet)
- Request format:
  - Character Agent prompt → JSON response (emotional state, perspective, voice guidance)
  - Scene Writer prompt → Prose text response
- Authentication: Bearer token (stored in Convex environment variables)
- Rate limiting: Handle gracefully with exponential backoff
- Error handling: Fallback to error state in scene status

**Data Flow:**
```
User clicks "Generate Prose"
  ↓
Frontend: useMutation(requestSceneGeneration)
  ↓
Convex Mutation: Save outline, set status="generating", schedule Action
  ↓
Return immediately (no waiting for LLM)
  ↓
Convex Action (async): 
  - Load scene + character data
  - Call OpenRouter (Character Agent)
  - Call OpenRouter (Scene Writer)
  - Save prose + status="complete"
  ↓
Frontend: useQuery detects update, UI shows generated prose automatically
```

**Deployment:**
- Frontend hosting: Vercel (free tier)
- Backend: Convex cloud (free tier: 1M function calls/month)
- Environment variables: Convex dashboard (OPENROUTER_API_KEY)

---

## User Experience Principles

**Core Philosophy:** Remove friction, maintain flow, preserve context.

**Visual Design:**
- **Clean and minimal** - Focus on content, not chrome
- **Professional but approachable** - Writers should feel comfortable, not intimidated
- **Information hierarchy** - Story structure is primary, controls are secondary
- **Consistent spatial layout** - Tree always left, content always right (no shifting)

**Interaction Patterns:**

**1. Tree Navigation**
- Expand/collapse chapters with click
- Click scene to load in editor
- Visual highlighting of current scene
- Keyboard shortcuts:
  - `↑/↓` navigate scenes
  - `←/→` expand/collapse chapters
  - `Enter` open selected scene

**2. Scene Generation Flow**
- **Input phase:** Writer types scene outline (flexible length)
- **Suggestion:** Placeholder text shows example moderate input
- **Trigger:** Single "Generate Prose" button (clear call-to-action)
- **Feedback:** Immediate status change to "Generating..."
- **Waiting state:** Spinner + estimated time (5-10 seconds)
- **Completion:** Prose appears with gentle animation
- **Actions:** Three clear buttons (Accept / Regenerate / Edit)

**3. Real-time Status Indicators**
- Scene badges: Draft (gray), Generating (blue pulse), Complete (green), Error (red)
- Generation progress: "Character Agent..." → "Scene Writer..." → "Complete"
- No blocking - user can navigate away during generation

**4. Error Handling**
- Graceful failure states
- Clear error messages (non-technical language)
- "Retry" option always available
- Errors don't block other scenes

**Visual Personality:**
- **Vibe:** Professional writing studio, not a toy
- **Colors:** Neutral base (white/light gray), accent color for active elements
- **Typography:** Readable serif for prose, sans-serif for UI
- **Spacing:** Generous whitespace, uncluttered

### Key Interactions

**Starting a New Story:**
1. Click "New Story"
2. Enter story title
3. System creates default 24-chapter structure
4. User can rename chapters or add custom chapters

**Creating a Character:**
1. Click "Add Character"
2. Fill form:
   - Name (required)
   - Traits (comma-separated or list)
   - Backstory (optional)
3. Character appears in character list
4. Available for scene generation immediately

**Generating Scene Prose:**
1. Select scene from tree
2. Type scene outline in input area:
   - **Minimal:** "Sarah meets Marcus at market"
   - **Moderate:** "Sarah enters market for supplies. Spots Marcus. Old wounds resurface. Tense conversation about the past."
   - **Detailed:** "Sarah (goal: buy supplies) enters market. Sees Marcus unexpectedly (complication: he betrayed her). She confronts him (conflict: trust vs revenge). Marcus defends himself. They part without resolution (stakes: future alliance)."
3. Click "Generate Prose"
4. Watch status update (5-10 seconds)
5. Review prose
6. Choose action:
   - **Accept:** Prose saved as final
   - **Regenerate:** New generation with same outline
   - **Edit:** Manual refinement, then save

**Navigating Between Scenes:**
- Click any scene in tree (instant load)
- Use keyboard shortcuts for sequential navigation
- Tree remains visible at all times (no context loss)

---

## Functional Requirements

### FR-1: Story Management

**FR-1.1: Create Story**
- User can create a new story with title
- System generates default 24-chapter structure based on template
- Each chapter has default title (editable)
- Story persists to Convex `stories` table
- Acceptance Criteria: Story appears in tree view immediately

**FR-1.2: Edit Story Metadata**
- User can edit story title
- User can edit chapter titles
- Changes save automatically (auto-save after 1 second of inactivity)
- Acceptance Criteria: Edits persist across sessions

**FR-1.3: Delete Story**
- User can delete entire story (with confirmation)
- Cascade delete: All chapters, scenes, and characters
- Acceptance Criteria: Data fully removed from Convex database

### FR-2: Chapter Management

**FR-2.1: View Chapter Structure**
- Tree displays all 24 chapters with titles
- Chapters numbered 1-24
- Expandable/collapsible for visual clarity
- Acceptance Criteria: Tree renders in < 500ms

**FR-2.2: Edit Chapter**
- User can rename chapter
- User can add custom chapters beyond 24 (future)
- Acceptance Criteria: Changes reflect immediately in tree

### FR-3: Scene Management

**FR-3.1: Create Scene**
- User can add scene to any chapter
- Scene has:
  - Scene number (auto-incremented within chapter)
  - Outline (user input)
  - Generated prose (initially null)
  - Status (draft, generating, complete, error)
- Acceptance Criteria: Scene appears in tree under chapter

**FR-3.2: Edit Scene Outline**
- User can edit scene outline at any time
- Editing outline doesn't affect existing prose (prose remains)
- User must regenerate if they want prose updated
- Acceptance Criteria: Outline changes saved automatically

**FR-3.3: Delete Scene**
- User can delete scene (with confirmation)
- Generated prose is also deleted
- Acceptance Criteria: Scene removed from tree and database

**FR-3.4: Navigate to Scene**
- User clicks scene in tree → Scene loads in editor
- Current scene highlighted in tree
- Load time < 200ms
- Acceptance Criteria: Seamless navigation without flicker

### FR-4: Character Management

**FR-4.1: Create Character**
- User can create character with:
  - Name (required, text field)
  - Traits (textarea, comma-separated or list)
  - Backstory (textarea, optional)
- Character saved to Convex `characters` table
- Acceptance Criteria: Character available for all scenes in story

**FR-4.2: Edit Character**
- User can edit character properties at any time
- Changes affect future generations (not retroactive)
- Acceptance Criteria: Updated traits used in next scene generation

**FR-4.3: Delete Character**
- User can delete character (with confirmation)
- Scenes using this character still retain generated prose
- Acceptance Criteria: Character removed from list

**FR-4.4: View Character List**
- User sees all characters for current story
- Displayed in side panel or modal
- Acceptance Criteria: List renders with < 200ms load time

### FR-5: Scene Generation (Core Feature)

**FR-5.1: Request Generation**
- User inputs scene outline (any length: title only to detailed)
- User clicks "Generate Prose" button
- Frontend calls Convex mutation `requestSceneGeneration`
- Mutation:
  - Saves scene outline
  - Sets status = "generating"
  - Schedules Action (runAfter 0ms)
  - Returns immediately (no blocking)
- Acceptance Criteria: Status changes to "Generating..." within 100ms

**FR-5.2: Execute Multi-Agent Pipeline**
- Convex Action `generateScene` executes asynchronously:
  1. Load scene data (outline, sceneNumber, chapter context)
  2. Load character data (name, traits, backstory)
  3. Call OpenRouter API - Character Agent:
     - Input: Character traits + scene outline
     - Output: JSON (emotionalState, perspective, voiceGuidance, physicalReactions)
  4. Call OpenRouter API - Scene Writer Agent:
     - Input: Scene outline + Character Agent output
     - Output: Narrative prose (300-500 words)
  5. Save prose to Convex `scenes` table
  6. Set status = "complete"
- Acceptance Criteria: Pipeline completes in 5-10 seconds

**FR-5.3: Display Generated Prose**
- Frontend useQuery detects status change to "complete"
- UI automatically displays generated prose
- Prose formatted with proper paragraphs
- Acceptance Criteria: Prose appears without page refresh

**FR-5.4: Accept Generation**
- User clicks "Accept" button
- Prose marked as final (no further changes)
- Scene status badge shows "Complete" (green)
- Acceptance Criteria: Prose saved permanently

**FR-5.5: Regenerate Scene**
- User clicks "Regenerate" button
- System triggers new generation with same outline
- Previous prose overwritten (no version history in PoC)
- Regeneration count incremented
- Acceptance Criteria: New prose replaces old prose

**FR-5.6: Edit Prose Manually**
- User clicks "Edit" button
- Prose becomes editable textarea
- User makes changes
- User clicks "Save"
- Edited prose saved to database
- Acceptance Criteria: Manual edits persist

**FR-5.7: Error Handling**
- If OpenRouter API fails:
  - Action catches error
  - Sets status = "error"
  - Saves error message
  - Frontend displays error with "Retry" button
- Acceptance Criteria: User can recover from errors gracefully

### FR-6: Real-time UI Updates

**FR-6.1: Status Reactivity**
- Scene status changes propagate to UI automatically
- No manual refresh required
- Convex useQuery provides reactive updates
- Acceptance Criteria: Status changes visible within 500ms

**FR-6.2: Multi-Scene Generation**
- User can trigger generation for multiple scenes concurrently
- Each scene has independent status
- UI shows progress for all generating scenes
- Acceptance Criteria: No blocking between scenes

### FR-7: Data Persistence

**FR-7.1: Auto-save**
- All changes auto-save to Convex database
- No explicit "Save" button needed (except for manual prose edits)
- Acceptance Criteria: Data persists across browser sessions

**FR-7.2: Load Story**
- User can load existing story from database
- Full story structure loads (chapters, scenes, characters, prose)
- Load time < 1 second for 100 scenes
- Acceptance Criteria: Story state restored exactly as saved

---

## Non-Functional Requirements

### Performance

**NFR-1: Scene Generation Speed**
- **Target:** 5-10 seconds per scene
- **Method:** 
  - Character Agent call: 2-3 seconds
  - Scene Writer Agent call: 3-5 seconds
  - Total pipeline: 5-8 seconds (plus network overhead)
- **Measurement:** Log timestamps in Action execution
- **Rationale:** Writers need fast iteration to maintain creative flow

**NFR-2: UI Responsiveness**
- **Tree rendering:** < 500ms for 100 scenes
- **Scene load:** < 200ms to display prose
- **Navigation:** < 100ms to switch scenes
- **Measurement:** Browser performance profiling
- **Rationale:** Any lag breaks immersion and flow

**NFR-3: Scalability (PoC Level)**
- Support 1 concurrent user (you)
- Support 5 story projects per user
- Support 100 scenes per story
- **Rationale:** PoC is single-user; scalability deferred to growth phase

### Security

**NFR-4: API Key Protection**
- OpenRouter API key stored in Convex environment variables
- Never exposed to frontend
- Actions call API server-side only
- **Rationale:** Prevent API key theft and unauthorized usage

**NFR-5: Data Privacy (Future)**
- Single-user PoC has no authentication
- Post-PoC: Convex Auth for multi-user support
- Story data isolated per user
- **Rationale:** Writers need privacy for unpublished work

### Integration

**NFR-6: OpenRouter API Integration**
- Use OpenRouter unified API (not direct Claude API)
- Primary model: Claude 3.5 Sonnet (anthropic/claude-3.5-sonnet)
- Fallback: GPT-4o (if Claude fails) - future enhancement
- **Rationale:** OpenRouter provides flexibility and cost optimization

**NFR-7: Convex Real-time Sync**
- All queries are reactive (automatic UI updates)
- No polling required
- WebSocket connection maintained
- **Rationale:** Essential for real-time generation status

### Usability

**NFR-8: Visual Clarity**
- Tree must display 100 scenes without scroll fatigue
- Collapsible chapters to manage visual complexity
- Current scene always highlighted
- **Rationale:** Spatial awareness is core to product magic

**NFR-9: Error Messages**
- User-friendly language (not technical jargon)
- Clear recovery actions ("Retry", "Edit Outline", "Contact Support")
- Errors don't crash UI
- **Rationale:** Writers are not developers; errors should be understandable

### Cost Efficiency

**NFR-10: PoC Budget**
- Total PoC cost (10 scenes, 3 regenerations each): ~$0.30
- Convex free tier sufficient (1M function calls/month)
- OpenRouter charges: $3/$15 per million tokens (Claude 3.5 Sonnet)
- **Rationale:** Validate concept before scaling costs

---

## Implementation Planning

### Epic Breakdown Required

This PRD captures high-level requirements. Implementation requires decomposition into:
- **Epics:** Major feature areas (e.g., "Story Management", "Scene Generation Pipeline")
- **Stories:** Bite-sized tasks (200k context limit for dev agents)
- **Acceptance Criteria:** Testable conditions for each story

**Next Step:** Run `/bmad:bmm:workflows:create-epics-and-stories` to create implementation breakdown.

---

## References

**Discovery Documents:**
- Brainstorming Results: `output/brainstorming-session-results-2025-11-13.md`
- Research Summary: `output/research-summary-convex-openrouter.md`
- Action Plan: `output/archive/narrative-canvas-platform-action-plan.md`
- 24-Chapter Template: `projects/alpha/docs/ref/24chapters`

**Visual References:**
- Split-screen workspace mockup (provided images)
- Tree + editor layout inspiration
- Timeline view concept

---

## Next Steps

1. **✅ PRD Complete**
2. **Epic & Story Breakdown** - Run: `/bmad:bmm:workflows:create-epics-and-stories`
3. **UX Design** - Run: `/bmad:bmm:workflows:create-design` (optional - you have mockups)
4. **Architecture** - Run: `/bmad:bmm:workflows:create-architecture` (recommended)

---

_This PRD captures the essence of **Narrative Canvas Platform** - visual organization that lets storytellers see their entire story and never lose track of the narrative._

_The magic: You can write with AI and maintain coherence across 100+ scenes because the structure is always visible, character voices stay consistent, and the engine knows where you are in your story._

_Created through collaborative discovery between knosso and AI facilitator (John, Product Manager)._
