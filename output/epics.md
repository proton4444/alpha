# Narrative Canvas Platform - Epic Breakdown

**Author:** knosso  
**Date:** 2025-11-14  
**Project Level:** 3 (Greenfield Web Application)  
**Target Scale:** PoC: 10 scenes | Growth: 100+ scenes

---

## Overview

This document provides the complete epic and story breakdown for **Narrative Canvas Platform**, decomposing the requirements from the [PRD](./PRD.md) into implementable stories sized for single dev agent completion.

**Project Goal:** Build an AI-powered story generation engine that gives storytellers visual organization (tree structure) and AI-assisted prose generation without losing narrative coherence.

**PoC Success:** Generate prose for 10 scenes without losing track of the plot.

---

## Epic Summary

This breakdown organizes the Narrative Canvas Platform into **5 cohesive epics** delivering incremental value:

| Epic                              | Focus                        | Value Delivered                          | Stories |
| --------------------------------- | ---------------------------- | ---------------------------------------- | ------- |
| **1. Project Foundation**         | Infrastructure setup         | Development environment ready            | 4-5     |
| **2. Story Structure Management** | Hierarchical organization    | Writers can organize narratives visually | 5-6     |
| **3. Character System**           | Character definition         | Characters ready for AI generation       | 3-4     |
| **4. AI Scene Generation**        | Multi-agent prose generation | PoC SUCCESS - Generate 10 scenes!        | 6-8     |
| **5. Workspace & UX Polish**      | Complete writing experience  | Professional, delightful tool            | 4-5     |

**Total:** 22-28 stories (sized for single dev agent completion)

**Sequencing Logic:** Foundation → Data Structure → Characters → AI Generation → UX Polish

---

## Epic 1: Project Foundation & Infrastructure

**Goal:** Establish the development environment and core technical foundation that enables all subsequent feature development.

**Value:** Creates the "canvas" - a working application skeleton with database schema, API integration, and deployment pipeline ready for feature implementation.

---

### Story 1.1: Initialize Convex + React Project with Starter Template

As a **developer**,
I want **to initialize the project using the official Convex starter template**,
So that **I have a working React + TypeScript + Convex foundation with proper configuration**.

**Acceptance Criteria:**

**Given** I have Node.js 20+ and npm installed
**When** I run `npm create convex@latest narrative-canvas`
**Then** The project is created with:

- React 19.2+ with TypeScript 5.9+
- Vite 7.2+ for fast development
- Convex client setup with useQuery and useMutation hooks
- Project structure: `convex/` for backend, `src/` for frontend

**And** Running `npm run dev` starts the Vite dev server on localhost:5173

**And** Running `npx convex dev` starts the Convex backend with hot reload

**Prerequisites:** None (first story)

**Technical Notes:**

- Use React (Vite) option when prompted
- Select TypeScript: Yes
- Authentication: None (defer to post-PoC)
- Creates `.env.local` with `VITE_CONVEX_URL` automatically
- Reference: Architecture document ADR on starter template

---

### Story 1.2: Define Convex Database Schema

As a **developer**,
I want **to define the complete Convex database schema for stories, chapters, scenes, and characters**,
So that **the data model supports hierarchical story structure and AI generation workflow**.

**Acceptance Criteria:**

**Given** The Convex project is initialized
**When** I create `convex/schema.ts` with all table definitions
**Then** The schema includes:

- `stories` table (title, createdAt)
- `chapters` table (storyId, chapterNumber, title) with `by_story` index
- `scenes` table (storyId, chapterId, sceneNumber, outline, prose, status, errorMessage, regenerationCount) with `by_story` and `by_chapter` indexes
- `characters` table (storyId, name, traits, backstory) with `by_story` index

**And** Status field uses union type: "draft" | "generating" | "complete" | "error"

**And** All foreign key references use Convex `v.id()` types

**And** Running `npx convex dev` validates the schema without errors

**Prerequisites:** Story 1.1

**Technical Notes:**

- Reference: Architecture document Data Architecture section
- Use `v.number()` for createdAt (Unix timestamp)
- Use `v.optional()` for prose, backstory, errorMessage
- Indexes enable fast queries by storyId and chapterId

---

### Story 1.3: Configure OpenRouter API Integration and Environment Variables

