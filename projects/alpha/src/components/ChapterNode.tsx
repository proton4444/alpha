import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
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
 * Get character initial (first letter of name) - Story 6.5
 */
const getCharacterInitial = (name: string): string => {
  return name.charAt(0).toUpperCase()
}

/**
 * Character badge color palette (Story 6.5)
 * Colors cycle through this palette based on character index
 */
const characterColors = [
  'bg-blue-500 text-white',
  'bg-purple-500 text-white',
  'bg-pink-500 text-white',
  'bg-orange-500 text-white',
  'bg-green-500 text-white',
  'bg-teal-500 text-white',
  'bg-red-500 text-white',
  'bg-yellow-500 text-white',
]

/**
 * Get color class for character at given index (Story 6.5)
 */
const getCharacterColor = (index: number): string => {
  return characterColors[index % characterColors.length]
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
 * Character type (Story 6.5)
 */
interface Character {
  _id: Id<"characters">
  storyId: Id<"stories">
  name: string
  description?: string
}

/**
 * Filter Status Type (Story 6.6)
 */
type SceneStatus = "draft" | "generating" | "complete" | "error"
type FilterStatus = "all" | SceneStatus

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
  /** Characters in the story (Story 6.5) */
  characters?: Character[]
  /** Active status filter (Story 6.6) */
  activeFilter?: FilterStatus
}

/**
 * ChapterNode Component (Stories 6.1, 6.4, 6.5, 6.6)
 *
 * Displays a chapter card with:
 * - Chapter number and title
 * - Status breakdown (Complete, Draft, Generating, Error counts)
 * - Progress bar showing completion percentage
 * - Total word count
 * - Expand/collapse toggle
 * - Scene list (when expanded)
 * - Drag-drop reordering (Story 6.4)
 * - Character badges on scenes (Story 6.5)
 * - Status filtering (Story 6.6)
 *
 * Features:
 * - Smooth 150ms animations
 * - Click-to-expand interaction
 * - Dark mode support
 * - Scene selection support
 * - Drag-drop scene reordering within chapter (Story 6.4)
 * - Character initials with tooltips (Story 6.5)
 * - Scene status filtering (Story 6.6)
 */
export function ChapterNode({
  chapter,
  isExpanded = false,
  onToggle,
  onSelectScene,
  selectedSceneId,
  characters = [],
  activeFilter = "all",
}: ChapterNodeProps) {
  const { scenes } = chapter

  // Drag-drop state (Story 6.4)
  const [draggedSceneId, setDraggedSceneId] = useState<Id<"scenes"> | null>(null)
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null)

  // Convex mutation for reordering (Story 6.4)
  const reorderScenes = useMutation(api.scenes.reorderScenesInChapter)

  // Filter scenes based on active filter (Story 6.6)
  const filteredScenes = activeFilter === "all"
    ? scenes
    : scenes.filter(scene => scene.status === activeFilter)

  // Calculate status breakdown (using filtered scenes)
  const statusCounts = filteredScenes.reduce(
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
  const totalScenes = filteredScenes.length

  // Calculate progress percentage
  const progressPercentage = totalScenes > 0
    ? Math.round((completeCount / totalScenes) * 100)
    : 0

  // Calculate total word count (using filtered scenes)
  const totalWords = filteredScenes.reduce((sum, scene) => {
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

  // Drag-drop handlers (Story 6.4)
  const handleDragStart = (e: React.DragEvent, scene: Scene, index: number) => {
    setDraggedSceneId(scene._id)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('sceneId', scene._id)
    e.dataTransfer.setData('chapterId', chapter._id)
    e.dataTransfer.setData('sourceIndex', index.toString())
  }

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    // Only show drop indicator if we're dragging
    if (draggedSceneId) {
      setDropTargetIndex(targetIndex)
    }
  }

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()

    const sceneId = e.dataTransfer.getData('sceneId') as Id<"scenes">
    const chapterId = e.dataTransfer.getData('chapterId') as Id<"chapters">

    // Only allow drops within the same chapter
    if (chapterId !== chapter._id) {
      setDraggedSceneId(null)
      setDropTargetIndex(null)
      return
    }

    try {
      // Call mutation to reorder scenes
      await reorderScenes({
        chapterId: chapter._id,
        sceneId: sceneId,
        newPosition: targetIndex + 1, // Convert to 1-indexed
      })
    } catch (error) {
      console.error('Failed to reorder scenes:', error)
    }

    setDraggedSceneId(null)
    setDropTargetIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedSceneId(null)
    setDropTargetIndex(null)
  }

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-150">
      {/* Chapter Header Card */}
      <div
        onClick={handleCardClick}
        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150 rounded-t-lg"
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
          {filteredScenes.length > 0 ? (
            filteredScenes.map((scene, index) => {
              const isSelected = selectedSceneId === scene._id
              const sceneWords = countWords(scene.prose)
              const isDragging = draggedSceneId === scene._id
              const isDropTarget = dropTargetIndex === index
              const canDrag = scene.status !== 'generating'

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
                <div key={scene._id} className="relative">
                  {/* Drop indicator */}
                  {isDropTarget && draggedSceneId && (
                    <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 z-10"></div>
                  )}

                  <div
                    draggable={canDrag}
                    onDragStart={(e) => canDrag && handleDragStart(e, scene, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleSceneClick(scene._id)}
                    className={`group p-4 rounded border cursor-pointer transition-all duration-150 ${
                      statusStyles[scene.status]
                    } ${
                      isSelected
                        ? 'ring-2 ring-blue-500 dark:ring-blue-400 shadow-md'
                        : 'hover:shadow-sm'
                    } ${
                      isDragging ? 'opacity-50' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Drag Handle (Story 6.4) */}
                      {canDrag && (
                        <div
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-grab active:cursor-grabbing text-slate-400 dark:text-slate-500 select-none"
                          onMouseDown={(e) => e.stopPropagation()}
                          aria-label="Drag to reorder"
                        >
                          <span className="text-xs leading-none">⋮⋮</span>
                        </div>
                      )}

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

                        {/* Character Badges (Story 6.5) */}
                        {characters.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1 mb-1">
                            {characters.map((character, index) => (
                              <span
                                key={character._id}
                                className={`${getCharacterColor(index)} text-xs px-1.5 py-0.5 rounded font-medium cursor-help`}
                                title={character.name}
                              >
                                {getCharacterInitial(character.name)}
                              </span>
                            ))}
                          </div>
                        )}

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
                </div>
              )
            })
          ) : (
            <div className="text-xs text-slate-500 dark:text-slate-400 italic text-center py-4">
              {scenes.length === 0 ? (
                // No scenes at all in this chapter
                "No scenes in this chapter"
              ) : (
                // Scenes exist but filter hides them all (Story 6.6)
                <div className="space-y-1">
                  <div>No scenes match the selected filter</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    Try selecting "All" or a different filter
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
