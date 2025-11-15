import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

// Utility function to count words in prose
const countWords = (text: string | undefined | null): number => {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

interface StoryTreeProps {
  storyId: Id<"stories">
  selectedSceneId?: Id<"scenes"> | null
  onSelectScene?: (sceneId: Id<"scenes">) => void
  expandedChapters?: Record<string, boolean>
  onToggleChapter?: (chapterId: string) => void
}

/**
 * StoryTree Component (Stories 2.4, 5.2, 5.3)
 *
 * Hierarchical tree view of story structure:
 * - Story title at root
 * - 24 chapters (expandable/collapsible)
 * - Scenes nested under chapters
 *
 * Story 5.3: Enhanced with visual status indicators:
 * - Color-coded status badges (Draft, Generating, Complete, Error)
 * - Pulse animation for generating status
 * - Word count display for completed scenes
 * - Regeneration count badges
 * - Dark mode support
 */
export function StoryTree({
  storyId,
  selectedSceneId,
  onSelectScene,
  expandedChapters: externalExpandedChapters,
  onToggleChapter: externalOnToggleChapter
}: StoryTreeProps) {
  const [internalExpandedChapters, setInternalExpandedChapters] = useState<Record<string, boolean>>({})
  const storyTree = useQuery(api.stories.getStoryTree, { storyId })

  // Use external state if provided, otherwise use internal
  const expandedChapters = externalExpandedChapters ?? internalExpandedChapters
  const toggleChapter = externalOnToggleChapter ?? ((chapterId: string) => {
    setInternalExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  })

  if (!storyTree) {
    return (
      <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
        Loading story tree...
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
      {/* Story Root */}
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm z-10">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">
          {storyTree.story.title}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {storyTree.chapters.length} chapters
        </p>
      </div>

      {/* Chapters & Scenes */}
      <div className="p-2">
        {storyTree.chapters.map((chapter) => {
          const isExpanded = expandedChapters[chapter._id] ?? false
          const sceneCount = chapter.scenes.length

          return (
            <div key={chapter._id} className="mb-1">
              {/* Chapter Row */}
              <div
                onClick={() => toggleChapter(chapter._id)}
                className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {/* Expand/Collapse Icon */}
                <span className="text-slate-400 dark:text-slate-500 text-xs w-4 flex-shrink-0">
                  {isExpanded ? '▼' : '▶'}
                </span>

                {/* Chapter Number */}
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-6">
                  {chapter.chapterNumber}
                </span>

                {/* Chapter Title */}
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">
                  {chapter.title}
                </span>

                {/* Scene Count Badge */}
                <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                  {sceneCount}
                </span>
              </div>

              {/* Scenes (shown when expanded) */}
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {sceneCount === 0 ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 italic p-2 pl-4">
                      (no scenes)
                    </div>
                  ) : (
                    chapter.scenes.map((scene) => {
                      const isSelected = selectedSceneId === scene._id

                      return (
                        <div
                          key={scene._id}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectScene?.(scene._id)
                          }}
                          className={`p-2 pl-4 rounded text-sm cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 font-medium'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700 border-l-4 border-transparent'
                          }`}
                        >
                          {/* Scene Header */}
                          <div className="flex items-start gap-2 mb-1">
                            {/* Scene Number */}
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                              {scene.sceneNumber}
                            </span>

                            {/* Scene Outline Preview */}
                            <span className={`text-xs flex-1 truncate ${
                              isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-slate-600 dark:text-slate-300'
                            }`}>
                              {scene.outline}
                            </span>
                          </div>

                          {/* Status Badges Row (Story 5.3) */}
                          <div className="flex items-center gap-1.5 ml-5 flex-wrap">
                            {/* Status Badge */}
                            {scene.status === 'draft' && (
                              <span className="text-xs px-2 py-0.5 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium">
                                Draft
                              </span>
                            )}
                            {scene.status === 'generating' && (
                              <span className="text-xs px-2 py-0.5 rounded bg-blue-500 text-white font-medium animate-pulse">
                                ⏳ Generating...
                              </span>
                            )}
                            {scene.status === 'complete' && (
                              <span className="text-xs px-2 py-0.5 rounded bg-green-500 dark:bg-green-600 text-white font-medium">
                                ✓ Complete
                              </span>
                            )}
                            {scene.status === 'error' && (
                              <span className="text-xs px-2 py-0.5 rounded bg-red-500 dark:bg-red-600 text-white font-medium">
                                ⚠ Error
                              </span>
                            )}

                            {/* Word Count Badge (only if prose exists) */}
                            {scene.prose && (
                              <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                                {countWords(scene.prose)} words
                              </span>
                            )}

                            {/* Regeneration Count Badge (only if > 0) */}
                            {scene.regenerationCount > 0 && (
                              <span
                                className="text-xs px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium"
                                title={`Regenerated ${scene.regenerationCount} time${scene.regenerationCount > 1 ? 's' : ''}`}
                              >
                                🔄 ×{scene.regenerationCount}
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
