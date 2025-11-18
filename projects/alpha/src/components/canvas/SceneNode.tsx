import { memo } from 'react'
import { Handle, Position } from 'reactflow'
import { STATUS_ICONS } from './constants'
import { getStatusColorClasses, getCharacterColor } from './utils'
import type { SceneNodeProps } from './types'

export const SceneNode = memo(({ data }: SceneNodeProps) => {
  // Get status-based color classes
  const bgClasses = getStatusColorClasses(data.status, 'bg')
  const borderClasses = getStatusColorClasses(data.status, 'border')
  const textClasses = getStatusColorClasses(data.status, 'text')
  const statusIcon = STATUS_ICONS[data.status]

  return (
    <div
      className={`
        scene-node
        w-40 rounded-lg border-2 p-3
        cursor-pointer transition-all duration-200
        hover:shadow-lg hover:scale-105
        ${bgClasses} ${borderClasses} ${textClasses}
        ${data.status === 'generating' ? 'animate-pulse' : ''}
      `}
      onClick={data.onClick}
      role="button"
      tabIndex={0}
      aria-label={`Scene ${data.sceneNumber}, ${data.status}, ${data.wordCount} words`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          data.onClick()
        }
      }}
    >
      {/* Input handle (top) */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold">Scene {data.sceneNumber}</span>
        <span className="text-sm" aria-label={data.status}>{statusIcon}</span>
      </div>

      {/* Outline preview */}
      <p className="text-xs line-clamp-2 mb-2 opacity-75">
        {data.outline || 'No outline yet...'}
      </p>

      {/* Footer: stats and badges */}
      <div className="flex flex-wrap gap-1 text-xs">
        {/* Word count */}
        {data.wordCount > 0 && (
          <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded">
            {data.wordCount}w
          </span>
        )}

        {/* Regeneration count */}
        {data.regenerationCount > 0 && (
          <span className="px-1.5 py-0.5 bg-yellow-200 dark:bg-yellow-700 rounded">
            ×{data.regenerationCount}
          </span>
        )}

        {/* Character initials */}
        {data.characters.slice(0, 3).map((char, i) => (
          <span
            key={char._id}
            className={`px-1.5 py-0.5 rounded ${getCharacterColor(i)}`}
            title={char.name}
          >
            {char.name[0]}
          </span>
        ))}

        {/* Show "+N" if more characters */}
        {data.characters.length > 3 && (
          <span
            className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title={data.characters.slice(3).map(c => c.name).join(', ')}
          >
            +{data.characters.length - 3}
          </span>
        )}
      </div>

      {/* Output handle (bottom) */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})

SceneNode.displayName = 'SceneNode'
