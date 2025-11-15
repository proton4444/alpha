import { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { ChapterOverview } from './ChapterOverview'
import { SceneEditor } from './SceneEditor'
import type { Id } from '../../convex/_generated/dataModel'

/**
 * ChapterWorkspace Props
 */
interface ChapterWorkspaceProps {
  /** ID of the story to display */
  storyId: Id<"stories">
}

/**
 * ChapterWorkspace Component (Story 6.3)
 *
 * Integrates ChapterOverview with SceneEditor to create a complete
 * chapter-centric editing workflow.
 *
 * Features:
 * - Split-screen layout (40% chapters, 60% editor)
 * - Scene selection via click
 * - SceneEditor integration (Story 4.6)
 * - Keyboard navigation within expanded chapter
 * - Selected scene visual highlighting
 * - Responsive design
 *
 * Layout:
 * - Left Panel (40%): ChapterOverview with grid
 * - Right Panel (60%): SceneEditor
 *
 * Keyboard Navigation (Story 6.3):
 * - ArrowUp: Navigate to previous scene in expanded chapter
 * - ArrowDown: Navigate to next scene in expanded chapter
 * - Escape: Deselect current scene
 * - Disabled when typing in inputs/textareas
 *
 * Acceptance Criteria:
 * AC1: Click scene card to select it ✓
 * AC2: Selection triggers SceneEditor update ✓
 * AC3: Selected scene visually highlighted ✓ (via ChapterNode)
 * AC4: Arrow key navigation within chapter ✓
 * AC5: Integration with existing SceneEditor ✓
 * AC6: Scene selection persists across expand/collapse ✓
 */
export function ChapterWorkspace({ storyId }: ChapterWorkspaceProps) {
  // State: Selected scene for editing
  const [selectedSceneId, setSelectedSceneId] = useState<Id<"scenes"> | null>(null)

  // Load story tree to access chapter/scene data for navigation
  const storyTree = useQuery(api.stories.getStoryTree, { storyId })

  // Find the expanded chapter (the one containing scenes to navigate)
  // We'll track which chapter has a selected scene
  const selectedScene = storyTree?.chapters
    .flatMap(ch => ch.scenes.map(scene => ({ ...scene, chapterId: ch._id })))
    .find(s => s._id === selectedSceneId)

  const expandedChapter = storyTree?.chapters.find(
    ch => ch._id === selectedScene?.chapterId
  )

  // Build list of scenes in the expanded chapter for navigation
  const scenesInExpandedChapter = expandedChapter?.scenes || []

  // Keyboard navigation: Navigate within expanded chapter only
  const navigateToPreviousScene = useCallback(() => {
    if (!selectedSceneId || scenesInExpandedChapter.length === 0) return

    const currentIndex = scenesInExpandedChapter.findIndex(s => s._id === selectedSceneId)
    if (currentIndex > 0) {
      setSelectedSceneId(scenesInExpandedChapter[currentIndex - 1]._id)
    }
  }, [selectedSceneId, scenesInExpandedChapter])

  const navigateToNextScene = useCallback(() => {
    if (!selectedSceneId || scenesInExpandedChapter.length === 0) return

    const currentIndex = scenesInExpandedChapter.findIndex(s => s._id === selectedSceneId)
    if (currentIndex < scenesInExpandedChapter.length - 1) {
      setSelectedSceneId(scenesInExpandedChapter[currentIndex + 1]._id)
    }
  }, [selectedSceneId, scenesInExpandedChapter])

  const deselectScene = useCallback(() => {
    setSelectedSceneId(null)
  }, [])

  // Keyboard event handler (Story 6.3 AC4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return
      }

      // Navigation shortcuts (within expanded chapter only)
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          navigateToPreviousScene()
          break
        case 'ArrowDown':
          e.preventDefault()
          navigateToNextScene()
          break
        case 'Escape':
          e.preventDefault()
          deselectScene()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateToPreviousScene, navigateToNextScene, deselectScene])

  // Handle scene selection from ChapterOverview
  const handleSelectScene = (sceneId: Id<"scenes">) => {
    setSelectedSceneId(sceneId)
  }

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Left Panel - ChapterOverview (40% on desktop, full width on mobile) */}
      <div className="w-full md:w-[40%] h-64 md:h-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
        <ChapterOverview
          storyId={storyId}
          onSelectScene={handleSelectScene}
          selectedSceneId={selectedSceneId}
        />
      </div>

      {/* Right Panel - SceneEditor (60% on desktop, full width on mobile) */}
      <div className="w-full md:w-[60%] h-full overflow-hidden flex-shrink-0">
        {selectedSceneId ? (
          <SceneEditor sceneId={selectedSceneId} />
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="text-slate-400 dark:text-slate-600 mb-4">
                <svg
                  className="inline-block w-20 h-20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                No Scene Selected
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Expand a chapter and click on a scene to start editing
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-500 space-y-1">
                <p>💡 Tip: Use arrow keys (↑ ↓) to navigate between scenes</p>
                <p>💡 Tip: Press Esc to deselect a scene</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
