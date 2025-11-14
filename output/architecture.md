# Narrative Canvas Platform - Architecture

**Date:** 2025-11-14  
**Author:** knosso  
**Version:** 1.0

---

## Executive Summary

Narrative Canvas Platform is an AI-powered story generation engine built as a web application using **React + TypeScript + Convex backend**. The architecture is designed around **real-time reactivity**, **async multi-agent orchestration**, and **hierarchical data management** to enable storytellers to generate 100+ scenes without losing narrative coherence.

**Core Architectural Pattern:** Convex Scheduler Pattern

- Frontend triggers mutation (non-blocking)
- Mutation schedules Action for async execution
- Action orchestrates multi-agent LLM pipeline
- Frontend useQuery reactively displays results

This architecture ensures UI responsiveness while handling long-running AI generation tasks (5-10 seconds per scene).

---

## Project Initialization

**First implementation story should execute:**

```bash
npm create convex@latest narrative-canvas
```

**Interactive prompts will ask:**

- Project name: `narrative-canvas` (or `.` for current directory)
- Client framework: Select **React (Vite)**
- TypeScript: **Yes**
- Authentication: **None** (defer to post-PoC)

**This establishes the base architecture with these decisions:**

- ✅ Vite for fast HMR and development
- ✅ TypeScript for end-to-end type safety
- ✅ Convex client setup (useQuery, useMutation hooks)
- ✅ Project structure: `convex/` for backend, `src/` for frontend
- ✅ Development environment: `npm run dev` (Vite) + `npx convex dev` (backend)

---

## Decision Summary

| Category               | Decision                                   | Version       | Affects Epics    | Rationale                                                                                          |
| ---------------------- | ------------------------------------------ | ------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| **Starter Template**   | npm create convex@latest                   | Latest (2025) | All epics        | Official Convex starter with Vite + React + TypeScript; lightweight foundation for custom features |
| **Frontend Framework** | React                                      | 19.2+         | All UI epics     | Latest stable version; Provided by starter; React ecosystem + Convex hooks for reactivity          |
| **Build Tool**         | Vite                                       | 7.2+          | All epics        | Latest stable version; Provided by starter; fast HMR for rapid iteration                           |
| **Language**           | TypeScript                                 | 5.9+          | All epics        | Latest stable version; Provided by starter; end-to-end type safety between frontend/backend        |
| **Backend**            | Convex                                     | Latest        | All epics        | Real-time database + serverless functions; scheduler pattern for async AI calls                    |
| **AI Provider**        | OpenRouter API                             | Latest        | Scene generation | Unified LLM API; primary model: Claude 3.5 Sonnet                                                  |
| **Database**           | Convex Tables                              | N/A           | All data epics   | Built-in relational tables with real-time reactivity                                               |
| **State Management**   | Convex Hooks + React Context               | N/A           | All UI epics     | Convex for data state, React Context for UI state (current scene, tree collapsed)                  |
| **Styling**            | Tailwind CSS                               | 4.0+          | All UI epics     | Utility-first CSS; rapid UI iteration for split-screen layout                                      |
| **Component Library**  | shadcn/ui                                  | Latest        | All UI epics     | Accessible copy-paste components with Tailwind; customizable for tree navigation                   |
| **Date Format**        | Unix timestamp (number)                    | N/A           | All epics        | Store as Date.now(), format with date-fns for display                                              |
| **Error Handling**     | Try-catch with status field                | N/A           | Scene generation | Save scene.status="error" + errorMessage for user-friendly retry                                   |
| **Logging**            | Structured console.log                     | N/A           | All epics        | Development logging; structured format for debugging multi-agent pipeline                          |
| **Scheduler Timing**   | Immediate (0ms)                            | N/A           | Scene generation | Fast user feedback; no auto-retry (user-initiated only)                                            |
| **Data Format**        | TOON (Character Agent)                     | N/A           | Scene generation | ~60% fewer tokens than JSON; parseable key:value format                                            |
| **Testing**            | Vitest (deferred)                          | Latest        | All epics        | Deferred to post-PoC; co-located test files when implemented                                       |
| **Deployment**         | Vercel (frontend) + Convex Cloud (backend) | Latest        | All epics        | Free tier sufficient for PoC; Vercel for static hosting, Convex for serverless backend             |

---

