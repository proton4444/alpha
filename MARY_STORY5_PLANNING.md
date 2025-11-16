# Story 5: Split-Screen Workspace & UX Polish

## Mary's Strategic Analysis & Planning Document

**Status**: PLANNING  
**Epic**: Story 5.1 - 5.5  
**Context**: After Stories 1-4.6 completion  
**Date**: 2025-11-15

---

## Executive Summary

Story 5 focuses on **workspace optimization and UX polish**, moving from the current test-component layout to a **professional split-screen editor** where users can see their story structure on the left and edit scenes on the right. This creates a seamless narrative development environment.

**Vision**: Transform the test-focused UI into a production-ready split-screen workspace that feels professional and intuitive.

---

## Current State (Stories 1-4.6)

### What We Have Now

- ✅ Story/Chapter/Scene CRUD (Stories 2.1-2.3)
- ✅ Character management (Stories 3.1-3.3)
- ✅ AI generation pipeline (Stories 4.1-4.3)
- ✅ Scene editor with prose workflow (Stories 4.5-4.6)

### What's Missing

- ❌ Professional workspace layout
- ❌ Unified scene/story navigation
- ❌ Keyboard shortcuts
- ❌ Visual feedback for generation status
- ❌ Polished design

### Current UI Structure

```
App.tsx (vertical scroll)
├── OpenRouter Test
├── Story CRUD Test
├── Chapter Management Test
├── Scene Management Test
├── Story Tree Test
├── Character CRUD Test
├── Character Manager UI
├── Scene Editor UI
└── shadcn/ui Demo
```

**Problem**: Users must scroll through many test sections to access features. No integrated workflow.

---

## Story 5: Split-Screen Workspace Vision

### New UI Structure (After Story 5)

```
App.tsx (split-screen layout)
├── Header (navigation, theme toggle)
└── Main Content
    ├── Left Panel (30% width) - StoryTree
    │   ├── Story selector
    │   ├── Chapter list (collapsible)
    │   ├── Scene list (with status badges)
    │   └── Character list
    │
    └── Right Panel (70% width) - SceneEditor
        ├── Scene header with status
        ├── Outline input (auto-save)
        ├── Generate button
        ├── Prose display/editor
        ├── Accept/Regenerate/Edit buttons
        └── Generation feedback
```

**Experience**: Users open app → see story tree → select scene → edit in right panel. Professional, unified workflow.

---

## Story 5.1: Split-Screen Layout with Responsive Design

### Acceptance Criteria

✅ **Left Panel - StoryTree (30% width)**

- Display story tree with chapters and scenes
- Show character list for current story
- Show scene status badges
- Collapsible chapters to reduce clutter
- Click to select scene

✅ **Right Panel - SceneEditor (70% width)**

- Display full SceneEditor component
- Takes remaining 70% of screen width
- Full height with scrolling
- Professional spacing and margins

✅ **Split-Screen Layout**

- Horizontal split using CSS Grid or Flexbox
- Fixed left panel width (30%)
- Flexible right panel (70%)
- Proper separator/gap between panels

✅ **Independent Scrolling**

- Left panel scrolls independently
- Right panel scrolls independently
- No scroll interference
- Overflow hidden properly

✅ **Responsive Design**

- **Desktop** (> 1200px): 30/70 split
- **Tablet** (768px - 1200px): 25/75 or stacked columns
- **Mobile** (< 768px): Full-width stacked (tree above, editor below)
- Touch-friendly button sizes on mobile

✅ **Polish Elements**

- Clean header/navigation area
- Theme toggle (dark/light mode)
- Professional spacing (Tailwind)
- Visual hierarchy clear

### Implementation Approach

**Layout Structure**:

```tsx
<div className="flex h-screen">
  {/* Left Panel - StoryTree (30%) */}
  <div className="w-3/10 border-r overflow-y-auto bg-slate-50">
    <StoryNavigationPanel />
  </div>

  {/* Right Panel - SceneEditor (70%) */}
  <div className="w-7/10 overflow-y-auto">
    <SceneEditor />
  </div>
</div>
```

**Responsive Breakpoints**:

```tsx
// Mobile: full-width stacked
<div className="flex flex-col md:flex-row h-screen">
  <div className="w-full md:w-3/10 border-b md:border-r">
    <StoryNavigationPanel />
  </div>
  <div className="w-full md:w-7/10">
    <SceneEditor />
  </div>
</div>
```

### Mary's Analysis: Strategic Considerations

**Pros of Split-Screen**:

- ✅ Professional appearance (like VS Code, Figma)
- ✅ Context always visible (story structure on left)
- ✅ Efficient use of screen space
- ✅ No scrolling to switch between sections
- ✅ Clear information hierarchy

**Potential Issues**:

- ⚠️ Requires minimum screen width (~1024px recommended)
- ⚠️ Mobile users need stacked layout
- ⚠️ Left panel might feel cramped on small screens
- ⚠️ Performance with large stories (100+ scenes)

**Mitigations**:

- ✅ Responsive design handles mobile (Story 5.1)
- ✅ Collapsible chapters reduce visual clutter
- ✅ Virtual scrolling if needed later (performance)
- ✅ Clear responsive breakpoints

---

## Remaining Epic 5 Stories

### Story 5.2: Keyboard Shortcuts for Navigation

**Purpose**: Power users can navigate using keyboard

**Shortcuts**:

- **↑ Arrow Up**: Select previous scene
- **↓ Arrow Down**: Select next scene
- **← Arrow Left**: Collapse/expand chapter
- **→ Arrow Right**: Expand chapter
- **Enter/Return**: Generate prose for selected scene
- **Ctrl+S** (or **⌘+S** on Mac): Save scene
- **Ctrl+E** (or **⌘+E**): Toggle edit mode on prose

**Implementation**:

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') selectPreviousScene();
    else if (e.key === 'ArrowDown') selectNextScene();
    else if (e.key === 'ArrowLeft') collapseChapter();
    else if (e.key === 'ArrowRight') expandChapter();
    else if (e.key === 'Enter') generateProse();
    else if ((e.ctrlKey || e.metaKey) && e.key === 's') saveScene();
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [selectedSceneId]);
```

**Acceptance Criteria**:

- ✅ Arrow keys navigate scenes
- ✅ Enter generates prose
- ✅ Keyboard hints shown in UI (tooltip or help)
- ✅ Shortcuts documented
- ✅ Works with existing mouse interactions

---

### Story 5.3: Visual Status Indicators and Badges in StoryTree

**Purpose**: See scene status at a glance in the story tree

**Current State**: SceneEditor shows status badges, but StoryTree doesn't

**Enhancements**:

```
StoryTree Scene List:
├── Scene 1: The Beginning [✓ COMPLETE]
├── Scene 2: The Encounter [⏳ GENERATING]
├── Scene 3: The Revelation [DRAFT]
├── Scene 4: The Resolution [⚠ ERROR]
└── Scene 5: The Epilogue [DRAFT]
```

**Visual Design**:

- **Draft** (Gray): `bg-gray-300 text-gray-800`
- **Generating** (Blue with animation): `bg-blue-500 text-white animate-pulse`
- **Complete** (Green checkmark): `bg-green-500 text-white`
- **Error** (Red warning): `bg-red-500 text-white`

**Additional Badges**:

- Prose word count (small gray text): "487 words"
- Regeneration count: "Regen ×3" (if regenerated)
- Character involvement: Small character initials/avatars

**Implementation**:

```tsx
<div className="scene-item flex justify-between items-center p-2">
  <span className="scene-number">
    Scene {scene.sceneNumber}: {scene.title}
  </span>
  <div className="badges flex gap-1">
    <StatusBadge status={scene.status} />
    {scene.regenerationCount > 0 && <span className="text-xs bg-yellow-100">Regen ×{scene.regenerationCount}</span>}
    {scene.prose && <span className="text-xs text-slate-500">{proseWordCount(scene.prose)} words</span>}
  </div>
</div>
```

**Acceptance Criteria**:

- ✅ Status badges visible in StoryTree
- ✅ Color-coded by status
- ✅ Word count displayed
- ✅ Regeneration count shown
- ✅ Badges update reactively

---

### Story 5.4: GenerationStatus Component with Progress Feedback

**Purpose**: Better feedback during AI generation

**Current State**: Simple "Generating..." message in SceneEditor

**Enhancement**: Dedicated component showing generation pipeline

**Component Display**:

```
🤖 AI Generation in Progress (Scene 3)

Step 1/2: Analyzing Characters...
├── Loaded 2 characters
├── Marcus (warrior)
└── Elena (mage)

Step 2/2: Writing Prose...
████████░░ ~3 seconds remaining