As a **developer**,
I want **to configure secure OpenRouter API integration with environment variables**,
So that **Convex Actions can call the OpenRouter API without exposing the API key to the frontend**.

**Acceptance Criteria:**

**Given** I have an OpenRouter API key
**When** I add the API key to Convex environment variables in the dashboard
**Then** The environment variable `OPENROUTER_API_KEY` is set in Convex (Settings → Environment Variables)

**And** I create `convex/actions/openrouter.ts` helper file with:

- TypeScript function to call OpenRouter API
- Proper headers (Authorization, Content-Type)
- Model parameter: `anthropic/claude-3.5-sonnet`
- Error handling for network failures and rate limiting

**And** The API key is never exposed to frontend code

**And** A test Action successfully calls OpenRouter and returns a response

**Prerequisites:** Story 1.1, Story 1.2

**Technical Notes:**

- Reference: Architecture document Security Architecture
- OpenRouter endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Use `process.env.OPENROUTER_API_KEY` in Actions (server-side only)
- Add retry logic with exponential backoff for resilience

---

### Story 1.4: Implement TOON Parser Utility

As a **developer**,
I want **to implement a TOON format parser for Character Agent responses**,
So that **I can parse key:value AI output with 60% token savings over JSON**.

**Acceptance Criteria:**

**Given** The Convex project structure exists
**When** I create `convex/lib/parseToon.ts` with the parser function
**Then** The function takes a TOON string as input (e.g., `"emotional:anxious|hopeful\npov:first-limited\nvoice:short-sentences"`)

**And** Returns a typed object: `Record<string, string>`

**And** Parses each line by splitting on `:`

**And** Filters out lines without colons

**And** Trims whitespace from keys and values

**And** Export function is typed and documented with JSDoc comments

**Prerequisites:** Story 1.1

**Technical Notes:**

- Reference: Architecture document Implementation Patterns → TOON Data Format Pattern
- Simple 10-line utility function
- Example input/output in code comments
- Used by Story 4.3 (Character Agent integration)

---

### Story 1.5: Set Up Tailwind CSS and shadcn/ui Component Library

As a **developer**,
I want **to configure Tailwind CSS 4.0 and initialize shadcn/ui**,
So that **I have a styling system and accessible UI primitives ready for component development**.

**Acceptance Criteria:**

**Given** The React project is initialized
**When** I run `npx shadcn@latest init`
**Then** Tailwind CSS 4.0 is installed and configured

**And** `tailwind.config.ts` is created with proper content paths

**And** `src/styles/index.css` includes Tailwind directives

**And** shadcn/ui is initialized with components going to `src/components/ui/`

**And** I install base components: `npx shadcn@latest add button input textarea dialog`

**And** The dev server shows styled components without errors

**Prerequisites:** Story 1.1

**Technical Notes:**

- Reference: Architecture document ADR-005 (Tailwind + shadcn/ui)
- shadcn/ui components are copy-pasted (not npm dependencies)
- Customize in `src/components/ui/` after installation
- Base components enable Story 2.x and 3.x UI development

---

## Epic 2: Story Structure Management

**Goal:** Enable writers to create and organize their narrative hierarchically with visual tree representation.

**Value:** Delivers the core "spatial awareness" feature - writers can see their entire story structure and navigate it effortlessly.

---

### Story 2.1: Implement Story CRUD Operations (Create, Read, Update, Delete)

As a **writer**,
I want **to create, view, update, and delete stories**,
So that **I can manage my story projects in the application**.

**Acceptance Criteria:**

**Given** The Convex schema is defined
**When** I implement `convex/stories.ts` with mutations and queries
**Then** The file includes:

- `createStory` mutation that creates a story with title and automatically generates 24 chapters (Chapter 1-24)
- `getStory` query that loads a story by ID
- `updateStory` mutation that updates story title
- `deleteStory` mutation that deletes story and cascades to chapters/scenes

**And** `createStory` returns the new story ID

**And** Each chapter is created with default title "Chapter N" where N is 1-24

**And** All mutations include validation (title length 1-200 characters)

**Prerequisites:** Story 1.2 (database schema)

**Technical Notes:**

