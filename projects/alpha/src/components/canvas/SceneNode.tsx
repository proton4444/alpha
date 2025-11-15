import { memo } from 'react'
import { Handle, Position } from 'reactflow'

interface SceneNodeProps {
  data: {
    sceneNumber: number
    outline: string
    prose?: string
    status: 'draft' | 'generating' | 'complete' | 'error'
    regenerationCount: number
    characters: { _id: string; name: string }[]
    wordCount: number
    onClick: () => void
  }
}

export const SceneNode = memo(({ data }: SceneNodeProps) => {
  const statusColors = {
    draft: 'bg-slate-200 border-slate-400 text-slate-900',
    generating: 'bg-blue-100 border-blue-500 text-blue-900 animate-pulse',
    complete: 'bg-green-100 border-green-500 text-green-900',
    error: 'bg-red-100 border-red-500 text-red-900'
  }

  const statusIcons = {
    draft: '📝',
    generating: '⏳',
    complete: '✓',
    error: '⚠️'
  }

  return (
    <div
      className={`
        scene-node
        w-40 rounded-lg border-2 p-3 bg-white
        cursor-pointer transition-all duration-200
        hover:shadow-lg hover:scale-105
        ${statusColors[data.status]}
      `}
      onClick={data.onClick}
    >
      {/* Input handle (top) */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold">Scene {data.sceneNumber}</span>
        <span className="text-sm">{statusIcons[data.status]}</span>
      </div>

      {/* Outline preview */}
      <p className="text-xs line-clamp-2 mb-2 opacity-75">
        {data.outline}
      </p>

      {/* Footer: stats and badges */}
      <div className="flex flex-wrap gap-1 text-xs">
        {/* Word count */}
        {data.wordCount > 0 && (
          <span className="px-1.5 py-0.5 bg-slate-200 rounded">
            {data.wordCount}w
          </span>
        )}

        {/* Regeneration count */}
        {data.regenerationCount > 0 && (
          <span className="px-1.5 py-0.5 bg-yellow-200 rounded">
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
      </div>

      {/* Output handle (bottom) */}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})

SceneNode.displayName = 'SceneNode'

// Helper function for character colors
function getCharacterColor(index: number): string {
  const colors = [
    'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800',
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-orange-200 text-orange-800'
  ]
  return colors[index % colors.length]
}
