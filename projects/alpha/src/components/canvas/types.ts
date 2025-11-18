/**
 * Shared Type Definitions for Canvas Components
 */

import { Id } from '../../../convex/_generated/dataModel'

// Scene status type
export type SceneStatus = 'draft' | 'generating' | 'complete' | 'error'

// Convex data types
export type Story = {
  _id: Id<'stories'>
  _creationTime: number
  title: string
  createdAt: number
}

export type Chapter = {
  _id: Id<'chapters'>
  _creationTime: number
  storyId: Id<'stories'>
  chapterNumber: number
  title: string
}

export type Scene = {
  _id: Id<'scenes'>
  _creationTime: number
  storyId: Id<'stories'>
  chapterId: Id<'chapters'>
  sceneNumber: number
  outline: string
  prose?: string
  status: SceneStatus
  errorMessage?: string
  regenerationCount: number
}

export type Character = {
  _id: Id<'characters'>
  _creationTime: number
  storyId: Id<'stories'>
  name: string
  traits: string
  backstory?: string
}

// Extended types
export type ChapterWithScenes = Chapter & {
  scenes: Scene[]
}

export type StoryTree = {
  story: Story
  chapters: ChapterWithScenes[]
}

// Node data types (for React Flow)
export interface ChapterNodeData {
  chapterNumber: number
  title: string
  sceneCount: number
  completedCount: number
  totalWords: number
}

export interface SceneNodeData {
  sceneNumber: number
  outline: string
  prose?: string
  status: SceneStatus
  regenerationCount: number
  characters: Pick<Character, '_id' | 'name'>[]
  wordCount: number
  onClick: () => void
}

// Props types
export interface ChapterNodeProps {
  data: ChapterNodeData
}

export interface SceneNodeProps {
  data: SceneNodeData
}