- Reference: Architecture document FR-1 (Story Management)
- Use `ctx.db.insert()` for creates
- Use `ctx.db.patch()` for updates
- Use `ctx.db.delete()` for deletes
- 24 chapters created in a loop within the mutation

---

### Story 2.2: Implement Chapter Management Operations

As a **writer**,
I want **to view and update chapter titles**,
So that **I can customize the structure of my story**.

**Acceptance Criteria:**

**Given** Stories with chapters exist
**When** I implement `convex/chapters.ts` with mutations and queries
**Then** The file includes:

- `getChaptersByStory` query that returns all chapters for a story (ordered by chapterNumber)
- `updateChapter` mutation that updates chapter title
- Validation for title length (1-200 characters)

**And** Query uses `by_story` index for fast lookups

**And** Chapters are returned in ascending order (1, 2, 3...24)

**Prerequisites:** Story 2.1

**Technical Notes:**

- Reference: Architecture document FR-2 (Chapter Management)
- Use `.withIndex("by_story", q => q.eq("storyId", storyId))` for efficient queries
- Order by `.order("asc")` on chapterNumber

---

### Story 2.3: Implement Scene CRUD Operations

As a **writer**,
I want **to create, view, update, and delete scenes within chapters**,
So that **I can structure my narrative at the scene level**.

**Acceptance Criteria:**

**Given** Stories and chapters exist
**When** I implement `convex/scenes.ts` with mutations and queries
**Then** The file includes:

- `createScene` mutation that creates a scene with outline and initial status="draft"
- `getScenesByChapter` query that returns all scenes for a chapter (ordered by sceneNumber)
- `getScene` query that loads a single scene by ID
- `updateScene` mutation that updates outline and/or prose
- `deleteScene` mutation that removes a scene

**And** `createScene` auto-increments sceneNumber within the chapter

**And** Scene validation includes: outline length 1-2000 characters

**And** Initial regenerationCount is set to 0

**Prerequisites:** Story 2.2

**Technical Notes:**

- Reference: Architecture document FR-3 (Scene Management)
- Use `by_chapter` index for fast scene queries
- Status field initially set to "draft"
- Scene prose is optional (v.optional)

---

### Story 2.4: Build StoryTree Component with Hierarchical Visualization

As a **writer**,
I want **to see my entire story structure as an interactive tree**,
So that **I have spatial awareness of my narrative at all times**.

**Acceptance Criteria:**

**Given** Stories with chapters and scenes exist
**When** I create `src/components/StoryTree.tsx` component
**Then** The component displays:

- Story title at the root
- 24 chapters as expandable/collapsible nodes
- Scenes nested under each chapter
- Visual hierarchy with indentation

**And** Clicking a chapter expands/collapses its scenes

**And** Current selected scene is highlighted visually

**And** Empty chapters show "(no scenes)" placeholder

**And** Component uses Convex `useQuery` to load story tree reactively

**Prerequisites:** Story 2.3, Story 1.5 (Tailwind CSS)

**Technical Notes:**

- Reference: Architecture document Project Structure (StoryTree component)
- Use `getStoryTree` query that loads story + chapters + scenes in one call
- Tree expand/collapse state managed in React Context (Story 2.5)
- Use Tailwind classes for styling (indentation, hover states)

---

### Story 2.5: Implement Navigation State with React Context

As a **writer**,
I want **my current scene selection and tree collapse state to persist as I navigate**,
So that **I don't lose my place when switching between scenes**.

**Acceptance Criteria:**

**Given** The StoryTree component exists
**When** I create `src/hooks/useCurrentScene.ts` with Context API
**Then** The hook provides:

- `currentSceneId` - currently selected scene ID (or null)
- `setCurrentSceneId` - function to change current scene
- `treeCollapsed` - Record<chapterId, boolean> for expand/collapse state
- `toggleChapter` - function to expand/collapse a chapter

**And** Context is wrapped around the app in `src/App.tsx`

**And** Clicking a scene in StoryTree calls `setCurrentSceneId`

**And** Clicking a chapter calls `toggleChapter` to expand/collapse

