import { useState } from 'react'
import { StoryNavigationPanel } from './StoryNavigationPanel'
import { SceneEditor } from './SceneEditor'
import { Button } from '@/components/ui/button'
import type { Id } from '../../convex/_generated/dataModel'

/**
 * Workspace Component (Story 5.1)
 *
 * Production-ready split-screen workspace:
 * - Left panel (30%): Story navigation with tree
 * - Right panel (70%): Scene editor
 * - Responsive design (stacks on mobile)
 * - Independent scrolling for each panel
 */
export function Workspace() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Narrative Canvas
            </h1>
            <span className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-medium">
              PoC
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              AI-Powered Story Generation
            </span>
          </div>
        </div>
      </header>

      {/* Split-Screen Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Story Navigation (30% on desktop, full width on mobile) */}
        <div className="w-full md:w-[30%] h-64 md:h-full border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
          <StoryNavigationPanel
            selectedStoryId={selectedStoryId}
            selectedSceneId={selectedSceneId}
            onSelectStory={setSelectedStoryId}
            onSelectScene={setSelectedSceneId}
          />
        </div>

        {/* Right Panel - Scene Editor (70% on desktop, full width on mobile) */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-900">
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
                  Choose a story from the left panel, then select a scene to start editing and generating prose.
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
    </div>
  )
}
