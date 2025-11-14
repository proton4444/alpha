# Test OpenRouter API Integration

## Quick Test in Claude Code

Once you have both servers running (`npm run dev` and `npm run convex:dev`), test the OpenRouter integration:

### Option 1: Using Convex Dashboard (Easiest)

1. Go to: https://dashboard.convex.dev
2. Select your project
3. Go to **Functions** → **Actions** 
4. Find `testOpenRouterConnection`
5. Click **Call** 
6. Should return:
```json
{
  "success": true,
  "message": "OpenRouter integration successful",
  "tokensUsed": 20
}
```

### Option 2: Using React Component (Test from App)

Add this to `src/App.tsx` temporarily:

```typescript
import { useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'

export default function App() {
  const testConnection = useMutation(api.actions.testOpenRouterConnection)
  
  const handleTest = async () => {
    const result = await testConnection()
    console.log('Test result:', result)
    alert(JSON.stringify(result, null, 2))
  }

  return (
    <div>
      <h1>Narrative Canvas Platform</h1>
      <button onClick={handleTest}>Test OpenRouter Connection</button>
    </div>
  )
}
```

Then click the button on your app at http://localhost:5173

### Option 3: Using Browser Console

In browser DevTools (F12 → Console):

```javascript
const { testOpenRouterConnection } = window.ConvexClient
await testOpenRouterConnection()
```

---

## Expected Results

### Success Response
```json
{
  "success": true,
  "message": "OpenRouter integration successful",
  "tokensUsed": 20
}
```

### Common Errors

**Error: "OPENROUTER_API_KEY environment variable not set"**
- Solution: Make sure you added the API key to Convex Settings → Environment Variables
- Key name must be: `OPENROUTER_API_KEY`

**Error: "401 Unauthorized"**
- Solution: Check your OpenRouter API key is correct
- Go to: https://openrouter.ai/account/api_keys
- Make sure it's a valid, active key

**Error: "429 Too Many Requests"**
- Solution: Rate limited by OpenRouter
- The code will retry automatically with exponential backoff
- Wait a few seconds and try again

**Error: "Network error" or "fetch failed"**
- Solution: Check your internet connection
- Make sure Convex backend is running: `npm run convex:dev`

---

## What Was Implemented

**File:** `convex/actions/openrouter.ts`

### Functions:

1. **`generateWithClaude(prompt, systemPrompt, temperature, maxTokens)`**
   - Main function for AI generation
   - Server-side only (API key never exposed)
   - Supports custom system prompts
   - Returns: `{ success, text, usage }` or `{ success, error }`

2. **`testOpenRouterConnection()`**
   - Simple test function
   - Tests API connectivity
   - Returns token usage stats
   - Safe to call frequently

### Features:

✅ Exponential backoff for rate limiting  
✅ Retry logic (3 attempts by default)  
✅ Error handling with clear messages  
✅ Token usage tracking  
✅ API key from Convex environment (never hardcoded)  
✅ Support for system prompts  
✅ Temperature and max_tokens customization  

---

## Architecture Integration

This action is ready for Stories 4.x (AI Scene Generation):

- **Story 4.2:** Character Agent will use `generateWithClaude`
- **Story 4.3:** Scene Writer Agent will use `generateWithClaude`
- **Story 4.4:** Both agents will be orchestrated in `generateScene` Action

The implementation follows the architecture decision ADR-002 (OpenRouter instead of direct Claude API).

---

## Next Steps

After confirming the connection works:

1. ✅ Story 1.4: Implement TOON Parser Utility
2. ✅ Story 1.5: Set Up shadcn/ui Component Library
3. → Story 2.1: Implement Story CRUD Operations

---

**Run the test and let me know if it succeeds or fails!**
