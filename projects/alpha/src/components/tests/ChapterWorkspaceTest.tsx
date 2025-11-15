import React, { useState } from 'react'
import { ChapterWorkspace } from '@/components/ChapterWorkspace'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * ChapterWorkspaceTest - Interactive test harness for Story 6.3
 *
 * Tests the integration of ChapterOverview with SceneEditor.
 * Verifies all acceptance criteria for Story 6.3.
 */
export const ChapterWorkspaceTest = React.memo(function ChapterWorkspaceTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        🔗 ChapterWorkspace Integration Test (Story 6.3)
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

      {/* ChapterWorkspace Integration */}
      {selectedStoryId && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            Integrated ChapterWorkspace Component:
          </label>

          {/* Full-screen workspace */}
          <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800" style={{ height: '700px' }}>
            <ChapterWorkspace storyId={selectedStoryId} />
          </div>
        </div>
      )}

      {/* Acceptance Criteria Checklist */}
      <div className="text-xs space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
          Story 6.3 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Click scene card to select it</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Selection triggers SceneEditor update</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Selected scene visually highlighted</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: Arrow key navigation within chapter</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Integration with existing SceneEditor (Story 4.6)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Scene selection persists across chapter expand/collapse</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Expand a chapter by clicking on it</li>
          <li>Click on a scene within the chapter</li>
          <li>Verify the scene is highlighted (blue ring)</li>
          <li>Verify the SceneEditor (right panel) loads the scene</li>
          <li>Use ↑ and ↓ arrow keys to navigate between scenes</li>
          <li>Verify navigation stays within the expanded chapter</li>
          <li>Edit the scene outline in the SceneEditor</li>
          <li>Verify auto-save works (watch for "saved" indicator)</li>
          <li>Click "Generate Prose" and verify it works</li>
          <li>Collapse the chapter and expand another</li>
          <li>Verify previously selected scene is still selected</li>
        </ol>
      </div>

      {/* Keyboard Shortcuts Reference */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
        <strong className="text-green-900 dark:text-green-300">Keyboard Shortcuts:</strong>
        <ul className="mt-2 space-y-1 text-green-800 dark:text-green-400 list-disc list-inside">
          <li><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono">↑</kbd> - Previous scene in chapter</li>
          <li><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono">↓</kbd> - Next scene in chapter</li>
          <li><kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono">Esc</kbd> - Deselect scene</li>
          <li className="italic opacity-75">Note: Shortcuts disabled when typing in text fields</li>
        </ul>
      </div>

      {/* Integration Details */}
      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded text-xs">
        <strong className="text-purple-900 dark:text-purple-300">Integration Details:</strong>
        <ul className="mt-2 space-y-1 text-purple-800 dark:text-purple-400 list-disc list-inside">
          <li>Left Panel (40%): ChapterOverview with grid layout</li>
          <li>Right Panel (60%): SceneEditor (reuses Story 4.6)</li>
          <li>Scene selection state managed by ChapterWorkspace</li>
          <li>Keyboard navigation scoped to expanded chapter only</li>
          <li>Split-screen layout similar to existing Workspace</li>
          <li>All SceneEditor features work: generate, edit, accept/regenerate</li>
        </ul>
      </div>
    </div>
  )
})
