# Playwright MCP Setup Guide

Enable browser automation and screenshot capabilities in Claude Code!

---

## What This Enables

Once configured, Claude can:
- ✅ **Open your deployed site** in a real browser
- ✅ **Take screenshots** to verify UI styling
- ✅ **Test interactions** (click buttons, fill forms, etc.)
- ✅ **Verify Story 6 components** render correctly
- ✅ **Check Tailwind styling** works in production
- ✅ **Automated visual testing** of your deployment

---

## Installation (Already Done ✅)

```bash
npm install -g @playwright/mcp
```

---

## Configuration

### Add to your MCP Settings

The Playwright MCP server is already installed, but you need to add it to your Claude Code MCP configuration.

**Location:** Your MCP settings file (usually `~/.config/claude/mcp_settings.json` or similar)

**Add this configuration:**

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--headless",
        "--browser", "chromium",
        "--viewport-size", "1920x1080",
        "--timeout-navigation", "60000",
        "--save-trace"
      ]
    }
  }
}
```

### Configuration Options Explained

| Option | Purpose |
|--------|---------|
| `--headless` | Run browser without GUI (faster) |
| `--browser chromium` | Use Chromium/Chrome |
| `--viewport-size 1920x1080` | Desktop screen size |
| `--timeout-navigation 60000` | 60s page load timeout |
| `--save-trace` | Save Playwright trace for debugging |

### Optional: Headed Mode (See Browser)

To see the browser window while testing:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--browser", "chromium",
        "--viewport-size", "1920x1080"
      ]
    }
  }
}
```

(Remove `--headless` to see the browser)

---

## After Configuration

Once MCP is configured and Claude Code is restarted, you can ask Claude to:

### Example Commands

**1. Test Your Deployed Site:**
```
Visit https://your-app.vercel.app and take screenshots of the chapter overview page
```

**2. Verify Styling:**
```
Check if the filter buttons have colors (green, blue, red) and take a screenshot
```

**3. Test Interactions:**
```
Click the "Complete" filter button and verify only complete scenes show
```

**4. Visual Testing:**
```
Take screenshots of:
- Filter buttons (all states)
- Chapter cards with borders/shadows
- Character badges
- Progress bars
- Expanded chapter with scenes
```

**5. Full UI Audit:**
```
Go through the Story 6 visual verification checklist and screenshot each component
```

---

## Use Cases for Your Project

### 1. Verify Tailwind v4 Fix Worked

```
Visit the deployed site and verify:
- Filter buttons show proper colors
- Chapter cards have visible borders
- Character badges display with colors
- Take screenshots of each
```

### 2. Test All Story 6 Features

```
Test the complete Story 6 workflow:
1. Load chapter overview
2. Click each filter button
3. Expand a chapter
4. Screenshot scene cards
5. Verify character badges
6. Test drag-drop (if possible)
```

### 3. Cross-Browser Testing

Configure multiple browsers:

```json
{
  "mcpServers": {
    "playwright-chrome": {
      "command": "npx",
      "args": ["@playwright/mcp", "--browser", "chromium"]
    },
    "playwright-firefox": {
      "command": "npx",
      "args": ["@playwright/mcp", "--browser", "firefox"]
    },
    "playwright-webkit": {
      "command": "npx",
      "args": ["@playwright/mcp", "--browser", "webkit"]
    }
  }
}
```

### 4. Mobile Testing

Test responsive design:

```json
{
  "mcpServers": {
    "playwright-mobile": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--device", "iPhone 15",
        "--headless"
      ]
    }
  }
}
```

---

## Capabilities Reference

Once enabled, Playwright MCP provides these tools:

### Navigation
- `playwright_navigate` - Go to URL
- `playwright_go_back` - Browser back button
- `playwright_go_forward` - Browser forward button

### Screenshots
- `playwright_screenshot` - Take full page screenshot
- `playwright_screenshot_element` - Screenshot specific element

### Interactions
- `playwright_click` - Click element
- `playwright_fill` - Fill input field
- `playwright_select` - Select dropdown option
- `playwright_check` - Check checkbox
- `playwright_hover` - Hover over element

### Evaluation
- `playwright_evaluate` - Run JavaScript in page
- `playwright_get_text` - Extract text content
- `playwright_get_attribute` - Get element attribute

### Waiting
- `playwright_wait_for_selector` - Wait for element
- `playwright_wait_for_navigation` - Wait for page load

---

## Testing Your Deployment

### Quick Verification Script

Once MCP is configured, you can ask:

```
1. Navigate to my Vercel deployment URL
2. Wait for page to load
3. Take a full page screenshot
4. Click on each filter button and screenshot the results
5. Expand the first chapter
6. Screenshot the expanded chapter with scene cards
7. Verify character badges are visible with colors
```

Claude will execute each step and provide screenshots!

---

## Troubleshooting

### MCP Server Not Starting

**Check logs:**
- Look in Claude Code output panel
- Check MCP server logs

**Common fixes:**
- Restart Claude Code
- Verify `@playwright/mcp` is installed globally
- Check configuration syntax (valid JSON)

### Browser Doesn't Launch

**For headless mode:**
```bash
# Install browser binaries
npx playwright install chromium
```

**For headed mode:**
- Ensure display is available
- On Linux: May need Xvfb

### Timeouts

Increase timeouts for slow pages:
```json
"args": [
  "@playwright/mcp",
  "--timeout-navigation", "120000"
]
```

---

## Advanced Configuration

### Save Screenshots Automatically

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--headless",
        "--output-dir", "/home/user/alpha/screenshots",
        "--save-trace"
      ]
    }
  }
}
```

### Use Specific Chrome Installation

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--executable-path", "/usr/bin/google-chrome",
        "--headless"
      ]
    }
  }
}
```

### Enable PDF Capture

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp",
        "--caps", "pdf",
        "--headless"
      ]
    }
  }
}
```

---

## Next Steps

1. **Add configuration** to your MCP settings file
2. **Restart Claude Code** to load the MCP server
3. **Ask Claude to test your deployment**
4. **Get screenshots** to verify Tailwind styling works!

---

## Benefits for Your Project

With Playwright MCP enabled, you can:

✅ **Instantly verify** your Vercel deployment works
✅ **See screenshots** without opening a browser manually
✅ **Test all Story 6 features** programmatically
✅ **Verify Tailwind v4 fix** worked in production
✅ **Automated visual regression testing**
✅ **Cross-browser compatibility testing**
✅ **Mobile responsive design verification**

---

**Status:** Playwright MCP installed ✅
**Next:** Configure in Claude Code settings and restart
**Then:** Ask Claude to test your deployment!

---

**Example First Command After Setup:**

```
Navigate to my Vercel deployment and verify the Story 6 UI renders correctly.
Take screenshots of:
1. Filter buttons showing colors
2. Chapter cards with borders
3. Character badges
4. An expanded chapter with scene cards
```

Claude will execute this automatically and show you the results! 🎉
