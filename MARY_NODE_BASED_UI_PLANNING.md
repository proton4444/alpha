# Node-Based UI/UX Planning Document
## For Mary Agent Review - Narrative Canvas Platform

**Status**: PLANNING  
**Project**: Narrative Canvas Platform  
**Context**: After Stories 1-4 completion, design visual node-based story editor  
**Date**: 2025-11-15

---

## Executive Summary

We need to design a **node-based visual editor** for the Narrative Canvas Platform that allows users to see and interact with their story structure visually. Currently, the platform has:

✅ Story/Chapter/Scene CRUD operations (Stories 2.1-2.3)  
✅ Character management system (Stories 3.1-3.3)  
✅ AI prose generation pipeline (Stories 4.1-4.3)  
✅ Scene editor with accept/regenerate/edit (Story 4.6)  

❌ **MISSING**: Visual node-based interface for story structure

---

## Current State (Stories 1-4.6)

### Architecture Overview
```
Frontend (React + Tailwind)
  ├── Story CRUD Test
  ├── Chapter Management Test
  ├── Scene Management Test
  ├── Character Manager UI
  └── Scene Editor (Story 4.6)

Backend (Convex)
  ├── Schema: stories, chapters, scenes, characters
  ├── Queries: getStory, getChaptersByStory, getScenesByChapter
  ├── Mutations: create/update/delete for all entities
  └── Actions: AI generation (Character Agent → Scene Writer)

Data Model
  ├── Story
  │   ├── Chapters (1-24 per story)
  │   │   ├── Scenes (multiple per chapter)
  │   │   │   ├── outline: string
  │   │   │   ├── prose: string (AI-generated)
  │   │   │   └── status: draft|generating|complete|error
  │   │   └── Characters (shared across story)
  │   │       ├── name, traits, backstory
  │   │       └── used in AI generation context
```

### Current UI Components
- StoryCRUDTest: Create stories, list stories
- ChapterManagementTest: View chapters (24 per story)
- SceneManagementTest: CRUD scenes, generate prose
- CharacterManager: Add/edit/delete characters
- SceneEditor (4.6): Accept/regenerate/edit prose

### Data Available
- Full story hierarchy: stories → chapters → scenes
- Character data with relationships to story
- Scene metadata: status, outline, prose, generation count
- All timestamps (createdAt)

---

## Mary's Design Challenge

As Product Manager/UX Designer, Mary needs to answer:

### 1. **What is a "Node" in Our Context?**

**Option A**: Scene-centric nodes
- Each node = one scene
- Shows scene title/outline
- Shows generation status
- Shows character involvement
- Connected to chapter parent

**Option B**: Chapter-centric nodes with nested scenes
- Each node = one chapter
- Expandable to show scenes inside
- Better for large stories (24+ chapters)
- Cleaner visual hierarchy

**Option C**: Hybrid flow diagram
- Nodes represent both chapters AND scenes
- Edges show character relationships
- Shows narrative flow across chapters
- More complex but powerful

**Option D**: Character-centric relationship graph
- Nodes = characters
- Edges = interactions (scenes where they appear together)
- Shows which characters are in which scenes
- Useful for multi-character stories

### 2. **What Actions Should Users Perform on Nodes?**

**Minimum (MVP)**:
- Click node → open scene editor (Story 4.6)
- Drag to reorder (reorder scenes within chapter)
- Double-click to rename scene/outline
- Right-click context menu (delete, duplicate)

**Enhanced**:
- Drag scene from one chapter to another
- Drag character node onto scene node (assign character)
- Preview prose on hover
- Show generation status with color (draft=gray, generating=blue, complete=green, error=red)
- Filter scenes by character or status

**Advanced**:
- Create connections between scenes (narrative flow)
- Show word count / reading time per scene
- Batch operations (regenerate all draft scenes)
- Timeline view (scene order with pacing)

### 3. **Visual Style**

**What should the node display?**
```
┌─────────────────────────┐
│ Scene 3: The Discovery  │  ← scene title/number
│ [COMPLETE]              │  ← status badge
│ 487 words               │  ← prose stats
│ Marcus, Elena           │  ← characters in scene
├─────────────────────────┤
│ The old merchant walked │  ← prose preview (2-3 lines)
│ through the marketplace │
│ searching for clues...  │
└─────────────────────────┘
```