## Project Structure

```
narrative-canvas/
├── convex/
│   ├── schema.ts                    # Database schema definitions
│   ├── stories.ts                   # Story mutations and queries
│   ├── chapters.ts                  # Chapter mutations and queries
│   ├── scenes.ts                    # Scene mutations and queries
│   ├── characters.ts                # Character mutations and queries
│   ├── actions/
│   │   ├── generateScene.ts         # Multi-agent scene generation action
│   │   └── openrouter.ts            # OpenRouter API integration helper
│   ├── convex.config.ts             # Convex configuration
│   └── _generated/                  # Auto-generated types
│
├── src/
│   ├── main.tsx                     # React entry point + ConvexProvider
│   ├── App.tsx                      # Root component with layout
│   ├── components/
│   │   ├── StoryTree.tsx            # Left panel: hierarchical story tree
│   │   ├── SceneEditor.tsx          # Right panel: scene outline + prose
│   │   ├── GenerationStatus.tsx     # Real-time status indicator
│   │   ├── CharacterManager.tsx     # Character CRUD interface
│   │   └── ui/                      # Reusable UI components (Button, Input, etc.)
│   ├── hooks/
│   │   └── useCurrentScene.ts       # Custom hook for scene navigation state
│   ├── lib/
│   │   └── utils.ts                 # Utility functions
│   ├── types/
│   │   └── index.ts                 # Shared TypeScript types
│   └── styles/
│       └── index.css                # Global styles + Tailwind imports
│
├── public/                          # Static assets
├── .env.local                       # Environment variables (CONVEX_URL)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## Technology Stack Details

### Core Technologies

**Frontend:**

- **React 18+**: Component-based UI
- **TypeScript 5+**: Static typing
- **Vite 5+**: Fast development server with HMR
- **Convex React Client**: Real-time hooks (useQuery, useMutation, useAction)

**Backend:**

- **Convex**: Serverless backend-as-a-service
  - **Tables**: Relational database with real-time sync
  - **Mutations**: User-initiated writes (synchronous)
  - **Actions**: Async operations (LLM calls, external APIs)
  - **Queries**: Real-time data reads with automatic reactivity
  - **Scheduler**: Schedule Actions to run after mutations (non-blocking pattern)

**AI Integration:**

- **OpenRouter API**: Unified LLM access
  - Primary model: `anthropic/claude-3.5-sonnet`
  - Cost: $3 input / $15 output per million tokens
  - API key stored in Convex environment variables

**Deployment:**

- **Vercel**: Frontend hosting (free tier)
- **Convex Cloud**: Backend hosting (free tier: 1M function calls/month)

### Integration Points

**Frontend ↔ Convex Backend:**

- WebSocket connection for real-time updates
- Convex hooks automatically subscribe to data changes
- No manual polling required

**Convex Actions ↔ OpenRouter API:**

- HTTPS requests from Convex Actions (server-side only)
- Bearer token authentication
- Retry logic with exponential backoff

---

## Data Architecture

### Database Schema

**Convex Tables (convex/schema.ts):**

```typescript
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    createdAt: v.number(),
  }),

  chapters: defineTable({
    storyId: v.id('stories'),
    chapterNumber: v.number(),
    title: v.string(),
  }).index('by_story', ['storyId']),

  scenes: defineTable({
    storyId: v.id('stories'),
    chapterId: v.id('chapters'),
    sceneNumber: v.number(),
    outline: v.string(),
    prose: v.optional(v.string()),
    status: v.union(v.literal('draft'), v.literal('generating'), v.literal('complete'), v.literal('error')),
    errorMessage: v.optional(v.string()),
    regenerationCount: v.number(),
  })
    .index('by_story', ['storyId'])
    .index('by_chapter', ['chapterId']),

  characters: defineTable({
    storyId: v.id('stories'),
    name: v.string(),
    traits: v.string(),
    backstory: v.optional(v.string()),
  }).index('by_story', ['storyId']),
});
```

**Relationships:**

- Story → has many Chapters
- Story → has many Characters
- Chapter → has many Scenes
- Scene → belongs to Story and Chapter

**Indexes:**

- `by_story`: Fast queries for all chapters/scenes/characters in a story
- `by_chapter`: Fast queries for all scenes in a chapter

---

## API Contracts

### Mutations (User-Initiated Writes)

**Create Story:**

```typescript
// convex/stories.ts
export const createStory = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const storyId = await ctx.db.insert('stories', {
      title: args.title,
      createdAt: Date.now(),
    });

    // Create default 24 chapters
    for (let i = 1; i <= 24; i++) {
      await ctx.db.insert('chapters', {
        storyId,
        chapterNumber: i,
        title: `Chapter ${i}`,
      });
    }

    return storyId;
  },
});
```

**Request Scene Generation (Scheduler Pattern):**

```typescript
// convex/scenes.ts
export const requestSceneGeneration = mutation({
  args: { sceneId: v.id('scenes'), outline: v.string() },
  handler: async (ctx, args) => {
    // 1. Update scene with outline and set status
    await ctx.db.patch(args.sceneId, {
      outline: args.outline,
      status: 'generating',
    });

    // 2. Schedule async Action (non-blocking)
    await ctx.scheduler.runAfter(0, internal.actions.generateScene, {
      sceneId: args.sceneId,
    });

    // 3. Return immediately (UI doesn't wait)
    return { success: true };
  },
});
```

### Actions (Async Operations)

**Generate Scene (Multi-Agent Pipeline):**

```typescript
// convex/actions/generateScene.ts
export const generateScene = internalAction({
  args: { sceneId: v.id('scenes') },
  handler: async (ctx, args) => {
    try {
      // 1. Load scene data
      const scene = await ctx.runQuery(internal.scenes.getScene, {
        sceneId: args.sceneId,
      });

      // 2. Load characters for this story
      const characters = await ctx.runQuery(internal.characters.getCharacters, {
        storyId: scene.storyId,
      });

      // 3. Call Character Agent
      const characterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'system',
              content: 'You are a Character Agent. Generate character perspective, emotional state, and voice guidance.',
            },
            {
              role: 'user',
              content: `Scene outline: ${scene.outline}\n\nCharacters: ${JSON.stringify(characters)}`,
            },
          ],
        }),
      });

      const characterData = await characterResponse.json();

      // 4. Call Scene Writer Agent
      const sceneResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            {
              role: 'system',
              content: 'You are a Scene Writer Agent. Generate narrative prose (300-500 words).',
            },
            {
              role: 'user',
              content: `Scene outline: ${scene.outline}\n\nCharacter guidance: ${characterData.choices[0].message.content}`,
            },
          ],
        }),
      });

      const sceneData = await sceneResponse.json();
      const prose = sceneData.choices[0].message.content;

      // 5. Save prose and mark complete
      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        prose,
        status: 'complete',
      });
    } catch (error) {
      // Error handling
      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        status: 'error',
        errorMessage: error.message,
      });
    }
  },
});
```

### Queries (Real-Time Data Reads)

**Get Story with Chapters and Scenes:**

```typescript
// convex/stories.ts
export const getStoryTree = query({
  args: { storyId: v.id('stories') },
  handler: async (ctx, args) => {
    const story = await ctx.db.get(args.storyId);

    const chapters = await ctx.db
      .query('chapters')
      .withIndex('by_story', (q) => q.eq('storyId', args.storyId))
      .order('asc')
      .collect();

    const chaptersWithScenes = await Promise.all(
      chapters.map(async (chapter) => {
        const scenes = await ctx.db
          .query('scenes')
          .withIndex('by_chapter', (q) => q.eq('chapterId', chapter._id))
          .order('asc')
          .collect();

        return { ...chapter, scenes };
      }),
    );

    return { story, chapters: chaptersWithScenes };
  },
});
```

---

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents working on this project:

### Naming Conventions

**Database Fields (Convex Schema):**

- Use `camelCase` for all field names
- Examples: `sceneNumber`, `chapterTitle`, `createdAt`, `errorMessage`
- Never use `snake_case` (SQL-style)

**Component Files:**

- Use `PascalCase.tsx` for React components
- Examples: `StoryTree.tsx`, `SceneEditor.tsx`, `GenerationStatus.tsx`
- Never use `kebab-case.tsx` (Vue-style)

**Functions (mutations/actions/queries):**

- Use `camelCase` for all function names
- Examples: `requestSceneGeneration`, `getStoryTree`, `createCharacter`
- Never use `snake_case` (Python-style)

**Convex File Organization:**

- Group by entity: `stories.ts`, `scenes.ts`, `characters.ts`
- Never group by type (`mutations.ts`, `queries.ts`, `actions.ts`)
- Complex operations go in `actions/` subfolder

### Error Handling Pattern

**In Convex Actions (AI Generation):**

```typescript
export const generateScene = internalAction({
  args: { sceneId: v.id('scenes') },
  handler: async (ctx, args) => {
    try {
      // 1. Load data
      const scene = await ctx.runQuery(internal.scenes.getScene, { sceneId: args.sceneId });

      // 2. Call OpenRouter API
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        // ... config
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      // 3. Process and save
      const data = await response.json();
      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        prose: data.choices[0].message.content,
        status: 'complete',
      });
    } catch (error) {
      // Always catch and save error state
      console.error('[SCENE_GEN] Error:', error);

      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        status: 'error',
        errorMessage: error.message || 'Unknown error occurred',
      });
    }
  },
});
```

**Error Message Format:**

- User-friendly messages (not technical jargon)
- Examples:
  - ✅ "Rate limit reached - please wait 30 seconds and retry"
  - ✅ "Scene outline is too short - please provide more detail"
  - ❌ "HTTP 429 TOO_MANY_REQUESTS"
  - ❌ "Validation error: outline.length < 10"

**In Convex Mutations (Validation):**

```typescript
export const createScene = mutation({
  args: { chapterId: v.id('chapters'), outline: v.string() },
  handler: async (ctx, args) => {
    // Validate input
    if (args.outline.length < 1) {
      throw new Error('Scene outline cannot be empty');
    }
    if (args.outline.length > 2000) {
      throw new Error('Scene outline too long (max 2000 characters)');
    }

    // Create scene
    return await ctx.db.insert('scenes', {
      chapterId: args.chapterId,
      outline: args.outline,
      status: 'draft',
      regenerationCount: 0,
    });
  },
});
```

### Logging Pattern

**Structured Console Logs:**

```typescript
// In Actions - track multi-agent pipeline
console.log('[SCENE_GEN]', {
  sceneId: 'abc123',
  stage: 'CHARACTER_AGENT_START',
  timestamp: Date.now(),
});

