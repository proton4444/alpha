import React, { useState } from 'react'
import { ChapterWorkspace } from '@/components/ChapterWorkspace'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * DragDropTest - Interactive test harness for Story 6.4
 *
 * Tests the drag-and-drop reordering functionality for scenes within chapters.
 * Verifies all acceptance criteria for Story 6.4.
 */
export const DragDropTest = React.memo(function DragDropTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        🎯 Drag-Drop Reorder Test (Story 6.4)
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

      {/* ChapterWorkspace with Drag-Drop */}
      {selectedStoryId && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            Drag-Drop Enabled ChapterWorkspace:
          </label>

          {/* Full-screen workspace */}
          <div className="border-2 border-green-300 dark:border-green-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800" style={{ height: '700px' }}>
            <ChapterWorkspace storyId={selectedStoryId} />
          </div>
        </div>
      )}

      {/* Acceptance Criteria Checklist */}
      <div className="text-xs space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
          Story 6.4 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Drag handle (⋮⋮) appears on scene card hover</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Grab and drag scene within same chapter</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Visual feedback - semi-transparent during drag</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: Drop zone highlighted when dragging over</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Database updates on drop (persists)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Scene numbers auto-updated after reorder</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC7: Within-chapter only (no cross-chapter dragging)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC8: Smooth animations during drag and drop</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Expand a chapter that has multiple scenes</li>
          <li>Hover over a scene card to reveal the drag handle (⋮⋮)</li>
          <li>Click and hold the drag handle to start dragging</li>
          <li>Verify the scene becomes semi-transparent (opacity 50%)</li>
          <li>Drag the scene over other scenes in the same chapter</li>
          <li>Verify drop zones are highlighted with blue border</li>
          <li>Release to drop the scene in a new position</li>
          <li>Verify scene numbers update immediately</li>
          <li>Refresh the page to verify order persists</li>
          <li>Try dragging to a different chapter (should not work)</li>
          <li>Verify smooth animations throughout</li>
        </ol>
      </div>

      {/* Drag-Drop Tips */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
        <strong className="text-green-900 dark:text-green-300">Drag-Drop Tips:</strong>
        <ul className="mt-2 space-y-1 text-green-800 dark:text-green-400 list-disc list-inside">
          <li>Drag handle (⋮⋮) only appears on hover to reduce visual clutter</li>
          <li>Dragged scene becomes semi-transparent (50% opacity)</li>
          <li>Blue border shows where scene will be dropped</li>
          <li>Scene numbers auto-update after drop</li>
          <li>Cross-chapter dragging is prevented</li>
          <li>Cannot drag scenes that are currently generating</li>
          <li>HTML5 native drag-drop API (no external libraries)</li>
        </ul>
      </div>

      {/* Visual Feedback Legend */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
        <strong className="text-blue-900 dark:text-blue-300">Visual Feedback Legend:</strong>
        <ul className="mt-2 space-y-1 text-blue-800 dark:text-blue-400 list-disc list-inside">
          <li><strong>Hover:</strong> Drag handle (⋮⋮) appears on left side of scene card</li>
          <li><strong>Dragging:</strong> Scene becomes 50% transparent with grabbing cursor</li>
          <li><strong>Drop Target:</strong> Blue border-top (2px) shows insertion point</li>
          <li><strong>Drop Success:</strong> Scene numbers update, smooth transition</li>
          <li><strong>Invalid Drop:</strong> Scene returns to original position</li>
        </ul>
      </div>

      {/* Constraints Info */}
      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded text-xs">
        <strong className="text-purple-900 dark:text-purple-300">Constraints:</strong>
        <ul className="mt-2 space-y-1 text-purple-800 dark:text-purple-400 list-disc list-inside">
          <li>🔒 Within-chapter only: Cannot drag scenes to different chapters</li>
          <li>🔒 No generating scenes: Cannot drag scenes with "generating" status</li>
          <li>🔒 Same chapter drop: Drop only works within the expanded chapter</li>
          <li>✓ Persistent: Order survives page refresh (database updated)</li>
          <li>✓ Auto-renumber: Scene numbers automatically update after reorder</li>
        </ul>
      </div>
    </div>
  )
})
