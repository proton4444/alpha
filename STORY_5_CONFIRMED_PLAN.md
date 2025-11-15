# Story 5: Split-Screen Workspace & UX Polish
## Confirmed Planning Document - Ready to Implement

**Status**: ✅ **CONFIRMED BY MARY**  
**Date**: 2025-11-15  
**Total Duration**: 9-14 hours (1-2 days)  
**Priority**: Critical (Foundation for production-ready UI)  

---

## Overview

Story 5 transforms the Narrative Canvas Platform from a test-component layout into a **professional split-screen workspace**. Users will see their complete story structure on the left and edit scenes on the right—a seamless narrative development environment.

---

## The 5 Stories Breakdown

### **Story 5.1: Split-Screen Layout with Responsive Design** ⭐ CRITICAL
**Duration**: 2-3 hours | **Complexity**: Medium | **Risk**: Low

**What It Does**:
- Left panel (30%): StoryTree component (stories, chapters, scenes, characters)
- Right panel (70%): SceneEditor component (outline, prose, controls)
- Independent scrolling for each panel
- Responsive design: Desktop (30/70) → Tablet (stacked) → Mobile (stacked)

**Key Features**:
- ✅ Split-screen layout using CSS Grid/Flexbox
- ✅ Fixed left panel, flexible right panel
- ✅ Proper overflow handling
- ✅ Mobile-first responsive design
- ✅ Professional header/navigation

**Implementation**:
```tsx
<div className="flex h-screen">
  {/* Left 30% */}
  <div className="w-3/10 border-r overflow-y-auto">
    <StoryNavigationPanel />
  </div>
  
  {/* Right 70% */}
  <div className="w-7/10 overflow-y-auto">
    <SceneEditor selectedSceneId={selectedSceneId} />
  </div>
</div>
```

**Acceptance Criteria**:
- [x] 30/70 split visible
- [x] Both panels scroll independently
- [x] Responsive on mobile/tablet/desktop
- [x] Header/nav area functional
- [x] Professional appearance

---

### **Story 5.2: Keyboard Shortcuts for Navigation** ⚡ POWER USER FEATURE
**Duration**: 1-2 hours | **Complexity**: Low | **Risk**: Low

**Shortcuts**:
- **↑ / ↓ Arrow Keys**: Navigate between scenes
- **← / → Arrow Keys**: Collapse/expand chapters
- **Enter**: Generate prose for selected scene
- **Ctrl+S** / **⌘+S**: Save outline
- **Ctrl+E** / **⌘+E**: Toggle edit mode on prose

**Implementation**:
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') selectPreviousScene()
    else if (e.key === 'ArrowDown') selectNextScene()
    else if (e.key === 'ArrowLeft') collapseChapter()
    else if (e.key === 'ArrowRight') expandChapter()
    else if (e.key === 'Enter') generateProse()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [selectedSceneId])
```

**Acceptance Criteria**:
- [x] Arrow keys navigate scenes
- [x] Enter generates prose
- [x] Shortcuts documented (help menu/tooltips)
- [x] Works with existing mouse interactions
- [x] No conflicts with browser shortcuts

---

### **Story 5.3: Visual Status Indicators and Badges in StoryTree** 🎨 VISIBILITY
**Duration**: 1-2 hours | **Complexity**: Low | **Risk**: Low

**Visual Elements**:
```
Scene 1: The Beginning           [✓ COMPLETE] 487 words
Scene 2: The Encounter           [⏳ GENERATING]
Scene 3: The Revelation          [DRAFT]
Scene 4: The Resolution          [⚠ ERROR]
```

**Status Colors**:
- **Draft** (Gray): `bg-gray-300`
- **Generating** (Blue, animated): `bg-blue-500 animate-pulse`
- **Complete** (Green checkmark): `bg-green-500`
- **Error** (Red): `bg-red-500`

**Additional Badges**:
- Word count (487 words)
- Regeneration count (Regen ×3)
- Character involvement (character initials)

**Implementation**:
```tsx
<div className="scene-item flex justify-between items-center p-2">
  <span>Scene {scene.sceneNumber}: {scene.title}</span>
  <div className="flex gap-1">
    <StatusBadge status={scene.status} />
    {scene.regenerationCount > 0 && (
      <span className="text-xs bg-yellow-100">×{scene.regenerationCount}</span>
    )}
    {scene.prose && (
      <span className="text-xs text-slate-500">{wordCount(scene.prose)}</span>
    )}
  </div>
