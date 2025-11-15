import { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface ChapterNodeProps {
  data: {
    chapterNumber: number
    title: string
    sceneCount: number
    completedCount: number
    totalWords: number
  }
}

export const ChapterNode = memo(({ data }: ChapterNodeProps) => {
  const progress = data.sceneCount > 0 ? (data.completedCount / data.sceneCount) * 100 : 0

  return (
    <div className="chapter-node w-48 rounded-xl border-2 border-fuchsia-600 bg-fuchsia-50 p-4 shadow-md">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {/* Chapter header */}
      <div className="mb-2">
        <div className="text-xs text-fuchsia-600 font-medium">
          Chapter {data.chapterNumber}
        </div>
        <div className="text-sm font-bold text-fuchsia-900">
          {data.title}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-fuchsia-700 mb-1">
          <span>{data.completedCount}/{data.sceneCount} scenes</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-fuchsia-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-fuchsia-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="text-xs text-fuchsia-700">
        {data.totalWords > 0 && <span>{data.totalWords.toLocaleString()} words</span>}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
})

ChapterNode.displayName = 'ChapterNode'
