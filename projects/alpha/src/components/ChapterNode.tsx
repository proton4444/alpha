import type { Id } from '../../convex/_generated/dataModel'

/**
 * Utility function to count words in prose
 */
const countWords = (text: string | undefined | null): number => {
  if (!text) return 0
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Format large numbers with commas (e.g., 3500 -> "3,500")
 */
const formatNumber = (num: number): string => {
  return num.toLocaleString()
}

/**
 * Scene type from the story tree
 */
interface Scene {
  _id: Id<"scenes">
  storyId: Id<"stories">
  chapterId: Id<"chapters">
  sceneNumber: number
  outline: string
  prose?: string
  status: "draft" | "generating" | "complete" | "error"
  errorMessage?: string
  regenerationCount: number
}

/**
 * Chapter type from the story tree
 */
interface Chapter {
  _id: Id<"chapters">
  storyId: Id<"stories">
  chapterNumber: number
  title: string
  scenes: Scene[]
}

/**
 * ChapterNode Props
 */
interface ChapterNodeProps {
  /** Chapter data including scenes */
  chapter: Chapter
  /** Whether the chapter is expanded to show scenes */
  isExpanded?: boolean
  /** Callback when chapter is toggled */
  onToggle?: () => void
  /** Callback when a scene is selected */
  onSelectScene?: (sceneId: Id<"scenes">) => void
  /** Currently selected scene ID for highlighting */
  selectedSceneId?: Id<"scenes"> | null
}

/**
 * ChapterNode Component (Story 6.1)
 *
 * Displays a chapter card with:
 * - Chapter number and title
 * - Status breakdown (Complete, Draft, Generating, Error counts)
 * - Progress bar showing completion percentage
 * - Total word count
 * - Expand/collapse toggle
 * - Scene list (when expanded)
 *
 * Features:
 * - Smooth 150ms animations
 * - Click-to-expand interaction
 * - Dark mode support
 * - Scene selection support
 */
export function ChapterNode({
  chapter,
  isExpanded = false,
  onToggle,
  onSelectScene,
  selectedSceneId,
}: ChapterNodeProps) {
  const { scenes } = chapter

  // Calculate status breakdown
  const statusCounts = scenes.reduce(
    (acc, scene) => {
      acc[scene.status] = (acc[scene.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const completeCount = statusCounts.complete || 0
  const draftCount = statusCounts.draft || 0
  const generatingCount = statusCounts.generating || 0
  const errorCount = statusCounts.error || 0
  const totalScenes = scenes.length

  // Calculate progress percentage
  const progressPercentage = totalScenes > 0
    ? Math.round((completeCount / totalScenes) * 100)
    : 0

  // Calculate total word count
  const totalWords = scenes.reduce((sum, scene) => {
    return sum + countWords(scene.prose)
  }, 0)

  // Generate progress bar visualization
  const progressBarWidth = progressPercentage
  const progressBar = (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 dark:bg-green-600 transition-all duration-300 ease-out"
          style={{ width: `${progressBarWidth}%` }}
        />
      </div>
      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium min-w-[3rem] text-right">
        {progressPercentage}%
      </span>
    </div>
  )

  // Handle chapter card click
  const handleCardClick = () => {
    if (onToggle) {
      onToggle()
    }
  }

  // Handle scene click
  const handleSceneClick = (sceneId: Id<"scenes">) => {
    if (onSelectScene) {
      onSelectScene(sceneId)
    }
  }

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-150">
      {/* Chapter Header Card */}
      <div
        onClick={handleCardClick}
        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors duration-150 rounded-t-lg"
      >
        <div className="flex items-start justify-between gap-3">
          {/* Left Section: Expand Icon + Chapter Info */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Expand/Collapse Icon */}
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-transform duration-150">
              <span className="text-sm">
                {isExpanded ? '▼' : '▶'}
              </span>
            </div>

            {/* Chapter Number & Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Chapter {chapter.chapterNumber}
                </span>
                <span className="text-base font-semibold text-slate-900 dark:text-white truncate">
                  {chapter.title}
                </span>
              </div>

              {/* Status Breakdown */}
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2 flex flex-wrap gap-x-2">
                {completeCount > 0 && (
                  <span className="text-green-600 dark:text-green-400">
                    ✓ {completeCount} Complete
                  </span>
                )}
                {draftCount > 0 && (
                  <span className="text-slate-500 dark:text-slate-400">
                    ○ {draftCount} Draft
                  </span>
                )}
                {generatingCount > 0 && (
                  <span className="text-blue-600 dark:text-blue-400">
                    ⏳ {generatingCount} Generating
                  </span>
                )}
                {errorCount > 0 && (
                  <span className="text-red-600 dark:text-red-400">
                    ✗ {errorCount} Error
                  </span>
                )}
                {totalScenes === 0 && (
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    No scenes
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                {progressBar}
              </div>

              {/* Word Count */}
              <div className="text-xs text-slate-500 dark:text-slate-400">
                ~{formatNumber(totalWords)} words
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scene List (Expanded) */}
      <div
        className={`overflow-hidden transition-all duration-150 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 space-y-2">
          {scenes.length > 0 ? (
            scenes.map((scene) => {
              const isSelected = selectedSceneId === scene._id
              const sceneWords = countWords(scene.prose)

              // Status styling
              const statusStyles = {
                complete: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300',
                draft: 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300',
                generating: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 animate-pulse',
                error: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300',
              }

              const statusIcons = {
                complete: '✓',
                draft: '○',
                generating: '⏳',
                error: '✗',
              }

              return (
                <div
                  key={scene._id}
                  onClick={() => handleSceneClick(scene._id)}
                  className={`p-3 rounded border cursor-pointer transition-all duration-150 ${
                    statusStyles[scene.status]
                  } ${
                    isSelected
                      ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-md'
                      : 'hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {/* Scene Number & Status */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold">
                          {statusIcons[scene.status]} Scene {scene.sceneNumber}
                        </span>
                        {scene.regenerationCount > 0 && (
                          <span className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 rounded">
                            ↻{scene.regenerationCount}
                          </span>
                        )}
                      </div>

                      {/* Outline Preview */}
                      <div className="text-xs mb-1 line-clamp-2">
                        {scene.outline}
                      </div>

                      {/* Word Count */}
                      {sceneWords > 0 && (
                        <div className="text-xs opacity-75">
                          {formatNumber(sceneWords)} words
                        </div>
                      )}

                      {/* Error Message */}
                      {scene.status === 'error' && scene.errorMessage && (
                        <div className="text-xs mt-1 opacity-75 italic">
                          Error: {scene.errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">
              No scenes in this chapter
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