**And** State persists across component re-renders (but not page refresh - that's acceptable for PoC)

**Prerequisites:** Story 2.4

**Technical Notes:**

- Reference: Architecture document Implementation Patterns → State Management Pattern
- Use React `createContext` and `useContext`
- Template provided in architecture document
- UI state (not persisted to database)

---

### Story 2.6: Implement Auto-Save Functionality for Scenes

As a **writer**,
I want **my scene outlines and edits to auto-save automatically**,
So that **I never lose my work**.

**Acceptance Criteria:**

**Given** Scene editing is implemented
**When** I type in a scene outline or prose field
**Then** After 1 second of inactivity, the content auto-saves to Convex

**And** A subtle indicator shows "Saving..." and then "Saved"

**And** No explicit "Save" button is needed

**And** Auto-save uses `updateScene` mutation

**And** Debounce logic prevents excessive API calls while typing

**Prerequisites:** Story 2.3

**Technical Notes:**

- Reference: Architecture document FR-1.2 (auto-save after 1 second)
- Use `useEffect` with debounce (e.g., lodash debounce or custom implementation)
- Display save status with small text below input
- Only trigger save if content actually changed

---

## Epic 3: Character System

**Goal:** Enable writers to define characters with traits that guide AI generation for consistent voice.

**Value:** Characters become the foundation for AI-generated prose with authentic, consistent voices.

---

### Story 3.1: Implement Character CRUD Operations

As a **writer**,
I want **to create, view, update, and delete characters for my story**,
So that **I can define the characters that will appear in my scenes**.

**Acceptance Criteria:**

**Given** The Convex schema is defined
**When** I implement `convex/characters.ts` with mutations and queries
**Then** The file includes:

- `createCharacter` mutation (name, traits, optional backstory)
- `getCharactersByStory` query (returns all characters for a story)
- `getCharacter` query (loads single character by ID)
- `updateCharacter` mutation (updates name, traits, backstory)
- `deleteCharacter` mutation (removes character)

**And** Validation: name 1-100 characters, traits 1-1000 characters

**And** Query uses `by_story` index for fast lookups

**And** Characters returned in insertion order (or alphabetically by name)

**Prerequisites:** Story 1.2 (database schema)

**Technical Notes:**

- Reference: Architecture document FR-4 (Character Management)
- Backstory is optional (v.optional in schema)
- Traits can be comma-separated or list format

---

### Story 3.2: Build CharacterManager UI Component

As a **writer**,
I want **a simple interface to manage my characters**,
So that **I can quickly add and edit character information**.

**Acceptance Criteria:**

**Given** Character mutations and queries exist
**When** I create `src/components/CharacterManager.tsx`
**Then** The component displays:

- List of all characters for the current story
- "Add Character" button
- Character cards showing name and traits preview
- Edit and Delete buttons on each card

**And** Clicking "Add Character" opens a dialog/form

**And** Form includes fields: Name (required), Traits (required), Backstory (optional)

**And** Clicking "Save" calls `createCharacter` mutation

**And** Clicking Edit opens the same form pre-filled with character data

**And** Clicking Delete prompts for confirmation before calling `deleteCharacter`

**Prerequisites:** Story 3.1, Story 1.5 (shadcn/ui dialog component)

**Technical Notes:**

- Reference: Architecture document Component Structure
- Use shadcn/ui Dialog for add/edit form
- Use Textarea for traits and backstory fields
- Display traits in truncated form (e.g., first 100 chars) in list view

---

### Story 3.3: Integrate Character Selection for Scene Context

As a **writer**,
I want **to associate characters with scenes implicitly through the story**,
So that **all characters are available for scene generation without explicit selection**.

**Acceptance Criteria:**

**Given** Characters exist for a story
**When** A scene is being generated
**Then** The generation Action loads all characters for the story using `getCharactersByStory`

**And** All character data (name, traits, backstory) is passed to the Character Agent

**And** Character Agent uses this data to generate character-specific guidance

**And** No explicit "select characters for this scene" UI needed in PoC

**Prerequisites:** Story 3.1, Story 3.2

**Technical Notes:**

- Reference: Architecture document FR-5.2 (Multi-Agent Pipeline)
- All characters in the story are available to every scene
- Scene-specific character filtering deferred to post-PoC
- Characters are loaded in `generateScene` Action (Story 4.3)

---

## Epic 4: AI Scene Generation Pipeline

**Goal:** Generate narrative prose with consistent character voice using multi-agent orchestration.

**Value:** Delivers the core PoC success metric - generate 10 scenes without losing track of the plot!

---

### Story 4.1: Implement requestSceneGeneration Mutation with Scheduler Pattern

As a **developer**,
I want **to implement the non-blocking scheduler pattern for scene generation**,
So that **the UI doesn't freeze while waiting for AI responses**.

**Acceptance Criteria:**

**Given** The Convex schema and OpenRouter config exist
**When** I create the `requestSceneGeneration` mutation in `convex/scenes.ts`
**Then** The mutation:

- Accepts `sceneId` and `outline` as arguments
- Updates the scene with the outline
- Sets scene.status = "generating"
- Schedules the `generateScene` Action with `runAfter(0)` (immediate)
- Returns immediately (no waiting for LLM response)

**And** The mutation includes validation: outline 1-2000 characters

**And** If validation fails, throw error (Convex handles gracefully)

**And** The mutation doesn't call OpenRouter directly (that's in the Action)

