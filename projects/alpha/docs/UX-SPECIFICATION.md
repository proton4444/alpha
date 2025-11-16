# Canvas Interface UX Specification

**Version:** 1.0
**Date:** November 2025
**Product:** Alpha - Story Canvas Editor

---

## Table of Contents

1. [Overview](#overview)
2. [Design Principles](#design-principles)
3. [Wireframes](#wireframes)
4. [Component Library](#component-library)
5. [Interaction Prototypes](#interaction-prototypes)
6. [Visual Design System](#visual-design-system)
7. [Accessibility](#accessibility)
8. [Technical Implementation](#technical-implementation)

---

## Overview

### Purpose

The Canvas Interface is a node-based visual workspace for story editing that enables users to:
- Visualize story structure (chapters and scenes)
- Navigate hierarchical content intuitively
- Edit scenes and outlines in context
- Track generation status and progress
- Manage character relationships

### Target Users

- **Primary:** Fiction writers using AI-assisted writing tools
- **Secondary:** Content creators, screenwriters, game designers
- **Experience Level:** Intermediate to advanced digital content creators

### Core Use Cases

1. **Structural Overview:** View entire story structure at a glance
2. **Scene Editing:** Click-to-edit individual scenes with inline feedback
3. **Progress Tracking:** Monitor AI generation status across all scenes
4. **Navigation:** Quick access to any chapter or scene
5. **Relationship Visualization:** See chapter-scene connections visually

---

## Design Principles

### 1. Visual Clarity
- **Principle:** Information hierarchy through size, color, and spacing
- **Implementation:** Chapter nodes (larger, purple) vs Scene nodes (smaller, status-colored)
- **Rationale:** Users should instantly understand structure without reading text

### 2. Progressive Disclosure
- **Principle:** Show overview first, details on demand
- **Implementation:** Compact node cards → Full editor modal on click
- **Rationale:** Reduce cognitive load while maintaining quick access

### 3. Immediate Feedback
- **Principle:** Visual response to all user actions within 100ms
- **Implementation:** Hover effects, animated transitions, status indicators
- **Rationale:** Build confidence and predictability

### 4. Spatial Memory
- **Principle:** Consistent layout allows users to remember locations
- **Implementation:** Grid-based positioning, persistent viewport state
- **Rationale:** Reduce navigation time through spatial learning

### 5. Contextual Actions
- **Principle:** Actions available when relevant, hidden when not
- **Implementation:** Node-specific actions, modal-based editing
- **Rationale:** Reduce UI clutter and decision fatigue

---

## Wireframes

### 1. Main Canvas View

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Story Selector ▼]                              [Theme] [Text View]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────┐    ┌───────────────┐    ┌───────────────┐           │
│  │ CHAPTER 1     │    │ CHAPTER 2     │    │ CHAPTER 3     │           │
│  │ The Beginning │    │ Rising Action │    │ The Climax    │           │
│  ├───────────────┤    ├───────────────┤    ├───────────────┤           │
│  │ 📊 3/4 scenes │    │ 📊 2/5 scenes │    │ 📊 0/3 scenes │           │
│  │ 2,340 words   │    │ 1,890 words   │    │ 0 words       │           │
│  │ ████░ 75%     │    │ ███░░ 40%     │    │ ░░░░░ 0%      │           │
│  └───────┬───────┘    └───────┬───────┘    └───────┬───────┘           │
│          │                    │                    │                    │
│    ┌─────┼─────┬──────┐      │              ┌─────┼─────┐             │
│    │     │     │      │      │              │     │     │             │
│  ┌─▼─┐ ┌─▼─┐ ┌─▼─┐  ┌─▼─┐  │            ┌─▼─┐ ┌─▼─┐ ┌─▼─┐           │
│  │ ✓ │ │ ✓ │ │ ✓ │  │⏳ │  │            │📝 │ │📝 │ │📝 │           │
│  │ 1 │ │ 2 │ │ 3 │  │ 4 │  │            │ 1 │ │ 2 │ │ 3 │           │
│  ├───┤ ├───┤ ├───┤  ├───┤  │            ├───┤ ├───┤ ├───┤           │
│  │450│ │630│ │710│  │550│  │            │  0│ │  0│ │  0│           │
│  │ W │ │ W │ │ W │  │ W │  │            │ W │ │ W │ │ W │           │
│  │AB │ │AC │ │BCD│  │AE │  │            │   │ │   │ │   │           │
│  └───┘ └───┘ └───┘  └───┘  │            └───┘ └───┘ └───┘           │
│          │                    │                                         │
│  [Grid Background with Dots]                                            │
│                                                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  [🔍] [➕] [➖] [⛶] [🔒]                              [Mini Map ▪▪▪▪]   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- **Header Bar:** Story selector, theme toggle, view switcher
- **Chapter Nodes:** Large cards showing title, progress, stats
- **Scene Nodes:** Compact cards with status, number, word count, characters
- **Connections:** Lines from chapters to their scenes
- **Controls:** Bottom-left (zoom, fit, lock)
- **Mini Map:** Bottom-right (overview navigation)
- **Background:** Dot grid for spatial reference

**Legend:**
- ✓ = Complete | ⏳ = Generating | 📝 = Draft | ⚠️ = Error
- W = Words | AB = Character initials

---

### 2. Scene Editor Modal

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✕                     Scene 4 - Chapter 1                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Status: [🟢 Complete]                              Regenerated: 2×     │
│                                                                          │
│  ┌─ Outline ──────────────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  Alice discovers the hidden letter in the attic. The letter       │ │
│  │  reveals that her grandmother was part of a secret society.        │ │
│  │  She finds a cryptic map folded inside.                            │ │
│  │                                                                     │ │
│  │                                                                     │ │
│  │  [Auto-saves after 1 second of inactivity]                         │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌─ Generated Prose ───────────────────────────────────────────────────┐ │
│  │                                                                     │ │
│  │  The attic smelled of old paper and forgotten memories. Alice's   │ │
│  │  fingers trembled as she carefully unfolded the yellowed           │ │
│  │  envelope. Inside, her grandmother's elegant handwriting told a    │ │
│  │  story she never knew existed...                                   │ │
│  │                                                                     │ │
│  │  [550 words total - continues...]                                  │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  Characters: [Alice] [Grandmother]                                      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  [Regenerate Prose]  [Accept & Continue]  [Edit Prose]             │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- **Header:** Scene number, chapter context, close button
- **Status Bar:** Visual status indicator, regeneration count
- **Outline Section:** Editable textarea with auto-save
- **Prose Section:** Read-only generated content (can switch to edit mode)
- **Character Tags:** Visual indication of characters present
- **Action Buttons:** Context-aware actions based on status
- **Word Count:** Live tracking of prose length

**Interaction States:**
- **Draft:** Show "Generate Prose" button
- **Generating:** Show spinner, disable buttons, show progress
- **Complete:** Show Regenerate, Accept, Edit
- **Error:** Show error message, "Retry" button

---

### 3. Creation Flow Wireframe

```
STATE 1: Empty Canvas
┌─────────────────────────────────────────────────────────────────────────┐
│  [➕ Create New Story]                                 [Theme]           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                                                                          │
│                        ┌───────────────────┐                            │
│                        │                   │                            │
│                        │   📖 No Story     │                            │
│                        │   Selected        │                            │
│                        │                   │                            │
│                        │  [Create Story]   │                            │
│                        │                   │                            │
│                        └───────────────────┘                            │
│                                                                          │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

STATE 2: Story Selected, First Chapter Created
┌─────────────────────────────────────────────────────────────────────────┐
│  [My Story ▼]                                          [Theme]           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────┐                                                      │
│  │ CHAPTER 1     │                                                      │
│  │ Untitled      │      [➕ Add Chapter]                                │
│  ├───────────────┤                                                      │
│  │ 📊 0/0 scenes │                                                      │
│  │ 0 words       │                                                      │
│  │ ░░░░░ 0%      │                                                      │
│  └───────────────┘                                                      │
│          │                                                               │
│          └──> [➕ Add Scene]                                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

STATE 3: Scenes Added, Ready to Generate
┌─────────────────────────────────────────────────────────────────────────┐
│  [My Story ▼]                                          [Theme]           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────┐                                                      │
│  │ CHAPTER 1     │                                                      │
│  │ The Beginning │                                                      │
│  ├───────────────┤                                                      │
│  │ 📊 0/3 scenes │                                                      │
│  │ 0 words       │                                                      │
│  │ ░░░░░ 0%      │                                                      │
│  └───────┬───────┘                                                      │
│          │                                                               │
│    ┌─────┼─────┬──────┐                                                │
│    │     │     │      │                                                │
│  ┌─▼─┐ ┌─▼─┐ ┌─▼─┐  │                                                 │
│  │📝 │ │📝 │ │📝 │  │  ← Click to edit outline & generate              │
│  │ 1 │ │ 2 │ │ 3 │  │                                                 │
│  └───┘ └───┘ └───┘  │                                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

**Flow Steps:**
1. **Empty State:** Prompt to create first story
2. **Story Created:** Show first chapter, prompt to add scenes
3. **Scenes Created:** Click scenes to add outlines
4. **Outlines Added:** Generate prose for each scene
5. **Complete:** All scenes generated, chapter shows 100%

---

## Component Library

### 1. Chapter Node Component

**Specification:**

```typescript
interface ChapterNodeProps {
  data: {
    chapterNumber: number
    title: string
    sceneCount: number
    completedCount: number
    totalWords: number
  }
}
```

**Visual Design:**

```
┌─────────────────────┐
│ CHAPTER 1           │ ← Bold, uppercase label + number
│ The Beginning       │ ← Title (16px, medium weight)
├─────────────────────┤
│ 📊 3/4 scenes       │ ← Stats row (14px, muted)
│ 2,340 words         │
│ ████░ 75%           │ ← Progress bar (visual indicator)
└─────────────────────┘
  Width: 200px
  Height: auto (~120px)
  Padding: 16px
  Border: 2px solid
  Radius: 12px
```

**Color Variants:**

| Theme | Background | Border | Text | Progress Bar |
|-------|-----------|--------|------|--------------|
| Light | #FAF5FF | #C026D3 | #1F2937 | #C026D3 |
| Dark | #4A1D5C | #E879F9 | #F9FAFB | #E879F9 |

**States:**

1. **Default:**
   - Border: 2px solid
   - Shadow: 0 2px 8px rgba(0,0,0,0.1)
   - Cursor: default

2. **Hover:**
   - Transform: scale(1.02)
   - Shadow: 0 4px 12px rgba(0,0,0,0.15)
   - Transition: 200ms ease

3. **Selected:**
   - Ring: 3px solid #9333EA
   - Shadow: 0 4px 16px rgba(147,51,234,0.3)

**Accessibility:**
- Role: article
- Label: "Chapter {number}: {title}"
- Tab index: 0
- Focus visible: 3px outline

---

### 2. Scene Node Component

**Specification:**

```typescript
interface SceneNodeProps {
  data: {
    sceneNumber: number
    outline: string
    prose?: string
    status: 'draft' | 'generating' | 'complete' | 'error'
    regenerationCount: number
    characters: { _id: string; name: string }[]
    wordCount: number
    onClick: () => void
  }
}
```

**Visual Design:**

```
┌─────────┐
│ ✓  1    │ ← Status icon + scene number
├─────────┤
│  450    │ ← Word count
│   W     │
│  A B    │ ← Character initials (max 3 visible)
└─────────┘
  Width: 80px
  Height: 100px
  Padding: 12px
  Border: 1px solid
  Radius: 8px
```

**Status-Based Styling:**

| Status | Icon | Background | Border | Text |
|--------|------|-----------|--------|------|
| draft | 📝 | #F1F5F9 / #334155 | #CBD5E1 | #64748B |
| generating | ⏳ | #DBEAFE / #1E3A8A | #3B82F6 | #3B82F6 |
| complete | ✓ | #D1FAE5 / #064E3B | #10B981 | #10B981 |
| error | ⚠️ | #FEE2E2 / #7F1D1D | #EF4444 | #EF4444 |

**States:**

1. **Default:**
   - Opacity: 1
   - Cursor: pointer

2. **Hover:**
   - Transform: scale(1.05)
   - Shadow: 0 4px 16px rgba(0,0,0,0.15)
   - Transition: 150ms ease

3. **Generating (Animated):**
   - Pulse animation (1.5s infinite)
   - Border glow effect

4. **Selected:**
   - Ring: 3px solid #9333EA
   - Shadow: 0 4px 16px rgba(147,51,234,0.3)

**Character Initials:**
- Display: Up to 3 characters
- Size: 12px
- Weight: 600
- Layout: Horizontal row
- Overflow: "+N" indicator

**Accessibility:**
- Role: button
- Label: "Scene {number}, {status}, {wordCount} words"
- Tab index: 0
- Focus visible: 3px outline
- ARIA-pressed: true when selected

---

### 3. Connection Lines (Edges)

**Specification:**

```typescript
interface EdgeProps {
  id: string
  source: string // Chapter node ID
  target: string // Scene node ID
  animated?: boolean
  style?: {
    stroke: string
    strokeWidth: number
  }
}
```

**Visual Design:**

```
Chapter Node
     │
     │ ← Connection line
     ▼
Scene Node
```

**Styling:**

| Scene Status | Color | Width | Animation |
|-------------|-------|-------|-----------|
| draft | #94A3B8 | 2px | None |
| generating | #3B82F6 | 2px | Dash flow |
| complete | #10B981 | 2px | None |
| error | #EF4444 | 2px | None |

**Types:**
- **Type:** Smoothstep (curved)
- **Source Handle:** Bottom of chapter
- **Target Handle:** Top of scene
- **Arrow:** None (implicit direction)

**Accessibility:**
- Not focusable
- Purely decorative (relationship conveyed through ARIA tree structure)

---

### 4. Scene Editor Modal

**Specification:**

```typescript
interface SceneEditorProps {
  sceneId: string
  isOpen: boolean
  onClose: () => void
}
```

**Layout:**

```
┌─────────────────────────────────────┐
│ Header (60px)                       │
├─────────────────────────────────────┤
│                                     │
│ Status Bar (40px)                   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Outline Section (200px min)         │
│ [Expandable textarea]               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│ Prose Section (flex-1)              │
│ [Read-only or editable]             │
│                                     │
├─────────────────────────────────────┤
│ Action Bar (80px)                   │
└─────────────────────────────────────┘
  Width: 800px max
  Height: 90vh max
  Padding: 24px
  Background: Overlay (rgba(0,0,0,0.5))
```

**Components:**

1. **Header:**
   - Title: "Scene {number} - Chapter {number}"
   - Close button (✕)
   - Font: 20px, semibold

2. **Status Bar:**
   - Status badge (colored pill)
   - Regeneration count
   - Word count
   - Last saved indicator

3. **Outline Textarea:**
   - Min height: 100px
   - Auto-resize: Yes
   - Placeholder: "Describe what happens in this scene..."
   - Auto-save: 1 second debounce
   - Character limit: 1000

4. **Prose Display:**
   - Font: Serif (Georgia or similar)
   - Size: 16px
   - Line height: 1.8
   - Max width: 70ch
   - Editable: Switch to edit mode

5. **Action Buttons:**
   - Primary: 100% width or auto
   - Height: 44px
   - Radius: 8px
   - Font: 16px, medium

**Button Variants by Status:**

| Status | Primary Action | Secondary Actions |
|--------|---------------|------------------|
| draft | Generate Prose | [Cancel] |
| generating | [Disabled spinner] | [Cancel Generation] |
| complete | Accept & Continue | [Regenerate] [Edit] |
| error | Retry | [Edit Outline] [Cancel] |

**Accessibility:**
- Role: dialog
- ARIA-modal: true
- ARIA-labelledby: header ID
- Focus trap: Yes
- ESC to close: Yes
- Click outside: Confirm if unsaved

---

### 5. Toolbar Components

**Story Selector:**

```
┌──────────────────────────┐
│ My Epic Fantasy ▼        │
└──────────────────────────┘
```

- **Type:** Dropdown select
- **Width:** 200px
- **Options:** List of story titles
- **Position:** Top-left, floating
- **Background:** White/Dark card
- **Shadow:** 0 2px 8px rgba(0,0,0,0.1)

**View Toggle:**

```
[Canvas] [Text View]
```

- **Type:** Segmented control
- **Width:** Auto
- **Position:** Top-right
- **Active:** Bold + underline
- **Transition:** 200ms

**Theme Toggle:**

```
[🌙] or [☀️]
```

- **Type:** Icon button
- **Size:** 40px × 40px
- **Position:** Top-right
- **Tooltip:** "Toggle theme"
- **Animation:** Rotate 180° on toggle

---

### 6. Canvas Controls

**Control Panel (Bottom-Left):**

```
┌───┐
│ 🔍 │ Zoom in
├───┤
│ ➖ │ Zoom out
├───┤
│ ⛶ │ Fit view
├───┤
│ 🔒 │ Lock/unlock
└───┘
```

- **Size:** 44px × 44px per button
- **Background:** White/Dark card
- **Border:** 1px solid divider
- **Hover:** Background tint
- **Active:** Primary color

**Mini Map (Bottom-Right):**

```
┌─────────────┐
│ ▪▪▪         │
│   ▪▪▪▪      │
│     ▪▪      │
│             │
│   ┌─────┐   │ ← Viewport rectangle
│   │     │   │
│   └─────┘   │
└─────────────┘
```

- **Size:** 200px × 150px
- **Background:** Semi-transparent
- **Node colors:** Match status
- **Viewport:** Draggable rectangle
- **Interaction:** Click to pan

---

### 7. Background Grid

**Specification:**

```css
background-pattern: dots
dot-size: 1px
dot-gap: 16px
dot-color: rgba(0, 0, 0, 0.1) / rgba(255, 255, 255, 0.1)
```

**Purpose:**
- Visual reference for positioning
- Depth perception
- Professional canvas feel

---

## Interaction Prototypes

### 1. Canvas Navigation

#### Pan & Zoom

**Gestures:**

| Action | Input | Behavior |
|--------|-------|----------|
| Pan | Click + Drag background | Move viewport |
| Zoom In | Mouse wheel up / Ctrl + "+" | Zoom centered on cursor |
| Zoom Out | Mouse wheel down / Ctrl + "-" | Zoom centered on cursor |
| Fit View | F key / Fit button | Zoom to show all nodes |
| Reset | Double-click background | Reset to default zoom |

**Constraints:**
- Min zoom: 0.1 (10%)
- Max zoom: 2.0 (200%)
- Pan boundaries: Infinite canvas
- Smooth transitions: 300ms ease-out

**Implementation:**

```typescript
<ReactFlow
  minZoom={0.1}
  maxZoom={2}
  defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
  fitView
  fitViewOptions={{ padding: 0.2 }}
/>
```

---

### 2. Node Selection

#### Single Selection

**Flow:**
1. User clicks scene node
2. Node receives focus ring (3px purple)
3. Canvas updates selected state
4. Scene editor modal opens (300ms fade)

**Visual Feedback:**
- Border: Animated from 1px → 3px
- Shadow: Elevated shadow
- Transform: Maintain scale
- Timing: 150ms ease-out

**Code Pattern:**

```typescript
const handleNodeClick = (event, node) => {
  setSelectedSceneId(node.id)
  // Modal opens via state change
}
```

---

### 3. Scene Editing Workflow

#### Happy Path (Draft → Complete)

```
┌─────────┐
│  DRAFT  │
│   📝    │
└────┬────┘
     │ 1. Click scene
     ▼
┌─────────────────┐
│ Modal Opens     │
│ Outline: Empty  │
│ [Type outline]  │
└────┬────────────┘
     │ 2. Type outline
     │ (auto-saves)
     ▼
┌─────────────────┐
│ [Generate]      │
│ button enabled  │
└────┬────────────┘
     │ 3. Click Generate
     ▼
┌──────────────┐
│ GENERATING   │
│     ⏳       │ ← Animated pulse
│  [Spinner]   │
└──────┬───────┘
     │ 4. Wait for AI
     │ (real-time updates)
     ▼
┌──────────────┐
│  COMPLETE    │
│      ✓       │ ← Green checkmark
│  [Prose]     │
└──────┬───────┘
     │ 5. Review
     ▼
┌──────────────────┐
│ [Accept] or      │
│ [Regenerate]     │
└──────────────────┘
```

**Timings:**
- Modal open: 300ms fade + slide
- Status change: Instant (real-time)
- Auto-save: 1000ms debounce
- Generation: Variable (5-30s)
- Completion flash: 500ms celebration

**Error Handling:**

```
GENERATING
    │
    │ Error occurs
    ▼
┌──────────────┐
│   ERROR      │
│     ⚠️       │ ← Red warning
│ [Error msg]  │
│   [Retry]    │
└──────────────┘
    │
    │ Click Retry
    ▼
Back to GENERATING
```

---

### 4. Drag & Drop (Future Enhancement)

**Planned Interactions:**

1. **Reorder Scenes:**
   - Drag scene node
   - Drop between other scenes
   - Auto-renumbers
   - Updates connections

2. **Move Scenes Between Chapters:**
   - Drag scene
   - Hover over target chapter
   - Chapter highlights
   - Drop to reassign

3. **Create Connections:**
   - Drag from chapter handle
   - Draw temporary line
   - Drop on scene handle
   - Creates edge

**Visual Feedback:**
- Dragging: 50% opacity, elevated shadow
- Drop target: Pulsing glow
- Invalid drop: Red tint
- Valid drop: Green tint

---

### 5. Keyboard Shortcuts

**Navigation:**

| Key | Action |
|-----|--------|
| Tab | Cycle through nodes |
| Enter | Open selected scene |
| Esc | Close modal |
| F | Fit view |
| +/- | Zoom in/out |
| ←↑→↓ | Pan viewport |
| Space + Drag | Pan (hand tool) |

**Editing:**

| Key | Action |
|-----|--------|
| Ctrl/Cmd + S | Force save outline |
| Ctrl/Cmd + Enter | Generate prose |
| Ctrl/Cmd + R | Regenerate |
| Ctrl/Cmd + E | Edit mode toggle |

**Accessibility:**

| Key | Action |
|-----|--------|
| ? | Show keyboard shortcuts |
| Ctrl/Cmd + K | Command palette |

---

### 6. Touch Gestures (Mobile/Tablet)

**Gestures:**

| Gesture | Action |
|---------|--------|
| Pinch | Zoom in/out |
| Two-finger drag | Pan viewport |
| Tap | Select node |
| Double-tap | Open scene editor |
| Long-press | Context menu (future) |

**Constraints:**
- Minimum touch target: 44px × 44px
- Touch padding: 8px around nodes
- Gesture debounce: 100ms

---

### 7. Real-Time Updates

**Behavior:**

When data changes in Convex:
1. **Instant sync:** React Flow nodes update automatically
2. **No flash:** Smooth transition, no re-render flicker
3. **Preserve viewport:** Position and zoom maintained
4. **Animate changes:** Fade in new nodes, pulse updated nodes

**Implementation:**

```typescript
useEffect(() => {
  if (storyTree) {
    const { nodes: newNodes, edges: newEdges } = transformStoryToGraph(storyTree)
    setNodes(newNodes)
    setEdges(newEdges)
  }
}, [storyTree]) // Re-runs when Convex data changes
```

**Change Indicators:**
- New node: Fade in (500ms)
- Updated node: Pulse once (300ms)
- Deleted node: Fade out (300ms)
- Status change: Color transition (200ms)

---

### 8. Loading States

**Initial Load:**

```
┌─────────────────────────────────────┐
│                                     │
│         ⏳ Loading story...         │
│                                     │
│      [Animated spinner]             │
│                                     │
└─────────────────────────────────────┘
```

**Empty States:**

1. **No Story Selected:**
   ```
   📖 No story selected
   [Select a story from the dropdown above]
   ```

2. **Story Has No Chapters:**
   ```
   📄 No chapters yet
   [Create your first chapter to get started]
   ```

**Generation Progress:**

```
Scene Node:
┌─────────┐
│  ⏳  1  │ ← Pulsing animation
├─────────┤
│ [░░░░░] │ ← Progress bar (if available)
│  45%    │
└─────────┘
```

---

## Visual Design System

### Color Palette

#### Primary Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| primary | #C026D3 | #E879F9 | Chapter nodes, accents |
| background | #FFFFFF | #0F172A | Canvas background |
| surface | #F9FAFB | #1E293B | Cards, modals |
| border | #E5E7EB | #334155 | Dividers, outlines |
| text-primary | #1F2937 | #F9FAFB | Headings, labels |
| text-secondary | #6B7280 | #94A3B8 | Metadata, captions |

#### Status Colors

| Status | Light BG | Dark BG | Border | Text |
|--------|----------|---------|--------|------|
| draft | #F1F5F9 | #334155 | #CBD5E1 | #64748B |
| generating | #DBEAFE | #1E3A8A | #3B82F6 | #3B82F6 |
| complete | #D1FAE5 | #064E3B | #10B981 | #10B981 |
| error | #FEE2E2 | #7F1D1D | #EF4444 | #EF4444 |

#### Semantic Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| success | #10B981 | #34D399 | Completion, confirmation |
| warning | #F59E0B | #FBBF24 | Cautions, alerts |
| error | #EF4444 | #F87171 | Errors, failures |
| info | #3B82F6 | #60A5FA | Information, help |

---

### Typography

#### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Georgia', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| heading-1 | 24px | 700 | 1.2 | Page titles |
| heading-2 | 20px | 600 | 1.3 | Section headers |
| heading-3 | 16px | 600 | 1.4 | Card titles |
| body-large | 16px | 400 | 1.6 | Prose, descriptions |
| body | 14px | 400 | 1.5 | Default text |
| caption | 12px | 500 | 1.4 | Labels, metadata |
| label | 12px | 600 | 1.3 | Form labels |

---

### Spacing System

**Based on 4px grid:**

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Compact layouts |
| md | 16px | Default spacing |
| lg | 24px | Section spacing |
| xl | 32px | Major sections |
| 2xl | 48px | Page spacing |

---

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.2);
```

**Usage:**
- sm: Subtle depth (buttons)
- md: Cards, nodes
- lg: Modals, popovers
- xl: Overlays, dropdowns

---

### Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

**Usage:**
- sm: Small buttons, inputs
- md: Cards, scene nodes
- lg: Chapter nodes, panels
- xl: Large modals
- full: Pills, avatars

---

### Animations

#### Timing Functions

```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in: cubic-bezier(0.32, 0, 0.67, 0);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Durations

| Duration | Value | Usage |
|----------|-------|-------|
| instant | 100ms | Micro-interactions |
| fast | 150ms | Hover effects |
| normal | 200ms | Transitions |
| slow | 300ms | Modals, overlays |
| slower | 500ms | Page transitions |

#### Common Animations

**Fade In:**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Scale Up:**
```css
@keyframes scaleUp {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

**Pulse (Generating):**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

**Slide Up:**
```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

---

## Accessibility

### WCAG Compliance

**Target:** WCAG 2.1 Level AA

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| 1.4.3 Contrast | 4.5:1 text, 3:1 UI | Tested with APCA, meets standards |
| 2.1.1 Keyboard | All functions accessible | Tab navigation, shortcuts |
| 2.4.7 Focus Visible | Clear focus indicators | 3px outlines, ring styles |
| 3.2.4 Consistent ID | Predictable behavior | Consistent interactions |
| 4.1.2 Name/Role/Value | Proper ARIA | Labels, roles, states |

---

### Semantic HTML

**Component Structure:**

```html
<main role="main">
  <header role="banner">
    <nav role="navigation">
      <select aria-label="Select story"></select>
      <button aria-label="Toggle theme"></button>
    </nav>
  </header>

  <div role="application" aria-label="Story canvas">
    <article role="article" aria-label="Chapter 1: The Beginning">
      <!-- Chapter node -->
    </article>

    <button role="button" aria-label="Scene 1, complete, 450 words">
      <!-- Scene node -->
    </button>
  </div>

  <dialog role="dialog" aria-modal="true" aria-labelledby="scene-title">
    <!-- Scene editor -->
  </dialog>
</main>
```

---

### Screen Reader Support

**Announcements:**

| Event | Announcement |
|-------|--------------|
| Story loaded | "Story loaded: {title}, {chapterCount} chapters" |
| Scene clicked | "Opening scene {number}, {status}" |
| Generation started | "Generating prose for scene {number}" |
| Generation complete | "Scene {number} generation complete, {wordCount} words" |
| Error occurred | "Error generating scene {number}: {message}" |
| Auto-save | "Outline saved" (subtle) |

**Live Regions:**

```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {statusMessage}
</div>

<div aria-live="assertive" aria-atomic="true" class="sr-only">
  {errorMessage}
</div>
```

---

### Keyboard Navigation

**Focus Order:**

1. Story selector
2. Theme toggle
3. View toggle
4. Chapter nodes (left-to-right, top-to-bottom)
5. Scene nodes (grouped by chapter)
6. Canvas controls
7. Mini map

**Focus Management:**

- **Modal open:** Trap focus within modal
- **Modal close:** Return focus to triggering node
- **Tab order:** Logical, predictable
- **Skip links:** "Skip to canvas" for screen readers

---

### Reduced Motion

**Respects `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Affected animations:**
- Node hover scale
- Modal entrance
- Pulse animations
- Fade transitions

**Preserved:**
- Instant updates
- Color changes
- State indicators

---

### Color Blindness

**Strategies:**

1. **Not color-only:** Status communicated via icons + color
2. **High contrast:** All status colors meet 3:1 ratio
3. **Patterns:** Consider adding patterns to progress bars
4. **Labels:** Text labels for all states

**Testing:**
- Protanopia: ✓ Tested
- Deuteranopia: ✓ Tested
- Tritanopia: ✓ Tested
- Monochromacy: ✓ Tested (icons + text suffice)

---

### Touch Targets

**Minimum Sizes:**

| Element | Size | Padding |
|---------|------|---------|
| Buttons | 44×44px | 8px |
| Scene nodes | 80×100px | — |
| Chapter nodes | 200×120px | — |
| Close button | 44×44px | 12px |
| Control buttons | 44×44px | 4px |

---

## Technical Implementation

### Architecture

**Stack:**
- **React:** 18.3.1
- **React Flow:** 11.11.4
- **Convex:** 1.29.1 (real-time backend)
- **Tailwind CSS:** 4.0.0
- **TypeScript:** 5.x

**File Structure:**

```
src/
├── components/
│   ├── canvas/
│   │   ├── GraphicalCanvas.tsx       # Main production canvas
│   │   ├── GraphicalCanvasDemo.tsx   # Demo canvas
│   │   ├── ChapterFlowNode.tsx       # Chapter node component
│   │   ├── SceneNode.tsx             # Scene node component
│   │   └── canvas.css                # Custom styles
│   ├── SceneEditor.tsx               # Scene editing modal
│   └── ThemeToggle.tsx               # Theme switcher
├── hooks/
│   ├── useConvexQueries.ts           # Data fetching hooks
│   └── useDebounce.ts                # Auto-save utility
├── lib/
│   └── utils.ts                      # Helpers
└── App.tsx                           # Root component
```

---

### Data Flow

```
Convex Database
      ↓
  useQuery()
      ↓
storyTree data
      ↓
transformStoryToGraph()
      ↓
React Flow nodes + edges
      ↓
ReactFlow component
      ↓
User interactions
      ↓
useMutation()
      ↓
Convex Database
```

**Real-time Sync:**
- Convex subscriptions auto-update React state
- No polling required
- Optimistic updates for immediate feedback

---

### Performance Optimizations

**Current:**
1. **React.memo:** Node components memoized
2. **useCallback:** Event handlers stable
3. **Debouncing:** Auto-save (1s delay)
4. **Lazy loading:** Scene editor loads on demand

**Future:**
1. **Virtualization:** Render only visible nodes (for >100 scenes)
2. **Code splitting:** Lazy-load canvas route
3. **Image optimization:** Lazy-load character avatars
4. **Service worker:** Offline canvas viewing

---

### Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✓ Full |
| Firefox | 88+ | ✓ Full |
| Safari | 14+ | ✓ Full |
| Edge | 90+ | ✓ Full |
| Mobile Safari | 14+ | ✓ Full |
| Chrome Android | 90+ | ✓ Full |

**Polyfills:**
- None required (modern browsers only)

---

### Testing Strategy

**Unit Tests:**
- Node components (Jest + RTL)
- Data transformation functions
- Custom hooks

**Integration Tests:**
- Canvas rendering with mock data
- Modal open/close flows
- Auto-save behavior

**E2E Tests (Playwright):**
- Complete scene editing workflow
- Multi-chapter navigation
- Real-time sync simulation

**Accessibility Tests:**
- axe-core automated checks
- Manual keyboard navigation
- Screen reader testing (NVDA, VoiceOver)

---

## Future Enhancements

### Phase 2: Advanced Interactions

1. **Drag & Drop:**
   - Reorder scenes within chapters
   - Move scenes between chapters
   - Rearrange chapters

2. **Multi-select:**
   - Shift+Click to select multiple scenes
   - Bulk actions (delete, regenerate, export)

3. **Context Menus:**
   - Right-click for quick actions
   - Chapter-level operations

### Phase 3: Collaboration

1. **Real-time Cursors:**
   - See other users' positions
   - Avatar indicators

2. **Comments:**
   - Attach notes to scenes
   - Threaded discussions

3. **Version History:**
   - Timeline of changes
   - Restore previous versions

### Phase 4: Advanced Visualization

1. **Character View:**
   - Filter scenes by character
   - Character arc visualization

2. **Timeline View:**
   - Linear timeline of events
   - Parallel storylines

3. **Export:**
   - PDF export with layout
   - Interactive HTML export

---

## Appendix

### Design Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Use React Flow | Mature library, handles pan/zoom, extensible | 2025-11 |
| Grid layout | Predictable positioning, spatial memory | 2025-11 |
| Status icons | Universal recognition, color-blind friendly | 2025-11 |
| Modal editing | Focused context, prevents clutter | 2025-11 |
| Auto-save | Reduce cognitive load, prevent data loss | 2025-11 |

### Research & References

- **React Flow Docs:** https://reactflow.dev
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **Radix UI Patterns:** https://www.radix-ui.com
- **Tailwind Design System:** https://tailwindcss.com

### Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-16 | Initial UX specification |

---

**Document Owner:** Alpha Product Team
**Last Updated:** November 16, 2025
**Status:** Living Document