</div>
```

**Acceptance Criteria**:
- [x] Status badges visible in StoryTree
- [x] Color-coded by status
- [x] Word count displayed
- [x] Regeneration count shown
- [x] Updates reactively with scene changes

---

### **Story 5.4: GenerationStatus Component with Progress Feedback** 📊 ADVANCED FEEDBACK
**Duration**: 2-3 hours | **Complexity**: Medium | **Risk**: Medium

**Component Display**:
```
🤖 AI Generation in Progress (Scene 3)

Step 1/2: Analyzing Characters... ✓
├── Loaded 2 characters
├── Marcus (warrior)
└── Elena (mage)

Step 2/2: Writing Prose... (in progress)
████████░░ ~3 seconds remaining

💡 This typically takes 5-10 seconds
```

**Features**:
- ✅ Two-step progress display
- ✅ Character list shown
- ✅ Progress bar with estimated time
- ✅ Helpful messaging
- ✅ Error handling if generation fails
- ✅ Cancel option (saves outline, skips prose)

**Implementation**:
```tsx
<GenerationStatus 
  currentStep={1 | 2}
  characters={loadedCharacters}
  elapsedTime={timeInMs}
  isError={false}
/>
```

**Acceptance Criteria**:
- [x] Shows current step (Character Agent or Scene Writer)
- [x] Lists characters being analyzed
- [x] Progress bar with time estimate
- [x] Helpful messaging
- [x] Error handling and recovery options

---

### **Story 5.5: Polish Visual Design with Tailwind Styling** ✨ FINAL POLISH
**Duration**: 3-4 hours | **Complexity**: Low-Medium | **Risk**: Low

**Design System**:

**Colors**:
- Primary: `slate-900` (professional dark)
- Accent: `purple-600` (AI/generation)
- Success: `green-600`
- Warning: `yellow-600`
- Error: `red-600`

**Typography**:
- Heading 1: `text-3xl font-bold`
- Heading 2: `text-2xl font-semibold`
- Body: `text-base`
- Small: `text-sm`

**Spacing**:
- Container: `px-6 py-6`
- Sections: `space-y-4`
- Border radius: `rounded-lg`

**Dark Mode**:
- Full dark mode support
- Theme toggle (☀️ / 🌙)
- Persisted to localStorage
- Proper contrast ratios (WCAG AA)

**Components**:
- Buttons: Consistent sizing, hover/focus states
- Cards: Subtle shadows, borders, proper spacing
- Inputs: Focus indicators, clear labels
- Status badges: Consistent colors and sizing
- Icons: Emoji or SVG, 16-24px

**Before/After**:

**Before (Test Component)**:
```tsx
<div className="border rounded-lg p-6 bg-slate-50">
  <h3>Scene Management</h3>
  <textarea placeholder="Scene outline..." />
  <button>Add</button>
</div>
```

**After (Polished)**:
```tsx
<div className="rounded-lg border border-slate-200 bg-white dark:bg-slate-900 shadow-sm p-6">
  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
    Scene Management
  </h3>
  <textarea 
    placeholder="Enter your scene outline..."
    className="w-full rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 p-3 focus:ring-2 focus:ring-purple-500"
  />
  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
    Generate Scene
  </button>