Tip: This typically takes 5-10 seconds
Press Esc to cancel (data will be saved)
```

**Features**:

- ✅ Step-by-step progress (Character Agent → Scene Writer)
- ✅ Loaded characters shown
- ✅ Progress bar (estimated time remaining)
- ✅ Helpful tip about expected time
- ✅ Cancel option (saves outline, skips generation)
- ✅ Graceful error message if generation fails

**Implementation**:

```tsx
interface GenerationStatusProps {
  sceneId: string;
  currentStep: 1 | 2; // Character Agent or Scene Writer
  characters: Character[];
  elapsedTime: number;
  isError?: boolean;
  errorMessage?: string;
}

export const GenerationStatus: React.FC<GenerationStatusProps> = ({ currentStep, characters, elapsedTime }) => {
  const estimatedTotalTime = 8000; // 8 seconds typical
  const progressPercent = Math.min((elapsedTime / estimatedTotalTime) * 100, 90);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900">🤖 AI Generation in Progress</h3>

      <div className="mt-3 space-y-2">
        <div className="text-sm">
          <span className={currentStep === 1 ? 'font-bold' : ''}>Step 1: Analyzing Characters...</span>
          {currentStep >= 1 && <span className="text-green-600"> ✓</span>}
        </div>

        {characters.length > 0 && (
          <ul className="ml-4 text-sm text-slate-700">
            {characters.map((char) => (
              <li key={char._id}>- {char.name}</li>
            ))}
          </ul>
        )}

        <div className="text-sm mt-2">
          <span className={currentStep === 2 ? 'font-bold' : ''}>Step 2: Writing Prose...</span>
          {currentStep >= 2 && <span className="text-green-600"> ✓</span>}
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs text-blue-700 mt-1">~{Math.max(0, Math.round((estimatedTotalTime - elapsedTime) / 1000))}s remaining</p>
      </div>

      <p className="text-xs text-blue-700 mt-3">💡 This typically takes 5-10 seconds</p>
    </div>
  );
};
```

**Acceptance Criteria**:

- ✅ Shows current step (Character Agent or Scene Writer)
- ✅ Lists characters being analyzed
- ✅ Progress bar with time estimate
- ✅ Helpful messaging
- ✅ Error handling if generation fails

---

### Story 5.5: Polish Visual Design with Tailwind Styling

**Purpose**: Make the app look professional and polished

**Current Issues**:

- ❌ Test components have rough styling
- ❌ Inconsistent spacing and colors
- ❌ No visual hierarchy
- ❌ Typography needs refinement

**Design Improvements**:

**1. Color Palette (Tailwind)**:

```
Primary: slate-900 (dark, professional)
Accent: purple-600 (generation/AI)
Success: green-600
Warning: yellow-600
Error: red-600
Backgrounds: slate-50 / slate-900 (dark mode)
Borders: slate-200 / slate-700 (dark mode)
```

**2. Typography**:

```
Heading 1: text-3xl font-bold
Heading 2: text-2xl font-semibold
Heading 3: text-xl font-semibold
Body: text-base
Small: text-sm
Tiny: text-xs

Font Stack: Default Tailwind (system fonts)
Dark mode: white text on dark backgrounds
```

**3. Spacing**:

```
Container padding: px-6 py-6
Section gaps: space-y-4
Button gaps: gap-2
Border radius: rounded-lg (8px)
Card padding: p-6
```

**4. Component Styling**:

- Buttons: Consistent sizing, hover states, focus states
- Cards: Subtle shadows, proper borders, spacing
- Inputs: Focus indicators, clear labels
- Status badges: Consistent sizing, clear colors
- Icons: Emoji or SVG icons, 16-24px sizes

**5. Dark Mode**:

- Full dark mode support
- Toggle in header (☀️ / 🌙)
- Proper contrast ratios
- Persists to localStorage

**6. Responsive Refinement**:

- Proper padding on mobile (px-4 instead of px-6)
- Larger touch targets (min 44px)
- Proper text scaling
- Breakpoint-specific styling

**Example Before/After**:

**Before (Test Component)**:

```tsx
<div className="border rounded-lg p-6 bg-slate-50 space-y-4">
  <h3 className="text-xl font-semibold mb-4">Scene Management Test</h3>
  <textarea placeholder="Scene outline..." />
  <button>Add</button>
</div>
```

**After (Polished)**:

```tsx
<div className="rounded-lg border border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700 shadow-sm p-6 space-y-4">
  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Scene Management</h3>
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Scene Outline</label>
    <textarea
      placeholder="Enter your scene outline..."
      className="w-full rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 focus:ring-2 focus:ring-purple-500"
    />
  </div>
  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
    Generate Scene
  </button>