console.log('[SCENE_GEN]', {
  sceneId: 'abc123',
  stage: 'CHARACTER_AGENT_COMPLETE',
  timestamp: Date.now(),
  tokensUsed: 1234,
  durationMs: 2500,
});

console.log('[SCENE_GEN]', {
  sceneId: 'abc123',
  stage: 'SCENE_WRITER_START',
  timestamp: Date.now(),
});

console.log('[SCENE_GEN]', {
  sceneId: 'abc123',
  stage: 'SCENE_WRITER_COMPLETE',
  timestamp: Date.now(),
  tokensUsed: 3456,
  durationMs: 4200,
});
```

**Log Stages:**

- `CHARACTER_AGENT_START` / `CHARACTER_AGENT_COMPLETE`
- `SCENE_WRITER_START` / `SCENE_WRITER_COMPLETE`
- `ERROR` (with error details)

### Scheduler Pattern

**Always use immediate scheduling (0ms):**

```typescript
// In mutation
await ctx.scheduler.runAfter(0, internal.actions.generateScene, {
  sceneId: args.sceneId,
});
```

**Never auto-retry in Actions:**

- Let user click "Retry" button
- Preserves user control
- Allows outline editing before retry

### TOON Data Format Pattern

**Character Agent System Prompt:**

```
You are a Character Agent. Analyze the scene and characters, then return your analysis in TOON format.