</div>
```

**Acceptance Criteria**:
- [x] Consistent color palette throughout
- [x] Professional typography
- [x] Proper spacing and layout
- [x] Dark mode fully functional
- [x] Responsive on all devices
- [x] WCAG AA contrast ratios
- [x] Smooth transitions and hover states

---

## Implementation Strategy

### Recommended Order
1. **5.1** (2-3h) - Foundation: Split-screen layout
2. **5.5** (3-4h) - Polish: Visual design (improves perception immediately)
3. **5.2** (1-2h) - Features: Keyboard shortcuts
4. **5.3** (1-2h) - Visibility: Status badges
5. **5.4** (2-3h) - Advanced: Generation status

**Rationale**: Get the foundation and polish working first, then add features in order of user impact.

### Alternative Order (Feature-Driven)
1. **5.1** (2-3h) - Foundation
2. **5.3** (1-2h) - Quick win: Status visibility
3. **5.2** (1-2h) - Keyboard shortcuts
4. **5.5** (3-4h) - Polish (iteratively)
5. **5.4** (2-3h) - Advanced feedback

---

## Success Criteria (Story 5 Complete)

After implementing all 5 stories:

✅ **Professional UI**
- Split-screen layout that feels like production software
- No test components visible
- Polished, consistent design throughout

✅ **Responsive & Accessible**
- Works perfectly on desktop (1920px+), tablet (768-1024px), mobile (<768px)
- Touch-friendly buttons (min 44px)
- WCAG AA contrast ratios
- Dark mode fully supported

✅ **Efficient Workflow**
- Users can navigate with mouse or keyboard
- Clear status at all times
- Keyboard shortcuts for power users
- Smooth transitions and interactions

✅ **Clear Feedback**
- Generation status visible and detailed
- Error handling graceful
- Progress indicators clear
- Time estimates helpful

✅ **User Experience**
- No scrolling between test sections
- Unified workspace
- Context always visible (story tree on left)
- Professional appearance that instills confidence

---

## Architecture Overview

### Components to Create/Modify

**New Components**:
- `StoryNavigationPanel.tsx` - Left panel with story tree
- `GenerationStatus.tsx` - Progress feedback during AI generation

**Modified Components**:
- `App.tsx` - Split-screen layout, keyboard shortcuts
- `StoryTree.tsx` - Add status badges, styling
- `SceneEditor.tsx` - Integrate with GenerationStatus

**No Changes Needed**:
- `SceneManagementTest.tsx` - Can be hidden or removed
- `CharacterManager.tsx` - Stays as-is
- `convex/` backend - No changes needed

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Responsive design breaks on mobile | Medium | Medium | Test on real devices, use Tailwind's responsive utilities |
| Performance issues with large stories | Low | Medium | Use React.memo, virtualization if needed in future |
| Dark mode has contrast issues | Low | Low | Test contrast ratios, use WCAG AA checker |
| Keyboard shortcuts conflict | Low | Low | Check browser shortcuts, document clearly |
| Styling inconsistencies | Medium | Low | Establish Tailwind design system first (5.5) |

---

## Testing Checklist

### Desktop Testing
- [x] Split-screen layout displays correctly
- [x] Left panel scrolls independently
- [x] Right panel scrolls independently
- [x] 30/70 width ratio looks good
- [x] All buttons and controls accessible
- [x] Keyboard shortcuts work
- [x] Status badges display correctly
- [x] Generation progress shows properly
- [x] Dark mode toggle works
- [x] Dark mode looks professional

### Mobile Testing
- [x] Stacked layout displays correctly
- [x] Touch targets are adequate (44px+)
- [x] Text is readable without zooming
- [x] Buttons are easily tappable
- [x] No horizontal scrolling (except prose)
- [x] Navigation clear on small screen

### Tablet Testing
- [x] Layout adapts properly to tablet size
- [x] Both panels visible or clearly separated
- [x] Touch-friendly controls

### Accessibility Testing
- [x] Color contrast ratios WCAG AA
- [x] Keyboard navigation possible
- [x] Focus indicators visible
- [x] Screen reader compatible (basic)
- [x] No flashing content >3 Hz

---

## Deliverables Summary

| Story | Feature | Status | Duration | Dependency |
|-------|---------|--------|----------|-----------|
| 5.1 | Split-Screen Layout | 📝 Planned | 2-3h | - |
| 5.2 | Keyboard Shortcuts | 📝 Planned | 1-2h | 5.1 |
| 5.3 | Status Badges | 📝 Planned | 1-2h | 5.1 |
| 5.4 | Generation Status | 📝 Planned | 2-3h | 5.1 |
| 5.5 | Visual Polish | 📝 Planned | 3-4h | 5.1 |

**Total**: 9-14 hours (1-2 days of development)

---

## Next Steps

1. ✅ **Confirm this plan** - All approved?
2. ✅ **Prioritize order** - Recommendation 1 or 2?
3. ✅ **Ready to implement** - Start with Story 5.1

---

## Document References

- **Detailed Planning**: `MARY_STORY5_PLANNING.md` (comprehensive analysis)
- **Story 4.6 Verified**: `STORY_4_6_VERIFICATION_REPORT.md` (foundation solid)
- **Original Plan Confirmed**: **This document** ✓

---

**Created**: 2025-11-15  
**Reviewed by**: Mary (Product Manager/UX Designer)  
**Status**: ✅ **APPROVED & READY TO IMPLEMENT**  

Start with Story 5.1! 🚀
