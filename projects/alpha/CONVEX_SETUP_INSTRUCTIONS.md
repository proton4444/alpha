# Convex Setup Instructions

## Quick Start - Get Convex Running in 3 Steps

### Step 1: Initialize Convex Project

Open a new terminal and run:

```bash
cd /home/user/alpha/projects/alpha
npx convex dev
```

This will:

1. Prompt you to login to Convex (opens browser)
2. Create a new project or select existing one
3. Generate `convex.json` with your project URL
4. Deploy your schema and functions
5. Start watching for changes

### Step 2: Get Your Deployment URL

After `npx convex dev` completes, you'll see output like:

```
✔ Deployed successfully!
📡 Convex URL: https://happy-animal-123.convex.cloud
```

Copy that URL and create `.env.local`:

```bash
echo "VITE_CONVEX_URL=https://happy-animal-123.convex.cloud" > .env.local
```

### Step 3: Restart Your Dev Server

```bash
# Kill the current dev server (Ctrl+C)
npm run dev
```

Your app will now connect to real Convex backend!

---

## Alternative: Use Convex Deploy Key (CI/CD)

If you have a Convex deploy key, you can use it without interactive login:

### Get Deploy Key

1. Go to https://dashboard.convex.dev
2. Select your project
3. Go to Settings → Deploy Keys
4. Create a new deploy key
5. Copy the key

### Use Deploy Key

```bash
export CONVEX_DEPLOY_KEY="your-key-here"
npx convex deploy
```

### Set Environment Variable

```bash
# After deployment, set your URL
echo "VITE_CONVEX_URL=$(npx convex env get CONVEX_DEPLOYMENT_URL)" > .env.local
```

---

## Populate Initial Data

Once Convex is connected, you can add test data through the dashboard or via mutations:

### Via Convex Dashboard

1. Go to https://dashboard.convex.dev
2. Select your project
3. Go to "Data" tab
4. Click "+ Add Document" for each table:

**stories table:**

```json
{
  "title": "The Chronicles of Aethoria",
  "premise": "A fantasy epic about discovering ancient magic",
  "targetChapterCount": 24
}
```

**chapters table:**

```json
{
  "storyId": "<story-id-from-above>",
  "chapterNumber": 1,
  "title": "The Awakening"
}
```

**scenes table:**

```json
{
  "chapterId": "<chapter-id-from-above>",
  "sceneNumber": 1,
  "outline": "Marcus discovers a mysterious portal",
  "prose": null,
  "status": "draft",
  "regenerationCount": 0
}
```

### Via Code (Easier!)

Or use the Dev Tools button in the app to create test data through the UI!

---

## Switch Between Demo and Real Data

In `App.tsx`, you can toggle between:

```tsx
// Demo mode (mock data)
{
  useGraphicalCanvas ? <GraphicalCanvasDemo /> : <Workspace />;
}

// Real Convex data
{
  useGraphicalCanvas ? <GraphicalCanvas /> : <Workspace />;
}
```

---

## Troubleshooting

### Error: "Cannot find module 'convex/values'"

```bash
npm install convex@latest
```

### Error: "VITE_CONVEX_URL not set"

Create `.env.local` with your Convex URL:

```bash
echo "VITE_CONVEX_URL=https://your-deployment.convex.cloud" > .env.local
```

### Error: "Failed to fetch"

1. Check Convex dev is running (`npx convex dev`)
2. Check URL in `.env.local` matches your deployment
3. Restart dev server

---

## What's Already Set Up

✅ **Convex schema** (`convex/schema.ts`):

- stories table
- chapters table
- scenes table
- characters table

✅ **Convex functions** (in `convex/`):

- `stories.ts` - list, create, get stories
- `chapters.ts` - manage chapters
- `scenes.ts` - manage scenes with generation
- `characters.ts` - character management
- `storyTree.ts` - fetch complete story hierarchy

✅ **Frontend integration**:

- GraphicalCanvas uses `useQuery` hooks
- Real-time updates via Convex subscriptions
- Automatic re-rendering on data changes

---

## Next Steps

1. Run `npx convex dev` to set up your project
2. Create `.env.local` with your Convex URL
3. Switch `App.tsx` to use `<GraphicalCanvas />` instead of `<GraphicalCanvasDemo />`
4. Restart `npm run dev`
5. Visit http://localhost:5173/

Your graphical canvas will now display real-time data from Convex!
