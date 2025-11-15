import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'

/**
 * Shared hook for fetching all stories
 * Eliminates redundant getAllStories() subscriptions across components
 */
export function useAllStories() {
  return useQuery(api.stories.getAllStories) ?? []
}

/**
 * Hook for fetching a single story by ID
 */
export function useStory(storyId: Id<"stories"> | string | null) {
  return useQuery(
    api.stories.getStory,
    storyId ? { storyId: storyId as Id<"stories"> } : "skip"
  )
}

/**
 * Hook for fetching chapters by story
 */
export function useChaptersByStory(storyId: Id<"stories"> | string | null) {
  return useQuery(
    api.chapters.getChaptersByStory,
    storyId ? { storyId: storyId as Id<"stories"> } : "skip"
  ) ?? []
}

/**
 * Hook for fetching scenes by chapter
 */
export function useScenesByChapter(chapterId: Id<"chapters"> | string | null) {
  return useQuery(
    api.scenes.getScenesByChapter,
    chapterId ? { chapterId: chapterId as Id<"chapters"> } : "skip"
  ) ?? []
}

/**
 * Hook for fetching a single scene by ID
 */
export function useScene(sceneId: Id<"scenes"> | string | null) {
  return useQuery(
    api.scenes.getScene,
    sceneId ? { sceneId: sceneId as Id<"scenes"> } : "skip"
  )
}
