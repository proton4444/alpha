import { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode,
} from 'reactflow'
import 'reactflow/dist/style.css'
import './canvas.css'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

import { SceneNode } from './SceneNode'
import { ChapterNode } from './ChapterNode'
import { SceneEditor } from '../SceneEditor'

// Register custom node types
const nodeTypes = {
  scene: SceneNode,
  chapter: ChapterNode
}

export function GraphicalCanvas() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<'stories'> | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<Id<'scenes'> | null>(null)

  // Fetch data
  const stories = useQuery(api.stories.getAllStories)
  const storyTree = useQuery(
    api.stories.getStoryTree,
    selectedStoryId ? { storyId: selectedStoryId } : 'skip'
  )
  const characters = useQuery(
    api.characters.getCharactersByStory,
    selectedStoryId ? { storyId: selectedStoryId } : 'skip'
  )

  // React Flow state
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // Auto-select first story if none selected
  useEffect(() => {
    if (!selectedStoryId && stories && stories.length > 0) {
      setSelectedStoryId(stories[0]._id)
    }
  }, [stories, selectedStoryId])

  // Transform data to nodes and edges
  useEffect(() => {
    if (!storyTree || !characters) return

    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    const CHAPTER_SPACING_X = 260
    const CHAPTER_SPACING_Y = 400
    const SCENE_WIDTH = 160
    const SCENE_SPACING = 20

    // Create chapter nodes
    storyTree.chapters.forEach((chapter: any, chapterIndex: number) => {
      const chapterX = (chapterIndex % 4) * CHAPTER_SPACING_X
      const chapterY = Math.floor(chapterIndex / 4) * CHAPTER_SPACING_Y

      // Chapter node
      const completedScenes = chapter.scenes.filter((s: any) => s.status === 'complete').length
      const totalWords = chapter.scenes.reduce((sum: number, s: any) => {
        return sum + (s.prose ? s.prose.split(/\s+/).length : 0)
      }, 0)

      newNodes.push({
        id: `chapter-${chapter._id}`,
        type: 'chapter',
        position: { x: chapterX, y: chapterY },
        data: {
          chapterNumber: chapter.chapterNumber,
          title: chapter.title,
          sceneCount: chapter.scenes.length,
          completedCount: completedScenes,
          totalWords
        }
      })

      // Scene nodes (below chapter)
      chapter.scenes.forEach((scene: any, sceneIndex: number) => {
        const sceneX = chapterX + (sceneIndex * (SCENE_WIDTH + SCENE_SPACING))
        const sceneY = chapterY + 150

        const sceneCharacters = characters.filter((char: any) =>
          scene.prose?.includes(char.name) || scene.outline.includes(char.name)
        )

        const wordCount = scene.prose ? scene.prose.split(/\s+/).length : 0

        newNodes.push({
          id: `scene-${scene._id}`,
          type: 'scene',
          position: { x: sceneX, y: sceneY },
          data: {
            sceneNumber: scene.sceneNumber,
            outline: scene.outline,
            prose: scene.prose,
            status: scene.status,
            regenerationCount: scene.regenerationCount,
            characters: sceneCharacters,
            wordCount,
            onClick: () => setSelectedSceneId(scene._id)
          },
          selected: selectedSceneId === scene._id
        })

        // Edge from chapter to scene
        newEdges.push({
          id: `edge-${chapter._id}-${scene._id}`,
          source: `chapter-${chapter._id}`,
          target: `scene-${scene._id}`,
          type: 'smoothstep',
          animated: scene.status === 'generating',
          style: {
            stroke: scene.status === 'complete' ? '#10B981' : '#94A3B8',
            strokeWidth: 2
          }
        })
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [storyTree, characters, selectedSceneId, setNodes, setEdges])

  // Handle connection creation (optional feature)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

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
          {stories?.map((story: any) => (
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
        minZoom={0.1}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'chapter') return '#C026D3'
            const status = node.data?.status
            if (status === 'complete') return '#10B981'
            if (status === 'generating') return '#3B82F6'
            if (status === 'error') return '#EF4444'
            return '#94A3B8'
          }}
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
