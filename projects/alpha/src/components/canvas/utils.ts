/**
 * Utility Functions for Canvas Operations
 */

import { LAYOUT, CHARACTER_COLORS } from './constants'
import type { Scene, Character, ChapterWithScenes } from './types'

/**
 * Calculate word count from text
 */
export function calculateWordCount(text?: string): number {
  if (!text) return 0
  return text.split(/\s+/).filter(word => word.length > 0).length
}

/**
 * Calculate chapter position based on index
 */
export function calculateChapterPosition(chapterIndex: number): { x: number; y: number } {
  const x = (chapterIndex % LAYOUT.CHAPTER.COLUMNS) * LAYOUT.CHAPTER.SPACING_X
  const y = Math.floor(chapterIndex / LAYOUT.CHAPTER.COLUMNS) * LAYOUT.CHAPTER.SPACING_Y
  return { x, y }
}

/**
 * Calculate scene position relative to its chapter
 */
export function calculateScenePosition(
  chapterX: number,
  chapterY: number,
  sceneIndex: number
): { x: number; y: number } {
  const x = chapterX + sceneIndex * (LAYOUT.SCENE.WIDTH + LAYOUT.SCENE.SPACING)
  const y = chapterY + LAYOUT.CHAPTER.SCENE_OFFSET_Y
  return { x, y }
}

/**
 * Get characters that appear in a scene
 */
export function getSceneCharacters(
  scene: Scene,
  allCharacters: Character[]
): Pick<Character, '_id' | 'name'>[] {
  return allCharacters
    .filter(char =>
      scene.prose?.includes(char.name) || scene.outline.includes(char.name)
    )
    .map(char => ({ _id: char._id, name: char.name }))
}

/**
 * Calculate chapter statistics
 */
export function calculateChapterStats(chapter: ChapterWithScenes) {
  const completedScenes = chapter.scenes.filter(s => s.status === 'complete').length
  const totalWords = chapter.scenes.reduce((sum, scene) => {
    return sum + calculateWordCount(scene.prose)
  }, 0)

  return {
    completedCount: completedScenes,
    totalWords,
  }
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Get character badge color by index
 */
export function getCharacterColor(index: number): string {
  return CHARACTER_COLORS[index % CHARACTER_COLORS.length]
}

/**
 * Get status color classes (combines light and dark mode)
 */
export function getStatusColorClasses(
  status: 'draft' | 'generating' | 'complete' | 'error',
  element: 'bg' | 'border' | 'text'
) {
  const colors = {
    draft: {
      bg: 'bg-slate-200 dark:bg-slate-700',
      border: 'border-slate-400 dark:border-slate-500',
      text: 'text-slate-900 dark:text-slate-100',
    },
    generating: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      border: 'border-blue-500 dark:border-blue-400',
      text: 'text-blue-900 dark:text-blue-100',
    },
    complete: {
      bg: 'bg-green-100 dark:bg-green-900',
      border: 'border-green-500 dark:border-green-400',
      text: 'text-green-900 dark:text-green-100',
    },
    error: {
      bg: 'bg-red-100 dark:bg-red-900',
      border: 'border-red-500 dark:border-red-400',
      text: 'text-red-900 dark:text-red-100',
    },
  }

  return colors[status][element]
}

/**
 * Format number with locale-specific formatting
 */
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

/**
 * Generate unique node ID
 */
export function generateNodeId(type: 'chapter' | 'scene', id: string): string {
  return `${type}-${id}`
}

/**
 * Generate unique edge ID
 */
export function generateEdgeId(sourceId: string, targetId: string): string {
  return `edge-${sourceId}-${targetId}`
}
