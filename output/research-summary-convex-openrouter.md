# Research Summary: Convex + OpenRouter

**Date:** 2025-11-14  
**Project:** Alpha - Narrative Canvas Platform  
**Phase:** Research → Implementation Planning

---

## CONVEX RESEARCH FINDINGS

### 1. How Convex Actions Work

**What they are:**

- Server-side functions that can call third-party services (like OpenRouter API)
- Access database **indirectly** via `ctx.runQuery()` and `ctx.runMutation()`
- Have **10-minute timeout** limit (plenty for LLM calls)
- Support up to **1,000 concurrent operations**

**When to use Actions:**

- Calling external APIs (perfect for OpenRouter)
- Long-running operations
- Side effects (email, payments, LLM generation)

**Best Practice Pattern:**

```
Client → Mutation (saves intent to DB) → Scheduler → Action (calls API)
```

**Why this pattern:**

- Prevents duplicate execution
- Enforces business logic
- Mutation guarantees execution if it succeeds
- Action runs asynchronously (no UI blocking)

---

### 2. Scheduler Pattern (Mutation → Action)

**How it works:**

```typescript
// In mutation
export const requestSceneGeneration = mutation({
  handler: async (ctx, args) => {
    // 1. Save scene outline to DB
    const sceneId = await ctx.db.insert('scenes', {
      outline: args.outline,
      status: 'generating',
    });

    // 2. Schedule Action immediately (delay = 0)
    await ctx.scheduler.runAfter(0, internal.actions.generateScene, {
      sceneId,
    });

    return sceneId;
  },
});
```

**Key Methods:**

- `ctx.scheduler.runAfter(milliseconds, functionRef, args)` - Schedule after delay
- `ctx.scheduler.runAt(timestamp, functionRef, args)` - Schedule at specific time

**Guarantees:**

- **Mutation scheduling is atomic** - If mutation succeeds, scheduling is guaranteed
- **Action scheduling is not atomic** - If action fails, scheduled functions still run

**Retry Behavior:**

- **Mutations**: Executed **exactly once** (automatic retries for transient errors)
- **Actions**: Executed **at most once** (NO automatic retries - you must handle manually)

---

### 3. Calling External APIs from Actions

**Native support for fetch:**

```typescript
export const generateScene = action({
  handler: async (ctx, args) => {
    // Fetch works natively in Actions
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...})
    });

    const data = await response.json();

    // Save results via mutation
    await ctx.runMutation(internal.scenes.updateScene, {
      sceneId: args.sceneId,
      prose: data.choices[0].message.content
    });
  }
});
```

**For Node.js-specific features:**

- Add `"use node"` at top of file
- Must be in separate file from other Convex functions

---

### 4. Environment Variables (API Keys)

**How to set:**

- Via Dashboard: Convex dashboard → Settings → Environment Variables
- Via CLI: `npx convex env set OPENROUTER_API_KEY "your-key-here"`

**How to access:**

```typescript
const apiKey = process.env.OPENROUTER_API_KEY;
```

**Constraints:**

- Max 40 characters for variable names
- Max 8KB per value
- Up to 100 environment variables per deployment
- Different values for dev vs. prod deployments

**Best Practices:**

- Set variables in **all deployments** where functions run
- Never commit API keys to code
- Use different keys for dev/prod

---

### 5. Convex Table Schemas

**How to define:**

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    createdAt: v.number(),
  }),

  characters: defineTable({
    storyId: v.id('stories'), // Foreign key reference
    name: v.string(),
    traits: v.array(v.string()),
    backstory: v.optional(v.string()),
  }),

  scenes: defineTable({
    storyId: v.id('stories'),
    sceneNumber: v.number(),
    outline: v.string(),
    generatedProse: v.optional(v.string()),
    status: v.union(v.literal('draft'), v.literal('generating'), v.literal('complete')),
    regenerationCount: v.number(),
  }),
});
```

**Available data types:**

- `v.string()`, `v.number()`, `v.boolean()`
- `v.id("tableName")` - Foreign key reference
- `v.array(type)` - Array of values
- `v.object({...})` - Nested object
- `v.optional(type)` - Nullable field
- `v.union()` - Multiple possible types
- `v.literal()` - Constant value

**Auto-generated fields:**

- `_id` - Document ID
- `_creationTime` - Timestamp

**TypeScript integration:**

```typescript
import { Doc } from './_generated/dataModel';