**Color scheme**:
- Background: Light (draft), Blue (generating), Green (complete), Red (error)
- Text: Dark on light, white on dark
- Borders: Subtle, rounded corners
- Hover effect: Scale up, shadow, highlight

**Size**:
- Small: 200px × 150px (fits many scenes on screen)
- Medium: 280px × 200px (better readability)
- Large: 400px × 300px (detailed preview)

### 4. **Layout Strategy**

**Option A**: Grid Layout
- Chapters in rows
- Scenes in columns within chapter row
- Responsive (adapt to screen size)
- Good for linear stories

**Option B**: Vertical Flow (Kanban-style)
- Columns per chapter
- Scenes as cards in columns
- Drag-drop reordering
- Great for chapter-focused workflows

**Option C**: Free Canvas (React Flow)
- Nodes can be placed anywhere
- User organizes layout
- Save layout for each story
- Most flexible, but overwhelming

**Option D**: Tree Hierarchy
- Story at root
- Chapters as branches
- Scenes as leaves
- Traditional outline view with visual treatment

### 5. **Navigation & Exploration**

**How do users navigate large stories?**

- **Zoom controls**: Zoom in/out to see detail or overview
- **Minimap**: Bird's eye view in corner, click to pan
- **Chapter tabs**: Switch between chapters quickly
- **Search/filter**: Find scenes by character or status
- **Expand/collapse**: Show/hide chapter contents

---

## Story 5: Node-Based Visual Editor - Proposed Structure

### Story 5.1: Core Node Component
- **Scope**: Build reusable NodeComponent
- **Deliverables**: 
  - SceneNode: displays scene info, status badge, prose preview
  - Hover effects, click handlers
  - Responsive sizing
- **Acceptance Criteria**:
  - ✅ Displays scene number, status, character list
  - ✅ Shows prose preview (max 3 lines)
  - ✅ Responsive to different screen sizes
  - ✅ Color-coded by status

### Story 5.2: Node Graph Layout
- **Scope**: Choose and implement layout strategy
- **Deliverables**:
  - Layout component (Grid/Kanban/Canvas)
  - Scene nodes organized by chapter
  - Responsive to container size
- **Acceptance Criteria**:
  - ✅ All scenes visible on screen (with zoom option)
  - ✅ Grouped by chapter
  - ✅ Adapts to screen size

### Story 5.3: Node Interactions
- **Scope**: Click, hover, context menu actions
- **Deliverables**:
  - Click node → open scene editor
  - Right-click → context menu (delete, duplicate, edit)
  - Hover → show full prose preview
- **Acceptance Criteria**:
  - ✅ Navigation to scene editor works
  - ✅ Context menu shows relevant actions
  - ✅ Hover preview displays full prose

### Story 5.4: Drag & Drop Reordering
- **Scope**: Reorder scenes within/across chapters
- **Deliverables**:
  - Drag scene node to new position
  - Update scene numbers automatically
  - Persist order to database
- **Acceptance Criteria**:
  - ✅ Can drag scene within chapter (reorder)
  - ✅ Scene numbers update
  - ✅ Order persists after reload
  - ✅ Visual feedback during drag

### Story 5.5: Character Visualization
- **Scope**: Show which characters are involved in scenes
- **Deliverables**:
  - Character avatars/tags on scene nodes
  - Filter scenes by character
  - Highlight scenes with specific character
- **Acceptance Criteria**:
  - ✅ Characters shown on scene nodes
  - ✅ Can filter by character
  - ✅ Filtered scenes highlighted visually

### Story 5.6: Status Visualization & Filtering
- **Scope**: Color-code scenes by status, provide filters
- **Deliverables**:
  - Color scheme: draft/generating/complete/error
  - Filter buttons: Show all / Draft only / Complete only
  - Status badge on each node
- **Acceptance Criteria**:
  - ✅ Color-coded status visible
  - ✅ Filter buttons work
  - ✅ Filtered view updates in real-time

### Story 5.7: Zoom & Pan Controls
- **Scope**: Allow users to zoom/pan large story graphs
- **Deliverables**:
  - Zoom in/out buttons or wheel
  - Pan by dragging canvas
  - Fit-to-screen button
  - Minimap in corner
- **Acceptance Criteria**:
  - ✅ Zoom works (at least 50% - 200%)
  - ✅ Pan works smoothly
  - ✅ Minimap shows overview

