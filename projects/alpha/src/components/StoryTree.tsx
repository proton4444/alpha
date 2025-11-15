import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

interface StoryTreeProps {
  storyId: Id<"stories">
  selectedSceneId?: Id<"scenes"> | null
  onSelectScene?: (sceneId: Id<"scenes">) => void
}

export function StoryTree({ storyId, selectedSceneId, onSelectScene }: StoryTreeProps) {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({})
  const storyTree = useQuery(api.stories.getStoryTree, { storyId })

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  if (!storyTree) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading story tree...
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-50 border-r">
      {/* Story Root */}
      <div className="sticky top-0 bg-white border-b p-4 shadow-sm z-10">
        <h2 className="text-lg font-bold text-slate-900 truncate">
          {storyTree.story.title}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
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
                className="flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-slate-100 transition-colors"
              >
                {/* Expand/Collapse Icon */}
                <span className="text-slate-400 text-xs w-4 flex-shrink-0">
                  {isExpanded ? '▼' : '▶'}
                </span>

                {/* Chapter Number */}
                <span className="text-xs font-semibold text-slate-600 w-6">
                  {chapter.chapterNumber}
                </span>

                {/* Chapter Title */}
                <span className="text-sm font-medium text-slate-700 flex-1 truncate">
                  {chapter.title}
                </span>

                {/* Scene Count Badge */}
                <span className="text-xs text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  {sceneCount}
                </span>
              </div>

              {/* Scenes (shown when expanded) */}
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {sceneCount === 0 ? (
                    <div className="text-xs text-muted-foreground italic p-2 pl-4">
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
                              ? 'bg-blue-100 border-l-4 border-blue-500 font-medium'
                              : 'hover:bg-slate-100 border-l-4 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {/* Scene Number */}
                            <span className="text-xs font-semibold text-slate-500">
                              {scene.sceneNumber}
                            </span>

                            {/* Scene Outline Preview */}
                            <span className={`text-xs flex-1 truncate ${
                              isSelected ? 'text-blue-900' : 'text-slate-600'
                            }`}>
                              {scene.outline}
                            </span>

                            {/* Status Indicator */}
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              scene.status === 'complete'
                                ? 'bg-green-100 text-green-700'
                                : scene.status === 'generating'
                                ? 'bg-yellow-100 text-yellow-700'
                                : scene.status === 'error'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}>
                              {scene.status}
                            </span>
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