TOON format rules:
- One key:value pair per line
- No JSON braces or quotes
- Use pipe | for multiple values
- Keep keys short and consistent

Required fields:
- emotional: Character's emotional state
- pov: Point of view (first-limited, third-omni, etc.)
- voice: Voice characteristics
- physical: Physical reactions/body language

Example:
emotional:anxious|hopeful
pov:first-limited
voice:short-sentences|internal-heavy
physical:fidgeting|eye-contact-avoid
```

**Parsing TOON in Action:**

```typescript
// convex/lib/parseToon.ts
export function parseToon(toon: string): Record<string, string> {
  return Object.fromEntries(
    toon
      .split('\n')
      .filter((line) => line.includes(':'))
      .map((line) => {
        const [key, value] = line.split(':');
        return [key.trim(), value.trim()];
      }),
  );
}

// Usage in generateScene action
const characterData = await characterResponse.json();
const characterGuidance = parseToon(characterData.choices[0].message.content);

console.log('[SCENE_GEN] Character guidance:', {
  emotional: characterGuidance.emotional,
  pov: characterGuidance.pov,
  voice: characterGuidance.voice,
});
```

### State Management Pattern

**Data State (Convex):**

- All persistent data goes in Convex tables
- Use `useQuery` for reactive reads
- Use `useMutation` for writes
- Never store data state in React local state

**UI State (React Context):**

```typescript
// src/hooks/useCurrentScene.ts
import { createContext, useContext, useState } from 'react';
import { Id } from '../convex/_generated/dataModel';