### Story 5.8: Navigation & Chapter Tabs
- **Scope**: Make large stories manageable
- **Deliverables**:
  - Chapter tabs at top (or sidebar)
  - Switch between chapter views
  - "All chapters" overview option
- **Acceptance Criteria**:
  - ✅ Chapter tabs switch views
  - ✅ Can see all chapters at once (with zoom/pan)
  - ✅ Current chapter highlighted

---

## Technology Stack Recommendations

### For Node-Based UI:

**Primary Choice: React Flow**
- Purpose: Node-based visual editor
- Pros: Purpose-built for nodes/edges, battle-tested, great UX
- Cons: Additional library (~30KB gzip)
- Install: `npm install reactflow`
- Use case: Perfect for our scene node editor

**Alternative: D3.js**
- More flexible, steeper learning curve
- Better for complex graph visualizations
- Overkill for our use case unless we need character relationship graphs

**Alternative: Konva.js**
- Good for interactive graphics
- Better performance for large node counts
- More manual work required

**Recommendation**: Start with **React Flow**
- Simpler to implement
- Built-in features (drag, zoom, pan, minimap)
- Active community, good docs
- Can always swap later if needed

---

## Implementation Phases

### Phase 1: MVP (Stories 5.1-5.3)
- Core node component
- Basic layout (grid by chapter)
- Click to open scene editor
- **Time Estimate**: 6-8 hours
- **Deliverable**: Users can visualize story structure

### Phase 2: UX Polish (Stories 5.4-5.6)
- Drag & drop reordering
- Character visualization
- Status filtering
- **Time Estimate**: 8-10 hours
- **Deliverable**: Interactive visual editor with filtering

### Phase 3: Advanced (Stories 5.7-5.8)
- Zoom & pan controls
- Minimap
- Chapter navigation
- **Time Estimate**: 6-8 hours
- **Deliverable**: Scalable to large stories (100+ scenes)

### Full Story 5 Estimate: **20-26 hours** (3-4 days)

---

## Questions for Mary to Address

1. **Which node type?** (Scene-centric, Chapter-centric, Hybrid, Character-centric)
2. **Which layout?** (Grid, Kanban, Free Canvas, Tree)
3. **MVP scope?** (What's minimum viable vs. nice-to-have?)
4. **Performance concerns?** (Large stories with 100+ scenes)
5. **Mobile support?** (Responsive? Touch-friendly?)
6. **Export/visualization?** (Print story map? Save as image?)

---

## Success Criteria

✅ Users can see visual story structure  
✅ Users can navigate from node to scene editor  
✅ Users can reorder scenes visually  
✅ System remains performant with 100+ scenes  
✅ Clear status/character information on nodes  
✅ Intuitive interactions (drag, click, hover)  

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Performance with many nodes | HIGH | Use React Flow's optimization, virtualization |
| Complex interactions confusing users | MEDIUM | Start with MVP, gather feedback |
| Library limitations (React Flow) | MEDIUM | Evaluate alternatives early |
| Mobile responsiveness | MEDIUM | Design for touch early, test on devices |
| Scope creep | HIGH | Define MVP clearly, prioritize stories 5.1-5.3 |

---

## Next Steps (For Mary)

1. **Review this plan** - Does it align with product vision?
2. **Answer key questions** - Node type? Layout? MVP scope?
3. **Define priorities** - Which stories 5.x are critical vs. nice-to-have?
4. **Tech choice** - Confirm React Flow or suggest alternative?
5. **Create detailed specs** - For each story 5.1-5.8

---

## Appendix: Technology Decision Matrix

### React Flow vs. Alternatives

| Criteria | React Flow | D3.js | Konva.js | Custom |
|----------|-----------|-------|----------|--------|
| Learning curve | Easy | Steep | Medium | Hard |
| Time to implement | Fast (6-8h) | Slow (12-16h) | Medium (8-10h) | Very slow |
| Features built-in | Many | Few | Some | None |
| Performance | Good | Excellent | Excellent | Variable |
| Community | Active | Massive | Good | None |
| Maintenance | Maintained | Maintained | Maintained | You |
| **Recommendation** | ⭐ Start here | Alternative | Alternative | Last resort |

---

**Created for Mary's strategic review**  
**Ready to discuss and refine the vision**
