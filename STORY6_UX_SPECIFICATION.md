# Story 6: Node-Based Visual Editor - UX Specification

## Designed by Sally (UX Designer)

**Date**: 2025-11-15 | **Status**: DESIGN PHASE | **Duration**: 22-29 hours

---

## Key Design Decisions (Based on Your Answers)

✅ Visual story overview (not character relationships)
✅ Desktop-first (no mobile complexity)
✅ Within-chapter drag-drop only (simplicity)
✅ Support 200+ scenes (performance planned)
✅ Open to alternatives (not locked to React Flow)

---

## UX Overview

### Three-Layer Architecture

**Layer 1: Chapter Overview**

- Grid layout: 3-4 chapters per row
- Each card shows: Chapter title, status breakdown, progress bar
- Expandable chapters (click to expand/collapse)
- Only one chapter expanded at a time

**Layer 2: Scene List (Expanded Chapter)**

- List of scenes within chapter
- Each scene shows: Status, title, outline preview, characters, word count
- Draggable by handle (within-chapter only)
- Click to open in SceneEditor

**Layer 3: Scene Editor**

- Reuses existing Story 4.6 editor (right panel)
- No changes needed
- Selections from Layer 2 populate editor

### Visual Design

Chapter Card:

Scene Card (Expanded):

Status Colors:

- ✓ Complete: Green (#16a34a)
- ○ Draft: Gray (#6b7280)
- ⏳ Generating: Blue (#3b82f6)
- ✗ Error: Red (#dc2626)

---

## Story 6 Implementation Breakdown

| Story     | Feature               | Duration        | Complexity |
| --------- | --------------------- | --------------- | ---------- |
| 6.1       | ChapterNode component | 3-4h            | Low        |
| 6.2       | Overview grid layout  | 3-4h            | Low-Medium |
| 6.3       | Scene interaction     | 2-3h            | Low        |
| 6.4       | Drag-drop reorder     | 4-5h            | Medium     |
| 6.5       | Character badges      | 2-3h            | Low        |
| 6.6       | Status filtering      | 2-3h            | Low        |
| 6.7       | Zoom & pan            | 3-4h            | Medium     |
| 6.8       | Search/navigation     | 2-3h            | Low        |
| **TOTAL** | **Complete Story 6**  | **22-29 hours** | **Medium** |

---

## Story 6.1: Chapter Node Component

**Component**: ChapterNode.tsx

**Displays**:

- Chapter number and title
- Status breakdown: "2/3 Complete | 1 Draft | 0 Error"
- Progress bar: "████░░░░ 67%"
- Word count: "~3,500 words"
- Expand/collapse toggle (▼)

**Props**:

**Interactions**:

- Click ▼ or card to expand/collapse
- Show scene list when expanded
- Smooth 150ms animation

---

## Story 6.2: Chapter Overview Layout

**Component**: ChapterOverview.tsx

**Layout**:

- Grid:
- 3-4 chapters per row on desktop
- Gap: 1rem between cards
- Responsive: Adapts to tablet/mobile

**Behavior**:

- One chapter open at a time
- Clicking another chapter collapses previous
- Scroll position preserved
- Smooth collapse/expand

---

## Story 6.3: Scene Interaction

**Behavior**:

- Click scene card → select it
- Selection triggers SceneEditor update (Story 4.6)
- Selected scene visually highlighted
- Arrow key navigation within chapter

**No New Components**: Reuses existing SceneEditor

---

## Story 6.4: Drag-Drop Reorder

**Features**:

- Drag handle (⋮⋮) appears on scene card hover
- Grab and drag within same chapter
- Visual feedback: Semi-transparent during drag
- Drop zone highlighted
- Database updates on drop
- Scene numbers auto-updated

**Constraints**:

- Within-chapter only (no cross-chapter dragging)
- Auto-scroll near edges
- Smooth animations

**No External Library**: Use HTML5 drag-drop or simple custom

---

## Story 6.5: Character Visualization

**On Each Scene Card**:

- Show character initials: [M][S]
- Hover → tooltip with full name
- Color-coded per character (optional)

**Characters Loaded From**:

- Story context (already available)
- No API calls needed

---

## Story 6.6: Status Filtering

**Filter Buttons** (at top):

**Behavior**:

- Click filter → show only chapters with that status
- Other chapters hide
- Counts update dynamically
- "All" shows everything

---

## Story 6.7: Zoom & Pan

**Controls**:

- Zoom buttons: [+] [-] [Fit]
- Mouse wheel + Ctrl/Cmd to zoom
- Pan by dragging empty space

**Range**: 50% - 200%
**Optional**: Minimap in corner

---

## Story 6.8: Search & Navigation

**Search Box**:

- Find chapter or scene by name
- Case-insensitive
- Real-time results

**Keyboard**: Ctrl+F to open search

---

## Design Principles

1. **User-Centered**: Every element serves a user need
2. **Simple First**: Within-chapter dragging, no complex logic
3. **Familiar**: Patterns users know from other tools
4. **Performant**: Handles 200+ scenes smoothly
5. **Consistent**: Matches Story 5 design and interactions

---

## Responsive Breakpoints

**Desktop (1920px)**: 3-4 chapters per row, full details
**Tablet (1024px)**: 2-3 chapters per row, smaller cards  
**Mobile (<768px)**: 1 per row, list fallback available

---

## Accessibility (WCAG AA)

- Tab: Navigate chapters
- Enter: Expand/collapse
- Arrow keys: Navigate scenes
- Color + text for status
- Screen reader support
- Drag handles labeled

---

## Success Metrics (Post-Launch)

- Find scene < 5 seconds average
- Reorder 3 scenes < 20 seconds
- Story completion visible at a glance
- User satisfaction SUS > 75
- 80%+ adoption over list view

---

## Next Steps

1. ✅ Review and approve this UX spec
2. Create wireframes for each story 6.x
3. Consult with architect (React Flow vs custom)
4. Consult with dev team (implementation approach)
5. Start Story 6.1 implementation

Ready to move to wireframes and architecture review!
