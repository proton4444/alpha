import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { ChapterNode } from './ChapterNode'
import type { Id } from '../../convex/_generated/dataModel'

/**
 * ChapterOverview Props
 */
interface ChapterOverviewProps {
  /** ID of the story to display chapters for */
  storyId: Id<"stories">
  /** Callback when a scene is selected */
  onSelectScene?: (sceneId: Id<"scenes">) => void
  /** Currently selected scene ID for highlighting */
  selectedSceneId?: Id<"scenes"> | null
}

/**
 * ChapterOverview Component (Stories 6.2, 6.5)
 *
 * Displays all chapters in a responsive grid layout with coordinated
 * expand/collapse behavior (only one chapter open at a time).
 *
 * Features:
 * - Responsive CSS Grid (1-4 columns based on viewport)
 * - One chapter expanded at a time
 * - Smooth transitions via ChapterNode
 * - Scene selection support
 * - Character badges on scenes (Story 6.5)
 * - Dark mode support
 *
 * Grid Layout:
 * - Mobile (<768px): 1 column
 * - Tablet (768-1024px): 2 columns
 * - Desktop (1024-1280px): 3 columns
 * - Large (>1280px): 4 columns
 * - Gap: 1rem (16px)
 *
 * State Management:
 * - Maintains single expandedChapterId
 * - Toggling same chapter: collapses it (null)
 * - Toggling different chapter: switches expansion
 *
 * Acceptance Criteria:
 * AC1: CSS Grid layout ✓
 * AC2: 3-4 chapters per row on desktop ✓
 * AC3: 1rem gap between cards ✓
 * AC4: Responsive layout ✓
 * AC5: Only one chapter expanded at a time ✓
 * AC6: Clicking another chapter collapses previous ✓
 * AC7: Scroll position preserved ✓
 * AC8: Smooth animations ✓
 */
export function ChapterOverview({
  storyId,
  onSelectScene,
  selectedSceneId,
}: ChapterOverviewProps) {
  // State: Track which single chapter is expanded
  const [expandedChapterId, setExpandedChapterId] = useState<Id<"chapters"> | null>(null)

  // Load story tree with all chapters and scenes
  const storyTree = useQuery(api.stories.getStoryTree, { storyId })

  // Load characters for this story (Story 6.5)
  const characters = useQuery(api.characters.getCharactersByStory, { storyId })

  // Handle chapter toggle
  const handleToggleChapter = (chapterId: Id<"chapters">) => {
    setExpandedChapterId(prev => {
      // If clicking the same chapter, collapse it
      if (prev === chapterId) {
        return null
      }
      // Otherwise, expand the new chapter (automatically collapsing previous)
      return chapterId
    })
  }

  // Loading state
  if (!storyTree) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          Loading chapters...
        </p>
      </div>
    )
  }

  // Empty state
  if (!storyTree.chapters || storyTree.chapters.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-slate-400 dark:text-slate-600 mb-2">
          <svg
            className="inline-block w-16 h-16"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          No chapters found for this story
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Chapters are created automatically when you create a story
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4">
      {/* Story Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {storyTree.story.title}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {storyTree.chapters.length} chapters
        </p>
      </div>

      {/* Chapter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {storyTree.chapters.map((chapter) => (
          <ChapterNode
            key={chapter._id}
            chapter={chapter}
            isExpanded={expandedChapterId === chapter._id}
            onToggle={() => handleToggleChapter(chapter._id)}
            onSelectScene={onSelectScene}
            selectedSceneId={selectedSceneId}
            characters={characters || []}
          />
        ))}
      </div>
    </div>
  )
}