type CurrentSceneContextType = {
  currentSceneId: Id<"scenes"> | null;
  setCurrentSceneId: (id: Id<"scenes"> | null) => void;
  treeCollapsed: Record<string, boolean>;
  toggleChapter: (chapterId: string) => void;
};

const CurrentSceneContext = createContext<CurrentSceneContextType | undefined>(undefined);

export function CurrentSceneProvider({ children }) {
  const [currentSceneId, setCurrentSceneId] = useState<Id<"scenes"> | null>(null);
  const [treeCollapsed, setTreeCollapsed] = useState<Record<string, boolean>>({});

  const toggleChapter = (chapterId: string) => {
    setTreeCollapsed(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  return (
    <CurrentSceneContext.Provider value={{
      currentSceneId,
      setCurrentSceneId,
      treeCollapsed,
      toggleChapter
    }}>
      {children}
    </CurrentSceneContext.Provider>
  );
}

export function useCurrentScene() {
  const context = useContext(CurrentSceneContext);
  if (!context) {
    throw new Error('useCurrentScene must be used within CurrentSceneProvider');
  }
  return context;
}
```

**Usage in Components:**

```typescript
// In StoryTree component
const { currentSceneId, setCurrentSceneId } = useCurrentScene();

// In SceneEditor component
const { currentSceneId } = useCurrentScene();
const scene = useQuery(api.scenes.getScene, { sceneId: currentSceneId });
```

### Date/Time Pattern

**Storage (Convex Schema):**

```typescript
createdAt: v.number(),  // Unix timestamp from Date.now()
```

**Display (React Components):**

```typescript
import { formatDistanceToNow } from 'date-fns';

// Relative time
<span>{formatDistanceToNow(scene.createdAt, { addSuffix: true })}</span>
// "2 minutes ago"

// Formatted date
import { format } from 'date-fns';
<span>{format(story.createdAt, 'MMM dd, yyyy')}</span>
// "Nov 14, 2025"
```

### Validation Pattern

**Input Limits (enforce in mutations):**

```typescript
// Scene outline
if (outline.length < 1) throw new Error('Scene outline cannot be empty');
if (outline.length > 2000) throw new Error('Scene outline too long (max 2000 characters)');

// Titles and names
if (title.length < 1) throw new Error('Title cannot be empty');
if (title.length > 200) throw new Error('Title too long (max 200 characters)');

// Character traits
if (traits.length > 1000) throw new Error('Traits too long (max 1000 characters)');
```

**Always throw errors for validation failures - Convex handles them gracefully**

### File Organization Pattern

**Convex Backend:**

```
convex/
├── schema.ts                  # All table definitions
├── stories.ts                 # Story mutations + queries
├── chapters.ts                # Chapter mutations + queries
├── scenes.ts                  # Scene mutations + queries
├── characters.ts              # Character mutations + queries
├── actions/
│   ├── generateScene.ts       # Complex multi-agent action
│   └── openrouter.ts          # API helpers
└── lib/
    ├── parseToon.ts           # TOON parser utility
    └── utils.ts               # Shared utilities
```

**Frontend:**

```
src/
├── components/
│   ├── StoryTree.tsx          # Major features as separate files
│   ├── SceneEditor.tsx
│   └── ui/                    # shadcn/ui components
│       ├── button.tsx
│       └── input.tsx
├── hooks/
│   └── useCurrentScene.ts     # Custom hooks
├── lib/
│   └── utils.ts               # Frontend utilities
└── types/
    └── index.ts               # Shared TypeScript types
```

### Component Installation Pattern

**Install shadcn/ui components as needed:**

```bash
# Install Tailwind + shadcn/ui
npx shadcn@latest init

# Add specific components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
```

**Customize in `src/components/ui/` after installation**

---

## Consistency Rules

### API Response Format

**Mutations return direct values:**

```typescript
// ✅ Correct
return storyId;

// ❌ Wrong
return { success: true, data: storyId };
```

**Convex automatically handles errors - no wrapper needed**

### OpenRouter API Integration

**Always call from Convex Actions (server-side only):**

```typescript
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://narrative-canvas.app",  // Optional
    "X-Title": "Narrative Canvas Platform",           // Optional
  },
  body: JSON.stringify({
    model: "anthropic/claude-3.5-sonnet",
    messages: [...],
  }),
});
```

**Never expose API key to frontend**

### Character Agent → Scene Writer Pipeline

**Always execute in this order:**

1. Load scene data + characters
2. Call Character Agent (returns TOON)
3. Parse TOON output
4. Call Scene Writer Agent (uses character guidance)
5. Save prose + mark complete

**Both agents use same model:** `anthropic/claude-3.5-sonnet`

### Testing Strategy (Post-PoC)

**When adding tests:**

- Use Vitest (Vite-native, fast)
- Co-locate test files: `parseToon.test.ts` next to `parseToon.ts`
- Test priority:
  1. Utility functions (TOON parser, validation)
  2. Convex mutations (with mocked context)
  3. React components (with mocked Convex hooks)

**For PoC:** Manual testing only - defer automated tests

### Environment Variables

**Convex Dashboard (Settings → Environment Variables):**

- `OPENROUTER_API_KEY` - Your OpenRouter API key

**Frontend (.env.local):**

- `VITE_CONVEX_URL` - Auto-generated by `npx convex dev`

**Never commit .env.local to git**

---

## Security Architecture

**API Key Protection:**

- OpenRouter API key stored in Convex environment variables
- Never exposed to frontend code
- All LLM calls made server-side via Convex Actions

**Data Privacy (PoC):**

- Single-user application (no authentication in PoC)
- All data stored in Convex cloud
- Post-PoC: Add Convex Auth or Clerk for multi-user support

---

## Performance Considerations

**Scene Generation Speed:**

- Target: 5-10 seconds per scene
- Character Agent: 2-3 seconds
- Scene Writer Agent: 3-5 seconds
- Async pattern prevents UI blocking

**UI Responsiveness:**

- Tree rendering: < 500ms for 100 scenes
- Scene navigation: < 200ms
- Status updates: < 500ms via reactive queries

**Convex Query Optimization:**

- Index on `storyId` and `chapterId` for fast lookups
- Limit tree queries to current story only

---

## Deployment Architecture

**Frontend (Vercel):**

- Static site deployment from `npm run build`
- Automatic deployments on git push
- Environment variable: `VITE_CONVEX_URL`

**Backend (Convex Cloud):**

- Automatic deployment via `npx convex deploy`
- Environment variable: `OPENROUTER_API_KEY`
- Free tier: 1M function calls/month

**Development Environment:**

- Run simultaneously:
  - `npm run dev` (Vite dev server on localhost:5173)
  - `npx convex dev` (Convex backend with hot reload)

---

## Development Environment

### Prerequisites

- **Node.js**: 18+ (LTS recommended)
- **npm**: 9+ (or yarn/pnpm)
- **Git**: For version control
- **Convex Account**: Create at convex.dev (free tier)
- **OpenRouter Account**: Get API key at openrouter.ai

### Setup Commands

```bash
# 1. Initialize project with Convex starter
npm create convex@latest narrative-canvas
cd narrative-canvas