const scene: Doc<'scenes'> = await ctx.db.get(sceneId);
```

---

### 6. Convex Free Tier Limits

**Storage:**

- Database: 0.5 GB
- File storage: 1 GB
- Vector storage: 0.5 GB

**Compute:**

- Function calls: **1,000,000/month** (plenty for PoC)
- Action compute: **20 GB-hours/month**
- Database bandwidth: 1 GB/month

**Concurrency:**

- Query/Mutation: 16 concurrent
- Action: 64 concurrent
- HTTP Action: 16 concurrent

**Cost after free tier:**

- Function calls: $2.20 per million
- Action compute: $0.33 per GB-hour
- Database storage: $0.22 per GB/month

**For PoC (3 scenes, testing):**

- Estimated function calls: < 1,000
- Estimated Action compute: < 1 GB-hour
- **Result: Well within free tier**

---

## OPENROUTER RESEARCH FINDINGS

### 1. How OpenRouter Works

**Unified API for 100+ models:**

- Single API endpoint for Claude, GPT-4, Gemini, DeepSeek, etc.
- Compatible with OpenAI SDK (drop-in replacement)
- One API key for all models

**Benefits:**

- Switch models without changing code
- Cost optimization (use cheaper models for simple tasks)
- Fallback strategies (try Claude, fallback to GPT-4o)
- Unified billing across providers

---

### 2. Available Models (Recommended for PoC)

**Claude 3.5 Sonnet (Recommended):**

- **Cost:** $3/million input tokens, $15/million output tokens
- **Best for:** Creative writing, character voice, narrative prose
- **Context window:** 200K tokens
- **Speed:** ~2-4 seconds per generation

**GPT-4o (Alternative):**

- **Cost:** $5/million input tokens, $20/million output tokens
- **Best for:** Structured output, fast responses
- **Context window:** 128K tokens
- **Speed:** ~1-2 seconds per generation

**Cost Comparison:**

- Claude 3.5 Sonnet is **40% cheaper** on input tokens
- Claude 3.5 Sonnet is **25% cheaper** on output tokens
- For creative writing: Claude is better quality + cheaper

---

### 3. OpenRouter API Authentication

**API Key:**

- Get from: https://openrouter.ai/keys
- Store in Convex environment variable: `OPENROUTER_API_KEY`

**Request format:**

```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://your-app.vercel.app', // Optional
    'X-Title': 'Narrative Canvas Platform', // Optional
  },
  body: JSON.stringify({
    model: 'anthropic/claude-3.5-sonnet', // Specify model
    messages: [
      {
        role: 'system',
        content: 'You are a character agent...',
      },
      {
        role: 'user',
        content: 'Generate character perspective for scene...',
      },
    ],
  }),
});

const data = await response.json();
const generatedText = data.choices[0].message.content;
```

---

### 4. Error Handling & Rate Limits

**Zero Completion Insurance:**

- Don't get charged for failed or empty responses
- Automatic protection

**Rate Limits:**

- Varies by model
- Handle with exponential backoff

**Error Handling Pattern:**

```typescript
export const generateScene = action({
  handler: async (ctx, args) => {
    try {
      const response = await fetch('...');

      if (!response.ok) {
        throw new Error(`OpenRouter error: ${response.status}`);
      }

      const data = await response.json();

      // Save success
      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        prose: data.choices[0].message.content,
        status: 'complete',
      });
    } catch (error) {
      // Save error state
      await ctx.runMutation(internal.scenes.updateScene, {
        sceneId: args.sceneId,
        status: 'error',
        error: error.message,
      });

      throw error; // Let caller know it failed
    }
  },
});
```

---

## COST ESTIMATION FOR POC

**Assumptions:**

- 3 scenes generated
- 3 regenerations per scene (testing)
- Total: 9 LLM generations

**Token usage per generation:**

- Character Agent: ~500 input, ~200 output
- Scene Writer Agent: ~800 input, ~300 output
- **Total per scene:** ~1,300 input, ~500 output

**Total for PoC:**

- Input tokens: 9 × 1,300 = 11,700 (~0.012 million)
- Output tokens: 9 × 500 = 4,500 (~0.0045 million)

**Cost with Claude 3.5 Sonnet:**

- Input: 0.012M × $3 = $0.036
- Output: 0.0045M × $15 = $0.0675
- **Total PoC cost: ~$0.10**

**Convex function calls:**

- 9 scene generations × ~10 function calls each = 90 calls
- Well under 1M/month free tier

**Result: Entire PoC costs less than $0.15**

---

## KEY TAKEAWAYS

### ✅ Convex is Perfect for This Use Case

1. **Scheduler pattern** solves async LLM calls elegantly
2. **Actions** designed specifically for external API calls
3. **Real-time reactivity** gives automatic UI updates
4. **Free tier** is more than enough for PoC
5. **TypeScript end-to-end** with type-safe schemas

### ✅ OpenRouter is the Right Choice

1. **Unified API** - One integration for multiple models
2. **Cost optimization** - Claude 3.5 Sonnet is cheapest + best quality
3. **Flexibility** - Easy to switch models or add fallbacks
4. **PoC cost** is negligible (~$0.10 total)

### ✅ Recommended Model: Claude 3.5 Sonnet

1. **Best for creative writing** (narrative prose, character voice)
2. **Cheaper than GPT-4o** (40% less on input, 25% less on output)
3. **200K context window** (room for character history)
4. **Proven quality** for story generation

---

## NEXT STEPS

1. ✅ Convex research complete
2. ✅ OpenRouter research complete
3. ⏭️ Competitive analysis (Scrivener, Sudowrite, NovelAI)
4. ⏭️ Create worldbuilding doc (schemas, prompts)
5. ⏭️ Set up Convex project + OpenRouter account

---

**Research Phase Progress: 50% Complete**