</div>
```

**Acceptance Criteria**:

- ✅ Consistent color palette throughout
- ✅ Professional typography
- ✅ Proper spacing and layout
- ✅ Dark mode works perfectly
- ✅ Responsive on all devices
- ✅ Proper contrast ratios (WCAG AA)
- ✅ Smooth transitions and hover states
- ✅ Icons and visual elements consistent

---

## Implementation Timeline

### Story 5.1: Split-Screen Layout

- **Estimate**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Low (CSS/layout only)
- **Priority**: Critical (foundation for others)

### Story 5.2: Keyboard Shortcuts

- **Estimate**: 1-2 hours
- **Complexity**: Low
- **Risk**: Low
- **Priority**: High (improves UX significantly)

### Story 5.3: Visual Badges in StoryTree

- **Estimate**: 1-2 hours
- **Complexity**: Low
- **Risk**: Low
- **Priority**: High (status visibility important)

### Story 5.4: GenerationStatus Component

- **Estimate**: 2-3 hours
- **Complexity**: Medium
- **Risk**: Medium (timing/progress calculation)
- **Priority**: Medium (nice-to-have, improves feedback)

### Story 5.5: Polish Visual Design

- **Estimate**: 3-4 hours
- **Complexity**: Low-Medium
- **Risk**: Low
- **Priority**: High (final polish)

**Total Epic 5 Estimate**: **9-14 hours** (1-2 days)

---

## Mary's Strategic Recommendations

### What to Prioritize

1. **Start with 5.1** - Split-screen foundation
2. **Then 5.5** - Polish design (improves perception)
3. **Then 5.2** - Keyboard shortcuts
4. **Then 5.3** - Status badges
5. **Then 5.4** - Advanced generation feedback

**Rationale**: Prioritizes visual polish and essential features before optional enhancements.

### Alternative Approach

1. **5.1** - Layout foundation
2. **5.3** - Status badges (quick win, big impact)
3. **5.2** - Keyboard shortcuts (improves workflow)
4. **5.4** - Generation status (nice-to-have)
5. **5.5** - Polish (final touches)

**Rationale**: Delivers features in order of user impact, Polish can be iterative.

### Risk Mitigation

- ✅ Implement Story 5.1 first (foundation)
- ✅ Test responsiveness on real devices
- ✅ Use Tailwind's built-in responsive utilities
- ✅ Maintain dark mode through all stories
- ✅ No performance changes in 5.4 (estimated time only)

---

## Success Criteria (Entire Story 5)

After completing Story 5.1-5.5:

- ✅ Professional split-screen workspace
- ✅ Users navigate with keyboard or mouse
- ✅ Status visible at all times
- ✅ Clear generation feedback
- ✅ Polished, professional appearance
- ✅ Works on desktop, tablet, mobile
- ✅ Dark mode fully supported
- ✅ Responsive to all screen sizes
- ✅ Accessibility standards met (WCAG AA)
- ✅ No test components visible (production-ready)

---

## Next Steps for Mary

1. **Review this plan** - Does it align with product vision?
2. **Confirm priority order** - Which approach preferred?
3. **Approve scope** - All 5 stories or subset?
4. **Design decisions** - Color palette, typography OK?
5. **Timeline** - 1-2 days feasible?

---

## Appendix: Component Layout Reference

### Split-Screen Structure

```
┌─────────────────────────────────────────────┐
│ Header (Navigation, Theme Toggle)           │
├──────────────┬──────────────────────────────┤
│              │                              │
│ Left Panel   │ Right Panel                  │
│ (30%)        │ (70%)                        │
│              │                              │
│ StoryTree    │ SceneEditor                  │
│ - Story      │ - Outline input              │
│   - Chapter  │ - Generate button            │
│     - Scene  │ - Prose display              │
│   - Chapter  │ - Accept/Regenerate/Edit     │
│ Characters   │ - Status badges              │
│              │ - Error handling             │
│              │                              │
│ Independent  │ Independent                  │
│ scroll       │ scroll                       │
└──────────────┴──────────────────────────────┘
```

### Mobile Responsive

```
┌─────────────────────────┐
│ Header                  │
├─────────────────────────┤
│ Left Panel (StoryTree)  │
│ (100% width, scrollable)│
│                         │
├─────────────────────────┤
│ Right Panel (SceneEd)   │
│ (100% width, scrollable)│
│                         │
└─────────────────────────┘
```

---

**Created for Mary's strategic review and approval**  
**Ready to implement after confirmation**
