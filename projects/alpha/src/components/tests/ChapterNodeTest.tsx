import React, { useState } from 'react'
import { ChapterNode } from '@/components/ChapterNode'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * ChapterNodeTest - Interactive test harness for Story 6.1
 *
 * Tests the ChapterNode component with real data from Convex.
 * Verifies all acceptance criteria for Story 6.1.
 */
export const ChapterNodeTest = React.memo(function ChapterNodeTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<Id<"scenes"> | null>(null)
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({})

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  // Get story tree for selected story
  const storyTree = useQuery(
    api.stories.getStoryTree,
    selectedStoryId ? { storyId: selectedStoryId } : "skip"
  )

  const handleToggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const handleSelectScene = (sceneId: Id<"scenes">) => {
    setSelectedSceneId(sceneId)
    console.log('Selected scene:', sceneId)
  }

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        📦 ChapterNode Test (Story 6.1)
      </h3>

      {/* Story Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
          Select a Story:
        </label>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {allStories?.slice(0, 5).map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer text-sm transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700'
              }`}
              onClick={() => setSelectedStoryId(story._id)}
            >
              {story.title}
            </div>
          ))}
          {(!allStories || allStories.length === 0) && (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              Create a story first using the Story CRUD test
            </p>
          )}
        </div>
      </div>

      {/* ChapterNode Visualization */}
      {storyTree && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            Interactive ChapterNode Components:
          </label>

          {/* Display first 3 chapters for testing */}
          <div className="space-y-3">
            {storyTree.chapters.slice(0, 3).map((chapter) => (
              <ChapterNode
                key={chapter._id}
                chapter={chapter}
                isExpanded={expandedChapters[chapter._id] ?? false}
                onToggle={() => handleToggleChapter(chapter._id)}
                onSelectScene={handleSelectScene}
                selectedSceneId={selectedSceneId}
              />
            ))}
          </div>

          {storyTree.chapters.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No chapters found for this story
            </p>
          )}

          {selectedSceneId && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong className="text-blue-900 dark:text-blue-300">Selected Scene:</strong>{' '}
              <span className="text-blue-700 dark:text-blue-400 font-mono">{selectedSceneId}</span>
            </div>
          )}
        </div>
      )}

      {/* Acceptance Criteria Checklist */}
      <div className="text-xs space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
          Story 6.1 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Display chapter number and title</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Display status breakdown (e.g., "2/3 Complete | 1 Draft")</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Display progress bar with percentage</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: Display total word count</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Expand/collapse toggle with ▼/▶ icon</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Click card or icon to expand/collapse</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC7: Show scene list when expanded</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC8: Smooth 150ms animation for transitions</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Click on a chapter card to expand/collapse it</li>
          <li>Verify the status breakdown shows correct counts</li>
          <li>Check the progress bar reflects completion percentage</li>
          <li>Verify word count is displayed</li>
          <li>When expanded, verify scene list is visible</li>
          <li>Click a scene to select it (should highlight)</li>
          <li>Observe smooth 150ms animation during expand/collapse</li>
        </ol>
      </div>
    </div>
  )
})
