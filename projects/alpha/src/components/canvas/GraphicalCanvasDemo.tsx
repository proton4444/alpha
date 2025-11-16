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

import { SceneNode } from './SceneNode'
import { ChapterNode } from './ChapterFlowNode'

// Register custom node types
const nodeTypes = {
  scene: SceneNode,
  chapter: ChapterNode
}

// Mock data to demonstrate the canvas
const mockStoryData = {
  title: "The Chronicles of Aethoria",
  chapters: [
    {
      _id: "chapter1",
      chapterNumber: 1,
      title: "The Awakening",
      scenes: [
        {
          _id: "scene1",
          sceneNumber: 1,
          outline: "Marcus discovers a mysterious portal in the ancient library ruins",
          prose: "The dust-covered tome fell open, revealing symbols that seemed to dance in the candlelight. Marcus felt a strange pull toward the glowing runes...",
          status: 'complete' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" },
            { _id: "char2", name: "Elena" }
          ]
        },
        {
          _id: "scene2",
          sceneNumber: 2,
          outline: "Elena warns Marcus about the dangers of ancient magic",
          prose: null,
          status: 'generating' as const,
          regenerationCount: 1,
          characters: [
            { _id: "char1", name: "Marcus" },
            { _id: "char2", name: "Elena" }
          ]
        },
        {
          _id: "scene3",
          sceneNumber: 3,
          outline: "The portal activates unexpectedly",
          prose: null,
          status: 'draft' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" }
          ]
        }
      ]
    },
    {
      _id: "chapter2",
      chapterNumber: 2,
      title: "Through the Veil",
      scenes: [
        {
          _id: "scene4",
          sceneNumber: 1,
          outline: "Marcus finds himself in a parallel dimension",
          prose: "The world beyond the portal was nothing like home. The sky shimmered with colors Marcus had never seen before, and strange crystalline structures dotted the landscape.",
          status: 'complete' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" },
            { _id: "char3", name: "Lyra" }
          ]
        },
        {
          _id: "scene5",
          sceneNumber: 2,
          outline: "Meeting Lyra, the guardian of the realm",
          prose: null,
          status: 'error' as const,
          regenerationCount: 3,
          characters: [
            { _id: "char3", name: "Lyra" }
          ]
        }
      ]
    },
    {
      _id: "chapter3",
      chapterNumber: 3,
      title: "The Quest Begins",
      scenes: [
        {
          _id: "scene6",
          sceneNumber: 1,
          outline: "Marcus learns about the ancient prophecy",
          prose: null,
          status: 'draft' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" },
            { _id: "char3", name: "Lyra" }
          ]
        },
        {
          _id: "scene7",
          sceneNumber: 2,
          outline: "The companions set out for the Crystal Mountains",
          prose: null,
          status: 'draft' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" },
            { _id: "char2", name: "Elena" },
            { _id: "char3", name: "Lyra" }
          ]
        }
      ]
    },
    {
      _id: "chapter4",
      chapterNumber: 4,
      title: "Mountain Trials",
      scenes: [
        {
          _id: "scene8",
          sceneNumber: 1,
          outline: "The group encounters their first challenge",
          prose: "The mountain path grew steeper as storm clouds gathered. Marcus knew this was only the beginning of their trials.",
          status: 'complete' as const,
          regenerationCount: 0,
          characters: [
            { _id: "char1", name: "Marcus" }
          ]
        }
      ]
    }
  ]
}

export function GraphicalCanvasDemo() {
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  // Transform mock data to nodes and edges
  useEffect(() => {
    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    const CHAPTER_SPACING_X = 260
    const CHAPTER_SPACING_Y = 400
    const SCENE_WIDTH = 160
    const SCENE_SPACING = 20

    // Create chapter nodes
    mockStoryData.chapters.forEach((chapter, chapterIndex) => {
      const chapterX = (chapterIndex % 4) * CHAPTER_SPACING_X
      const chapterY = Math.floor(chapterIndex / 4) * CHAPTER_SPACING_Y

      // Chapter node
      const completedScenes = chapter.scenes.filter(s => s.status === 'complete').length
      const totalWords = chapter.scenes.reduce((sum, s) => {
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
      chapter.scenes.forEach((scene, sceneIndex) => {
        const sceneX = chapterX + (sceneIndex * (SCENE_WIDTH + SCENE_SPACING))
        const sceneY = chapterY + 150

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
            characters: scene.characters,
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
  }, [selectedSceneId, setNodes, setEdges])

  // Handle connection creation (optional feature)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {/* Demo banner */}
      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg p-4">
        <div className="text-sm font-bold mb-1">🎨 Graphical Canvas Demo</div>
        <div className="text-xs opacity-90">Story: {mockStoryData.title}</div>
        <div className="text-xs opacity-75 mt-1">
          {mockStoryData.chapters.length} chapters, {mockStoryData.chapters.reduce((sum, ch) => sum + ch.scenes.length, 0)} scenes
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3 max-w-xs">
        <div className="text-sm font-medium mb-2 dark:text-slate-200">✨ Interactive Canvas Features:</div>
        <ul className="text-xs space-y-1 dark:text-slate-300">
          <li>🖱️ Click scenes to select</li>
          <li>🔍 Zoom with mouse wheel</li>
          <li>👆 Drag to pan around</li>
          <li>🎯 Use controls (bottom-left)</li>
          <li>🗺️ Minimap (bottom-right)</li>
        </ul>
      </div>

      {/* React Flow canvas */}
      <ReactFlow
        style={{ flex: 1, width: '100%' }}
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

      {/* Scene Detail Modal (when scene clicked) */}
      {selectedSceneId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold dark:text-slate-200">Scene Details</h2>
              <button
                onClick={() => setSelectedSceneId(null)}
                className="text-2xl hover:bg-slate-200 dark:hover:bg-slate-700 w-8 h-8 rounded"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {(() => {
                // Find the selected scene
                for (const chapter of mockStoryData.chapters) {
                  const scene = chapter.scenes.find(s => `scene-${s._id}` === selectedSceneId)
                  if (scene) {
                    return (
                      <>
                        <div>
                          <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Outline</h3>
                          <p className="dark:text-slate-200">{scene.outline}</p>
                        </div>
                        {scene.prose && (
                          <div>
                            <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Prose</h3>
                            <p className="dark:text-slate-200 whitespace-pre-wrap">{scene.prose}</p>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Characters</h3>
                          <div className="flex gap-2 flex-wrap">
                            {scene.characters.map(char => (
                              <span key={char._id} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                                {char.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <div>
                            <span className="font-semibold dark:text-slate-400">Status: </span>
                            <span className={`
                              ${scene.status === 'complete' && 'text-green-600 dark:text-green-400'}
                              ${scene.status === 'generating' && 'text-blue-600 dark:text-blue-400'}
                              ${scene.status === 'draft' && 'text-slate-600 dark:text-slate-400'}
                              ${scene.status === 'error' && 'text-red-600 dark:text-red-400'}
                            `}>
                              {scene.status}
                            </span>
                          </div>
                          {scene.prose && (
                            <div className="dark:text-slate-300">
                              <span className="font-semibold dark:text-slate-400">Words: </span>
                              {scene.prose.split(/\s+/).length}
                            </div>
                          )}
                        </div>
                      </>
                    )
                  }
                }
                return null
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