**Prerequisites:** Story 2.3 (scene mutations), Story 1.3 (OpenRouter config)

**Technical Notes:**

- Reference: Architecture document ADR-001 (Scheduler Pattern)
- Use `ctx.scheduler.runAfter(0, internal.actions.generateScene, { sceneId })`
- Returns `{ success: true }` immediately
- UI uses `useMutation` hook to call this

---

### Story 4.2: Implement Character Agent Integration with TOON Output

As a **developer**,
I want **to implement the Character Agent that returns character perspective in TOON format**,
So that **scene generation has character-specific guidance with token efficiency**.

**Acceptance Criteria:**

**Given** OpenRouter API is configured and TOON parser exists
**When** I create a function in `convex/actions/generateScene.ts` to call the Character Agent
**Then** The function:

- Accepts scene outline and characters as input
- Constructs a prompt for the Character Agent with system message: "You are a Character Agent. Analyze the scene and characters, then return your analysis in TOON format."
- Includes TOON format rules in the prompt (key:value, one per line, pipe | for multiple values)
- Specifies required fields: emotional, pov, voice, physical
- Calls OpenRouter API with model `anthropic/claude-3.5-sonnet`
- Returns the AI response (TOON string)

**And** The prompt includes scene outline and all character data (name, traits, backstory)

**And** Example TOON output is shown in prompt for clarity

**And** Error handling: If API call fails, throw error to be caught by Action handler

**Prerequisites:** Story 1.3 (OpenRouter), Story 1.4 (TOON parser), Story 3.3 (character loading)

**Technical Notes:**

- Reference: Architecture document Implementation Patterns → TOON Data Format Pattern
- System prompt must be clear about TOON format
- Response is plain text (not JSON)
- Parsed by parseToon utility in Story 4.3

---

### Story 4.3: Implement Scene Writer Agent Integration

As a **developer**,
I want **to implement the Scene Writer Agent that generates narrative prose**,
So that **writers receive 300-500 word scene prose based on their outline**.

**Acceptance Criteria:**

**Given** Character Agent is implemented
**When** I extend `convex/actions/generateScene.ts` to include Scene Writer Agent
**Then** The function:

- Accepts scene outline and Character Agent TOON output as input
- Parses TOON output using `parseToon` utility
- Constructs prompt for Scene Writer with system message: "You are a Scene Writer Agent. Generate narrative prose (300-500 words)."
- Includes scene outline and parsed character guidance (emotional state, POV, voice, physical reactions)
- Calls OpenRouter API with model `anthropic/claude-3.5-sonnet`
- Returns generated prose as plain text

**And** The prompt specifies word count: 300-500 words

**And** Character guidance is formatted clearly in the prompt

**And** Error handling: If API call fails, throw error

**Prerequisites:** Story 4.2

**Technical Notes:**

- Reference: Architecture document API Contracts (generateScene Action)
- Scene Writer receives processed character guidance (not raw TOON)
- Prose returned is plain text string
- Saved to scene.prose by Action handler (Story 4.4)

---

### Story 4.4: Implement Complete generateScene Action with Error Handling

As a **developer**,
I want **to orchestrate the full multi-agent pipeline in a single Action**,
So that **scene generation executes end-to-end with proper error handling**.

**Acceptance Criteria:**