# 2. Install dependencies (if not auto-installed)
npm install

# 3. Set up Convex (will prompt for login)
npx convex dev

# 4. Add environment variable for OpenRouter
# In Convex dashboard: Settings → Environment Variables
# Add: OPENROUTER_API_KEY = <your-key>

# 5. Run development servers (in separate terminals)
npm run dev          # Vite frontend (localhost:5173)
npx convex dev       # Convex backend (with hot reload)
```

---

## Architecture Decision Records (ADRs)

### ADR-001: Use Convex Scheduler Pattern for AI Generation

**Decision:** Use Convex mutation + scheduler + action pattern instead of direct API calls from frontend.

**Rationale:**

- Long-running LLM calls (5-10 seconds) would block UI if called directly
- Scheduler pattern allows mutation to return immediately
- Action executes asynchronously without blocking user interaction
- Frontend useQuery automatically updates when prose is ready

**Alternatives Considered:**

- Direct frontend fetch to OpenRouter (rejected: exposes API key, blocks UI)
- WebSocket streaming (deferred: adds complexity, not needed for PoC)

### ADR-002: Use OpenRouter Instead of Direct Claude API

**Decision:** Use OpenRouter unified API instead of direct Anthropic Claude API.

**Rationale:**

- Flexibility to switch models (Claude, GPT-4, Gemini) without code changes
- Cost optimization potential (route to cheaper models for simple tasks)
- Single API interface for multi-model support
- OpenRouter handles rate limiting and retries

**Trade-offs:**

- Additional service dependency
- Slightly higher cost ($3/$15 vs $3/$15 for Claude direct)
- Minimal overhead for PoC

### ADR-003: No Authentication in PoC

**Decision:** Defer authentication to post-PoC phase.

**Rationale:**

- Single-user PoC doesn't require auth
- Focus on core scene generation workflow
- Can add Convex Auth or Clerk later without major refactoring

**Future:** Add authentication before sharing with other users.

### ADR-004: Use TOON Format for Character Agent Output

**Decision:** Use TOON (Terse Object Notation) instead of JSON for Character Agent responses.

**Rationale:**

- ~60% fewer tokens than JSON (significant cost savings)
- Still structured and parseable
- Simple key:value format easy to extend
- Example savings: JSON ~150 tokens → TOON ~60 tokens per scene

**Cost Impact:** For 100 scenes with 3 regenerations each = 300 character agent calls

- JSON: ~45,000 tokens → ~$0.14
- TOON: ~18,000 tokens → ~$0.05
- Savings: $0.09 (64% reduction)

**Trade-offs:**

- Custom parser needed (simple 10-line function)
- Less standardized than JSON
- Worth it for token efficiency at scale

### ADR-005: Use Tailwind CSS + shadcn/ui

**Decision:** Use Tailwind CSS for styling and shadcn/ui for component primitives.

**Rationale:**

- Tailwind: Rapid UI iteration for split-screen layout
- shadcn/ui: Copy-paste components (not npm dependency)
- Full customization control for tree navigation
- Accessible components out of the box
- No bloat from unused components

**Alternatives Considered:**

- Plain CSS (rejected: slower development)
- Material-UI (rejected: opinionated design, harder to customize)
- Chakra UI (rejected: runtime cost, bundle size)

### ADR-006: Immediate Scheduling with No Auto-Retry

**Decision:** Schedule Actions immediately (0ms) with no automatic retry logic.

**Rationale:**

- Immediate scheduling: Fast user feedback for PoC
- No auto-retry: Preserves user control and allows outline editing before retry
- User-initiated retry gives better UX (user can fix outline if needed)
- Simplifies error handling logic

**Future:** Consider auto-retry with exponential backoff if rate limiting becomes frequent.

### ADR-007: React Context for UI State

**Decision:** Use React Context for UI state (current scene, tree collapsed) instead of putting everything in Convex.

**Rationale:**

- UI state doesn't need persistence (tree collapse state, current selection)
- Reduces unnecessary database writes
- Faster UI responsiveness (no round-trip to server)
- Clear separation: Data state in Convex, UI state in React

**Pattern:**

- Convex: Stories, scenes, characters, prose, generation status
- React Context: currentSceneId, treeCollapsed, editor mode

### ADR-008: Defer Testing to Post-PoC

**Decision:** No automated tests in PoC phase; manual testing only.

**Rationale:**

- PoC goal: Validate scene generation workflow, not production readiness
- Manual testing sufficient for single-user PoC
- Faster iteration without test maintenance
- Architecture designed to be testable (Vitest + co-located tests when ready)

**Future:** Add tests before multi-user release:

1. Unit tests for parseToon, validation
2. Integration tests for Convex mutations
3. E2E tests for scene generation flow

---

_Generated by BMAD Decision Architecture Workflow v1.3_  
_Date: 2025-11-14_  
_For: knosso_
