import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  ConnectionMode,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './canvas.css'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

import { SceneNode } from './SceneNode'
import { ChapterNode } from './ChapterFlowNode'
import { SceneEditor } from '../SceneEditor'
import { useCanvasLayout } from './hooks/useCanvasLayout'
import { CANVAS_CONFIG, MINIMAP_COLORS } from './constants'
import type { Story } from './types'

// Register custom node types
const nodeTypes = {
  scene: SceneNode,
  chapter: ChapterNode,
}

export function GraphicalCanvas() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<'stories'> | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<Id<'scenes'> | null>(null)

  // Fetch data from Convex
  const stories = useQuery(api.stories.getAllStories)
  const storyTree = useQuery(
    api.stories.getStoryTree,
    selectedStoryId ? { storyId: selectedStoryId } : 'skip'
  )
  const characters = useQuery(
    api.characters.getCharactersByStory,
    selectedStoryId ? { storyId: selectedStoryId } : 'skip'
  )

  // Auto-select first story if none selected (UX convenience)
  // This is intentional data synchronization from external source (Convex),
  // not cascading renders - only runs when stories load
  useEffect(() => {
    if (!selectedStoryId && stories && stories.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedStoryId(stories[0]._id)
    }
  }, [stories, selectedStoryId])

  // Use custom hook for canvas layout logic
  const { nodes, edges, onNodesChange, onEdgesChange, setEdges } = useCanvasLayout({
    chapters: storyTree?.chapters,
    characters,
    selectedSceneId,
    onSceneClick: setSelectedSceneId,
  })

  // Handle connection creation (optional feature)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  // Mini map node color function
  const getMinimapNodeColor = useCallback((node: any) => {
    if (node.type === 'chapter') return MINIMAP_COLORS.chapter
    const status = node.data?.status
    return MINIMAP_COLORS.scene[status as keyof typeof MINIMAP_COLORS.scene] || MINIMAP_COLORS.scene.draft
  }, [])

  return (
    <div className="w-full h-screen">
      {/* Story selector */}
      <div className="absolute top-4 left-4 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
        <label className="text-sm font-medium mb-2 block dark:text-slate-200">Select Story:</label>
        <select
          value={selectedStoryId || ''}
          onChange={(e) => setSelectedStoryId(e.target.value as Id<'stories'>)}
          className="px-3 py-2 border rounded-lg dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600"
        >
          {stories?.map((story: Story) => (
            <option key={story._id} value={story._id}>
              {story.title}
            </option>
          ))}
        </select>
      </div>

      {/* React Flow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={CANVAS_CONFIG.MIN_ZOOM}
        maxZoom={CANVAS_CONFIG.MAX_ZOOM}
        defaultViewport={{ x: 0, y: 0, zoom: CANVAS_CONFIG.DEFAULT_ZOOM }}
      >
        <Background color="#aaa" gap={CANVAS_CONFIG.BACKGROUND_GAP} />
        <Controls />
        <MiniMap
          nodeColor={getMinimapNodeColor}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>

      {/* Scene Editor Modal (when scene selected) */}
      {selectedSceneId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold dark:text-slate-200">Scene Editor</h2>
              <button
                onClick={() => setSelectedSceneId(null)}
                className="text-2xl hover:bg-slate-200 dark:hover:bg-slate-700 w-8 h-8 rounded"
              >
                ×
              </button>
            </div>
            {/* Use existing SceneEditor component */}
            <SceneEditor sceneId={selectedSceneId} />
          </div>
        </div>
      )}
    </div>
  )
}