**Given** Character Agent and Scene Writer Agent functions exist
**When** I complete the `generateScene` Action in `convex/actions/generateScene.ts`
**Then** The Action:

- Is marked as `internalAction` (not callable from frontend)
- Accepts `sceneId` as argument
- Loads scene data using `ctx.runQuery(internal.scenes.getScene, { sceneId })`
- Loads characters using `ctx.runQuery(internal.characters.getCharactersByStory, { storyId })`
- Calls Character Agent and gets TOON response
- Calls Scene Writer Agent with parsed character guidance
- Saves prose to scene using `ctx.runMutation(internal.scenes.updateScene, { sceneId, prose, status: "complete" })`
- Logs structured console output at each stage (CHARACTER_AGENT_START, CHARACTER_AGENT_COMPLETE, SCENE_WRITER_START, SCENE_WRITER_COMPLETE)

**And** Error handling: Wrap entire Action in try-catch

**And** On error: Save status="error" and errorMessage (user-friendly message)

**And** Log errors to console with full details for debugging

**Prerequisites:** Story 4.1, Story 4.2, Story 4.3

**Technical Notes:**

- Reference: Architecture document Implementation Patterns → Error Handling Pattern
- Use structured logging: `console.log("[SCENE_GEN]", { stage, timestamp, tokensUsed })`
- Error messages: "Rate limit reached - please wait 30 seconds and retry" (not technical jargon)
- Full pipeline execution in one Action

---

### Story 4.5: Build SceneEditor Component with Generation Workflow

As a **writer**,
I want **to input scene outlines and trigger AI generation from the UI**,
So that **I can generate prose for my scenes**.

**Acceptance Criteria:**

**Given** Scene generation backend is complete
**When** I create `src/components/SceneEditor.tsx`
**Then** The component displays:

- Scene outline input (Textarea)
- "Generate Prose" button
- Generation status display (Draft / Generating... / Complete / Error)
- Generated prose display area (read-only initially)

**And** Typing in the outline triggers auto-save (1 second debounce)

**And** Clicking "Generate Prose" calls `requestSceneGeneration` mutation

**And** Status updates reactively as generation progresses (useQuery watches scene.status)

**And** Generating state shows spinner + message "Generating scene prose..."

**And** Complete state shows generated prose

**And** Error state shows error message with "Retry" button

**Prerequisites:** Story 4.4, Story 2.6 (auto-save), Story 1.5 (Tailwind CSS)

**Technical Notes:**

- Reference: Architecture document UX Principles → Scene Generation Flow
- Use Convex `useMutation(api.scenes.requestSceneGeneration)`
- Use Convex `useQuery(api.scenes.getScene, { sceneId: currentSceneId })`
- Status badge colors: Draft (gray), Generating (blue pulse), Complete (green), Error (red)

---

### Story 4.6: Implement Accept/Regenerate/Edit Actions for Generated Prose

As a **writer**,
I want **to accept, regenerate, or manually edit generated prose**,
So that **I have full control over the final scene content**.

**Acceptance Criteria:**

**Given** Scene prose is generated
**When** I extend `SceneEditor` component with action buttons
**Then** Three buttons appear below generated prose:

- **Accept** button (green)
- **Regenerate** button (yellow)
- **Edit** button (blue)

**And** Clicking **Accept** marks the scene as final (status remains "complete", no further action needed for PoC)

**And** Clicking **Regenerate** calls `requestSceneGeneration` again with the same outline (increments regenerationCount)

**And** Clicking **Edit** makes the prose field editable (Textarea)

**And** In edit mode, "Save" button appears to save manual changes

**And** Saving edited prose calls `updateScene` mutation with the new prose

**Prerequisites:** Story 4.5

**Technical Notes:**

- Reference: Architecture document FR-5 (Scene Generation Workflow)
- Accept action: No backend change needed (just visual confirmation)
- Regenerate: Triggers full pipeline again
- Edit: Replaces read-only display with editable Textarea
- Track regenerationCount in database (incremented in mutation)

---

## Epic 5: Split-Screen Workspace & UX Polish

**Goal:** Deliver the complete writing experience with polished visual organization and interactions.

**Value:** Transforms functional features into a professional, delightful tool that writers love to use.

---

### Story 5.1: Implement Split-Screen Layout with Responsive Design

