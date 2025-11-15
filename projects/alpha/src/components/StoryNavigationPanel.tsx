import { useState } from 'react'
import { StoryTree } from './StoryTree'
import { Button } from '@/components/ui/button'
import { useAllStories } from '@/hooks/useConvexQueries'
import type { Id } from '../../convex/_generated/dataModel'

interface StoryNavigationPanelProps {
  selectedStoryId: Id<"stories"> | string | null
  selectedSceneId: Id<"scenes"> | string | null
  onSelectStory: (storyId: Id<"stories"> | string) => void
  onSelectScene: (sceneId: Id<"scenes">) => void
  expandedChapters?: Record<string, boolean>
  onToggleChapter?: (chapterId: string) => void
}

/**
 * StoryNavigationPanel Component (Stories 5.1 & 5.2)
 *
 * Left sidebar panel (30% width) containing:
 * - Story selection dropdown
 * - StoryTree with chapters and scenes
 * - Quick actions (New Story, etc.)
 *
 * Designed for independent scrolling and responsive layout
 * Story 5.2: Supports external chapter expansion control for keyboard shortcuts
 */
export function StoryNavigationPanel({
  selectedStoryId,
  selectedSceneId,
  onSelectStory,
  onSelectScene,
  expandedChapters,
  onToggleChapter,
}: StoryNavigationPanelProps) {
  const stories = useAllStories()
  const [showStorySelector, setShowStorySelector] = useState(false)

  // Find the selected story
  const selectedStory = stories.find(s => s._id === selectedStoryId)

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="flex-shrink-0 p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
          Story Navigator
        </h2>

        {/* Story Selector */}
        {stories.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400">
            No stories yet. Create one to begin.
          </div>
        ) : (
          <div className="space-y-2">
            <div className="relative">
              <button
                onClick={() => setShowStorySelector(!showStorySelector)}
                className="w-full text-left px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors text-sm font-medium text-slate-900 dark:text-white truncate"
              >
                {selectedStory ? selectedStory.title : 'Select a story...'}
              </button>

              {/* Dropdown */}
              {showStorySelector && (
                <div className="absolute z-20 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {stories.map((story) => (
                    <button
                      key={story._id}
                      onClick={() => {
                        onSelectStory(story._id)
                        setShowStorySelector(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                        selectedStoryId === story._id
                          ? 'bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {story.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Story Tree */}
      <div className="flex-1 overflow-y-auto">
        {selectedStoryId ? (
          <StoryTree
            storyId={selectedStoryId as Id<"stories">}
            selectedSceneId={selectedSceneId as Id<"scenes">}
            onSelectScene={onSelectScene}
            expandedChapters={expandedChapters}
            onToggleChapter={onToggleChapter}
          />
        ) : (
          <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
            Select a story to view its structure
          </div>
        )}
      </div>

      {/* Footer - Quick Actions */}
      <div className="flex-shrink-0 p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 space-y-2">
        <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
          {selectedStory && (
            <div>
              📚 {stories.length} {stories.length === 1 ? 'story' : 'stories'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
