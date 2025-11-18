import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { calculateProgress, formatNumber } from './utils'
import type { ChapterNodeProps } from './types'

export const ChapterNode = memo(({ data }: ChapterNodeProps) => {
  const progress = calculateProgress(data.completedCount, data.sceneCount)

  return (
    <div
      className="chapter-node w-48 rounded-xl border-2 border-fuchsia-600 dark:border-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950 p-4 shadow-md"
      role="article"
      aria-label={`Chapter ${data.chapterNumber}: ${data.title}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {/* Chapter header */}
      <div className="mb-2">
        <div className="text-xs text-fuchsia-600 dark:text-fuchsia-400 font-medium uppercase">
          Chapter {data.chapterNumber}
        </div>
        <div className="text-sm font-bold text-fuchsia-900 dark:text-fuchsia-100">
          {data.title || 'Untitled Chapter'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-fuchsia-700 dark:text-fuchsia-300 mb-1">
          <span>{data.completedCount}/{data.sceneCount} scenes</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-fuchsia-200 dark:bg-fuchsia-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-fuchsia-600 dark:bg-fuchsia-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${progress}% complete`}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="text-xs text-fuchsia-700 dark:text-fuchsia-300">
        {data.totalWords > 0 && <span>{formatNumber(data.totalWords)} words</span>}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
})

ChapterNode.displayName = 'ChapterNode'