As a **writer**,
I want **a split-screen workspace with tree on the left and editor on the right**,
So that **I can see my story structure while working on individual scenes**.

**Acceptance Criteria:**

**Given** StoryTree and SceneEditor components exist
**When** I implement the layout in `src/App.tsx`
**Then** The layout displays:

- Left panel (30% width): StoryTree component
- Right panel (70% width): SceneEditor component
- Vertical divider between panels (fixed, no resize for PoC)

**And** Layout is responsive: collapses to single column on mobile (tree above, editor below)

**And** Desktop optimized: 1440px+ width looks best

**And** Both panels scroll independently (tree scrolls vertically, editor scrolls separately)

**Prerequisites:** Story 2.4 (StoryTree), Story 4.5 (SceneEditor)

**Technical Notes:**

- Reference: Architecture document UX Principles → Visual Design (split-screen)
- Use CSS Grid or Flexbox for layout
- Tailwind classes: `grid grid-cols-[30%_70%]` or similar
- Mobile: `flex flex-col` stack layout

---

### Story 5.2: Add Keyboard Shortcuts for Navigation

As a **writer**,
I want **keyboard shortcuts to navigate scenes quickly**,
So that **I can work efficiently without mouse clicks**.

**Acceptance Criteria:**

**Given** The split-screen workspace is implemented
**When** I add keyboard event listeners
**Then** The following shortcuts work:

- `↑` (Up Arrow): Navigate to previous scene
- `↓` (Down Arrow): Navigate to next scene
- `←` (Left Arrow): Collapse current chapter
- `→` (Right Arrow): Expand current chapter
- `Enter`: Focus on scene outline input

**And** Shortcuts are documented in a help tooltip or info icon

**And** Shortcuts work globally when no input is focused

**And** Shortcuts don't interfere with typing in inputs

**Prerequisites:** Story 5.1, Story 2.5 (navigation state)

**Technical Notes:**

- Reference: Architecture document UX Principles → Interaction Patterns (keyboard shortcuts)
- Use `useEffect` with `window.addEventListener('keydown')`
- Check if active element is an input (if so, ignore shortcuts)
- Update currentSceneId via Context when navigating

---

### Story 5.3: Implement Visual Status Indicators and Badges

As a **writer**,
I want **visual badges showing scene status in the tree**,
So that **I can see at a glance which scenes are draft, generating, complete, or have errors**.

**Acceptance Criteria:**

**Given** Scenes have status field (draft/generating/complete/error)
**When** I enhance StoryTree component with status badges
**Then** Each scene displays a colored badge:

- Draft: Gray badge with "Draft" text
- Generating: Blue pulsing badge with "Generating..." text
- Complete: Green badge with "✓ Complete" text
- Error: Red badge with "⚠ Error" text

**And** Generating badge has a CSS pulse animation

