import { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { StoryNavigationPanel } from './StoryNavigationPanel'
import { ChapterOverview } from './ChapterOverview'
import { SceneEditor } from './SceneEditor'
import { Button } from '@/components/ui/button'
import { useAllStories } from '@/hooks/useConvexQueries'
import type { Id } from '../../convex/_generated/dataModel'

type ViewMode = 'tree' | 'grid'

/**
 * Workspace Component (Stories 5.1 & 5.2)
 *
 * Production-ready split-screen workspace:
 * - Left panel (30%): Story navigation with tree
 * - Right panel (70%): Scene editor
 * - Responsive design (stacks on mobile)
 * - Independent scrolling for each panel
 * - Keyboard shortcuts for navigation (Story 5.2)
 */
export function Workspace() {
  const [viewMode, setViewMode] = useState<ViewMode>('tree')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({})
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [showStoryDropdown, setShowStoryDropdown] = useState(false)

  // Load all stories for grid view selector
  const allStories = useAllStories()

  // Load story tree for keyboard navigation
  const storyTree = useQuery(
    api.stories.getStoryTree,
    selectedStoryId ? { storyId: selectedStoryId as Id<"stories"> } : "skip"
  )

  const selectedStory = allStories.find(s => s._id === selectedStoryId)

  // Build flat list of all scenes for navigation
  const allScenes = storyTree?.chapters.flatMap(ch =>
    ch.scenes.map(scene => ({ ...scene, chapterId: ch._id }))
  ) || []

  // Find current chapter for left/right arrow navigation
  const currentScene = allScenes.find(s => s._id === selectedSceneId)
  const currentChapter = storyTree?.chapters.find(ch => ch._id === currentScene?.chapterId)

  // Keyboard navigation handlers (Story 5.2)
  const navigateToPreviousScene = useCallback(() => {
    if (!selectedSceneId || allScenes.length === 0) return
    const currentIndex = allScenes.findIndex(s => s._id === selectedSceneId)
    if (currentIndex > 0) {
      setSelectedSceneId(allScenes[currentIndex - 1]._id)
    }
  }, [selectedSceneId, allScenes])

  const navigateToNextScene = useCallback(() => {
    if (!selectedSceneId || allScenes.length === 0) return
    const currentIndex = allScenes.findIndex(s => s._id === selectedSceneId)
    if (currentIndex < allScenes.length - 1) {
      setSelectedSceneId(allScenes[currentIndex + 1]._id)
    }
  }, [selectedSceneId, allScenes])

  const toggleCurrentChapter = useCallback((expand: boolean) => {
    if (!currentChapter) return
    setExpandedChapters(prev => ({
      ...prev,
      [currentChapter._id]: expand
    }))
  }, [currentChapter])

  // Keyboard event handler
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

      // Navigation shortcuts
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          navigateToPreviousScene()
          break
        case 'ArrowDown':
          e.preventDefault()
          navigateToNextScene()
          break
        case 'ArrowLeft':
          e.preventDefault()
          toggleCurrentChapter(false)
          break
        case 'ArrowRight':
          e.preventDefault()
          toggleCurrentChapter(true)
          break
        case '?':
          // Show keyboard shortcuts help
          setShowShortcuts(prev => !prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateToPreviousScene, navigateToNextScene, toggleCurrentChapter])

  return (
    <div className="h-screen flex flex-col">
      {/* Header (Story 5.5: Enhanced with polish) */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
              Narrative Canvas
            </h1>
            <span className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-medium transition-colors duration-200">
              PoC
            </span>
            {/* Deployment Test Indicator - Black Square */}
            <div className="w-8 h-8 bg-black" title="Deployment test indicator" />
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 px-1 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <button
                onClick={() => setViewMode('tree')}
                className={`text-xs px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
                  viewMode === 'tree'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tree view - Linear navigation"
              >
                📋 Tree
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`text-xs px-3 py-1.5 rounded-md transition-all duration-200 font-medium ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Grid view - Visual chapter overview"
              >
                🎯 Grid
              </button>
            </div>

            <button
              onClick={() => setShowShortcuts(prev => !prev)}
              className="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 text-slate-700 dark:text-slate-300 hover:shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              title="View keyboard shortcuts (or press ?)"
            >
              ⌨️ Shortcuts
            </button>
            <span className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-200">
              AI-Powered Story Generation
            </span>
          </div>
        </div>
      </header>

      {/* Split-Screen Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Navigation (Tree or Grid View) */}
        {viewMode === 'tree' ? (
          <div className="w-full md:w-[30%] h-64 md:h-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
            <StoryNavigationPanel
              selectedStoryId={selectedStoryId}
              selectedSceneId={selectedSceneId}
              onSelectStory={setSelectedStoryId}
              onSelectScene={setSelectedSceneId}
              expandedChapters={expandedChapters}
              onToggleChapter={(chapterId) => {
                setExpandedChapters(prev => ({
                  ...prev,
                  [chapterId]: !prev[chapterId]
                }))
              }}
            />
          </div>
        ) : (
          <div className="w-full md:w-[40%] h-64 md:h-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0 overflow-hidden">
            {selectedStoryId ? (
              <ChapterOverview
                storyId={selectedStoryId as Id<"stories">}
                onSelectScene={setSelectedSceneId}
                selectedSceneId={selectedSceneId as Id<"scenes">}
              />
            ) : (
              <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-3">
                    Select a Story
                  </h3>
                  {allStories.length === 0 ? (
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      No stories yet. Create one to begin.
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => setShowStoryDropdown(!showStoryDropdown)}
                        className="w-full text-left px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all duration-200 text-sm font-medium text-slate-900 dark:text-white hover:shadow-md focus:ring-2 focus:ring-purple-500"
                      >
                        Choose a story to view chapters...
                      </button>
                      {showStoryDropdown && (
                        <div className="absolute z-20 mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                          {allStories.map((story) => (
                            <button
                              key={story._id}
                              onClick={() => {
                                setSelectedStoryId(story._id)
                                setShowStoryDropdown(false)
                              }}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-150 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                            >
                              {story.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Grid View
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      View all chapters at once in a visual grid layout with progress tracking, drag-drop reordering, and status filtering.
                    </p>
                    <div className="text-xs text-slate-500 dark:text-slate-500 space-y-1">
                      <p>✨ Visual chapter cards</p>
                      <p>📊 Progress tracking</p>
                      <p>🎨 Character badges</p>
                      <p>🔄 Drag & drop scenes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Right Panel - Scene Editor (adjusts width based on view mode) */}
        <div className={`flex-1 overflow-y-auto bg-white dark:bg-slate-900 ${viewMode === 'grid' ? 'md:w-[60%]' : 'md:w-[70%]'}`}>
          {selectedSceneId ? (
            <SceneEditor sceneId={selectedSceneId as Id<"scenes">} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="max-w-md">
                <div className="text-6xl mb-4">✍️</div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                  Select a Scene to Begin
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {viewMode === 'tree'
                    ? 'Choose a story from the left panel, then select a scene to start editing and generating prose.'
                    : 'Expand a chapter and click a scene card to start editing and generating prose.'
                  }
                </p>
                {!selectedStoryId && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                    💡 <strong>Tip:</strong> Create a story using the test components (toggle them in the menu) to get started.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Help Overlay (Story 5.2 + 5.5: Enhanced with animations) */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
                ⌨️ Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShowShortcuts(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-200 hover:scale-110 transform"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-2 rounded">
                <span className="text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">Navigate to previous scene</span>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono shadow-sm">↑</kbd>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-2 rounded">
                <span className="text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">Navigate to next scene</span>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono shadow-sm">↓</kbd>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-2 rounded">
                <span className="text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">Collapse current chapter</span>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono shadow-sm">←</kbd>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-2 rounded">
                <span className="text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">Expand current chapter</span>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono shadow-sm">→</kbd>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 px-2 rounded">
                <span className="text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200">Toggle shortcuts help</span>
                <kbd className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono shadow-sm">?</kbd>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-900 dark:text-blue-100">
                💡 <strong>Tip:</strong> Shortcuts work when not typing in input fields.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
