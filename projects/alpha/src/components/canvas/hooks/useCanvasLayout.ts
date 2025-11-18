/**
 * Custom Hook for Canvas Layout Logic
 * Transforms story data into React Flow nodes and edges
 */

import { useEffect } from 'react'
import { Node, Edge, useNodesState, useEdgesState } from 'reactflow'
import { EDGE_STYLES } from '../constants'
import {
  calculateChapterPosition,
  calculateScenePosition,
  calculateChapterStats,
  calculateWordCount,
  getSceneCharacters,
  generateNodeId,
  generateEdgeId,
} from '../utils'
import type { ChapterWithScenes, Scene, Character } from '../types'

interface UseCanvasLayoutProps {
  chapters?: ChapterWithScenes[]
  characters?: Character[]
  selectedSceneId: string | null
  onSceneClick: (sceneId: string) => void
}

interface UseCanvasLayoutReturn {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: (changes: any) => void
  onEdgesChange: (changes: any) => void
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void
}

/**
 * Hook to manage canvas layout and node/edge transformations
 */
export function useCanvasLayout({
  chapters = [],
  characters = [],
  selectedSceneId,
  onSceneClick,
}: UseCanvasLayoutProps): UseCanvasLayoutReturn {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    if (!chapters || chapters.length === 0) {
      setNodes([])
      setEdges([])
      return
    }

    const newNodes: Node[] = []
    const newEdges: Edge[] = []

    // Process each chapter
    chapters.forEach((chapter: ChapterWithScenes, chapterIndex: number) => {
      const chapterPos = calculateChapterPosition(chapterIndex)
      const chapterStats = calculateChapterStats(chapter)

      // Create chapter node
      newNodes.push({
        id: generateNodeId('chapter', chapter._id),
        type: 'chapter',
        position: chapterPos,
        data: {
          chapterNumber: chapter.chapterNumber,
          title: chapter.title,
          sceneCount: chapter.scenes.length,
          completedCount: chapterStats.completedCount,
          totalWords: chapterStats.totalWords,
        },
      })

      // Create scene nodes and edges
      chapter.scenes.forEach((scene: Scene, sceneIndex: number) => {
        const scenePos = calculateScenePosition(chapterPos.x, chapterPos.y, sceneIndex)
        const sceneCharacters = getSceneCharacters(scene, characters)
        const wordCount = calculateWordCount(scene.prose)

        // Create scene node
        newNodes.push({
          id: generateNodeId('scene', scene._id),
          type: 'scene',
          position: scenePos,
          data: {
            sceneNumber: scene.sceneNumber,
            outline: scene.outline,
            prose: scene.prose,
            status: scene.status,
            regenerationCount: scene.regenerationCount,
            characters: sceneCharacters,
            wordCount,
            onClick: () => onSceneClick(scene._id),
          },
          selected: selectedSceneId === scene._id,
        })

        // Create edge from chapter to scene
        newEdges.push({
          id: generateEdgeId(chapter._id, scene._id),
          source: generateNodeId('chapter', chapter._id),
          target: generateNodeId('scene', scene._id),
          type: 'smoothstep',
          animated: scene.status === 'generating',
          style:
            scene.status === 'complete'
              ? EDGE_STYLES.complete
              : EDGE_STYLES.default,
        })
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }, [chapters, characters, selectedSceneId, onSceneClick, setNodes, setEdges])

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    setNodes,
    setEdges,
  }
}