**And** Badges are small and unobtrusive (don't dominate the tree)

**And** Hovering over error badge shows error message in tooltip

**Prerequisites:** Story 5.1, Story 4.5 (scene status)

**Technical Notes:**

- Reference: Architecture document UX Principles → Real-time Status Indicators
- Use Tailwind color classes: `bg-gray-300` (draft), `bg-blue-500` (generating), `bg-green-500` (complete), `bg-red-500` (error)
- Pulse animation: Tailwind `animate-pulse` class
- Tooltip: shadcn/ui Tooltip component

---

### Story 5.4: Add GenerationStatus Component with Progress Feedback

As a **writer**,
I want **detailed progress feedback during scene generation**,
So that **I know the system is working and approximately how long to wait**.

**Acceptance Criteria:**

**Given** Scene generation is in progress
**When** I create `src/components/GenerationStatus.tsx`
**Then** The component displays:

- Current stage: "Character Agent analyzing..." or "Scene Writer generating prose..."
- Spinner/loading animation
- Estimated time remaining: "~5-10 seconds"
- Cancel button (future enhancement - for PoC just show progress)

**And** Component is shown in the SceneEditor when status="generating"

**And** Component updates reactively based on scene.status

**And** When complete, component disappears and prose is shown

**Prerequisites:** Story 4.5 (SceneEditor)

**Technical Notes:**

- Reference: Architecture document UX Principles → Scene Generation Flow (waiting state)
- For PoC: Show generic "Generating..." message (detailed stage tracking deferred)
- Use shadcn/ui Spinner or custom CSS spinner
- Position: Center of editor panel during generation

---

### Story 5.5: Polish Visual Design with Tailwind Styling

As a **writer**,
I want **a clean, professional visual design**,
So that **the tool feels polished and trustworthy**.

**Acceptance Criteria:**

**Given** All components are functionally complete
**When** I apply comprehensive Tailwind styling
**Then** The application has:

- Consistent color palette (neutral base: white/light gray, accent color for actions)
- Readable typography (serif for prose, sans-serif for UI)
- Generous whitespace and padding
- Smooth transitions on hover states
- Professional appearance (writing studio vibe, not toy-like)
- Subtle shadows for depth (cards, panels)

**And** Tree items have clear hover states (background change)

**And** Buttons have hover and active states

**And** Inputs have focus states (border highlight)

**And** Overall design feels cohesive and intentional

**Prerequisites:** Story 5.1, Story 5.2, Story 5.3, Story 5.4

**Technical Notes:**

- Reference: Architecture document UX Principles → Visual Design
- Use Tailwind config to define custom color palette
- Typography: Use font-serif for prose display, font-sans for UI
- Spacing: Tailwind spacing scale (p-4, m-6, etc.)
- Shadows: `shadow-sm`, `shadow-md` for elevation

---

## Implementation Summary

### Epic & Story Totals

| Epic                               | Stories | Focus                        |
| ---------------------------------- | ------- | ---------------------------- |
| Epic 1: Project Foundation         | 5       | Infrastructure setup         |
| Epic 2: Story Structure Management | 6       | Hierarchical organization    |
| Epic 3: Character System           | 3       | Character definition         |
| Epic 4: AI Scene Generation        | 6       | Multi-agent prose generation |
| Epic 5: Workspace & UX Polish      | 5       | Complete writing experience  |
| **TOTAL**                          | **26**  | **Complete PoC**             |

### PoC Success Milestone

**After completing all 26 stories**, the Narrative Canvas Platform will:

✅ Enable writers to create stories with 24-chapter structure
✅ Visualize entire story tree with spatial awareness
✅ Define characters with traits for AI guidance
✅ Generate prose for 10 scenes using multi-agent pipeline (Character Agent → Scene Writer)
✅ Maintain consistent character voice across scenes
✅ Provide Accept/Regenerate/Edit control over generated prose
✅ Deliver split-screen workspace with professional UX

**PoC Success Criteria Met:** Generate prose for 10 scenes without losing track of the plot! 🎉

### Sequencing & Dependencies

**Epic Order:** 1 → 2 → 3 → 4 → 5 (strict sequence for dependencies)

**Critical Path Stories:**

- Story 1.1 → 1.2 → 2.1 → 2.2 → 2.3 → 3.1 → 4.1 → 4.2 → 4.3 → 4.4 → 4.5 (Core generation pipeline)

**Parallel Development Opportunities:**

- Stories 1.4, 1.5 can be done in parallel with 1.3
- Stories 2.4, 2.5, 2.6 can be done in parallel after 2.3
- Stories 3.2, 3.3 can follow 3.1 quickly
- Stories 5.2, 5.3, 5.4 can be done in parallel after 5.1

### Story Sizing Validation

All stories are sized for **single dev agent completion** in one focused session:

- ✅ Vertically sliced (deliver complete functionality)
- ✅ Clear acceptance criteria (BDD format)
- ✅ No forward dependencies (only prerequisites on earlier stories)
- ✅ Independently valuable when possible
- ✅ References to Architecture document for implementation guidance

### Next Steps

1. **Review this epic breakdown** - Ensure all stories make sense and cover PRD requirements
2. **Prioritize for sprint planning** - Use `/bmad:bmm:workflows:sprint-planning` to organize into sprints
3. **Begin implementation** - Start with Story 1.1 (Initialize Convex + React Project)

---

_For implementation: Use the `create-story` workflow to generate detailed implementation plans from individual stories in this breakdown._

_Epic breakdown generated by BMAD Method Epic & Story Decomposition Workflow_  
_Date: 2025-11-14_  
_For: knosso - Narrative Canvas Platform_
