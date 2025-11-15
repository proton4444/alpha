import React, { useState } from 'react'
import { ChapterWorkspace } from '@/components/ChapterWorkspace'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * StatusFilterTest - Interactive test harness for Story 6.6
 *
 * Tests the status filtering functionality for scenes within chapters.
 * Verifies all acceptance criteria for Story 6.6.
 */
export const StatusFilterTest = React.memo(function StatusFilterTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  // Get story tree for selected story (to show status distribution)
  const storyTree = useQuery(
    api.stories.getStoryTree,
    selectedStoryId ? { storyId: selectedStoryId } : "skip"
  )

  // Calculate status counts across all scenes in all chapters
  const statusCounts = React.useMemo(() => {
    if (!storyTree?.chapters) {
      return { all: 0, complete: 0, draft: 0, generating: 0, error: 0 }
    }

    const counts = {
      all: 0,
      complete: 0,
      draft: 0,
      generating: 0,
      error: 0,
    }

    storyTree.chapters.forEach((chapter) => {
      chapter.scenes.forEach((scene) => {
        counts.all++
        counts[scene.status]++
      })
    })

    return counts
  }, [storyTree])

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        🎛️ Status Filter Test (Story 6.6)
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

      {/* Status Distribution */}
      {selectedStoryId && storyTree && (
        <div className="border-t pt-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300 mb-2">
            Status Distribution (All Scenes):
          </label>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded text-sm">
              <span className="font-medium text-slate-700 dark:text-slate-300">All:</span>{' '}
              <span className="text-slate-900 dark:text-white">{statusCounts.all}</span>
            </div>
            {statusCounts.complete > 0 && (
              <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded text-sm">
                <span className="font-medium text-green-700 dark:text-green-300">✓ Complete:</span>{' '}
                <span className="text-green-900 dark:text-green-100">{statusCounts.complete}</span>
              </div>
            )}
            {statusCounts.draft > 0 && (
              <div className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">○ Draft:</span>{' '}
                <span className="text-slate-900 dark:text-white">{statusCounts.draft}</span>
              </div>
            )}
            {statusCounts.generating > 0 && (
              <div className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
                <span className="font-medium text-blue-700 dark:text-blue-300">⏳ Generating:</span>{' '}
                <span className="text-blue-900 dark:text-blue-100">{statusCounts.generating}</span>
              </div>
            )}
            {statusCounts.error > 0 && (
              <div className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 rounded text-sm">
                <span className="font-medium text-red-700 dark:text-red-300">✗ Error:</span>{' '}
                <span className="text-red-900 dark:text-red-100">{statusCounts.error}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ChapterWorkspace with Status Filtering */}
      {selectedStoryId && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            ChapterWorkspace with Status Filtering:
          </label>

          {/* Full-screen workspace */}
          <div className="border-2 border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800" style={{ height: '700px' }}>
            <ChapterWorkspace storyId={selectedStoryId} />
          </div>
        </div>
      )}

      {/* Acceptance Criteria Checklist */}
      <div className="text-xs space-y-1 pt-4 border-t border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">
          Story 6.6 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Filter buttons displayed at top (All, Complete, Draft, Generating, Error)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Clicking a filter shows only scenes with that status</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Scenes with other statuses are hidden</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: "All" filter shows all scenes</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Status counts update to reflect filtered view</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Filter persists during chapter expand/collapse</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC7: Empty state shown when no scenes match filter</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC8: Filter buttons show count of scenes for each status</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Note the status distribution counts above</li>
          <li>Observe the filter buttons at the top of the chapter overview</li>
          <li>Verify "All" filter is active by default</li>
          <li>Click "Complete" filter - verify only complete scenes show</li>
          <li>Click "Draft" filter - verify only draft scenes show</li>
          <li>Click "Generating" filter - verify only generating scenes show</li>
          <li>Click "Error" filter - verify only error scenes show</li>
          <li>Verify status counts update based on selected filter</li>
          <li>Expand/collapse chapters - verify filter persists</li>
          <li>Select a filter with no matching scenes - verify empty state</li>
          <li>Return to "All" filter - verify all scenes reappear</li>
        </ol>
      </div>

      {/* Filter Behavior Info */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
        <strong className="text-green-900 dark:text-green-300">Filter Behavior:</strong>
        <ul className="mt-2 space-y-1 text-green-800 dark:text-green-400 list-disc list-inside">
          <li>Filters apply to SCENES, not chapters (chapters stay visible)</li>
          <li>Default filter is "All" (shows all scenes)</li>
          <li>Only one filter active at a time</li>
          <li>Filter persists during expand/collapse operations</li>
          <li>Filter persists during drag-drop operations</li>
          <li>Status counts show number of scenes in each status</li>
          <li>Progress bars update based on filtered scenes</li>
          <li>Empty state shown when no scenes match filter</li>
        </ul>
      </div>

      {/* Visual Feedback Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
        <strong className="text-blue-900 dark:text-blue-300">Visual Feedback:</strong>
        <ul className="mt-2 space-y-1 text-blue-800 dark:text-blue-400 list-disc list-inside">
          <li><strong>Active Filter:</strong> Solid background, bold text</li>
          <li><strong>Inactive Filter:</strong> Outline/border only, normal text</li>
          <li><strong>Filter Counts:</strong> Badge showing number of scenes</li>
          <li><strong>Complete:</strong> Green accent color</li>
          <li><strong>Draft:</strong> Slate/gray accent color</li>
          <li><strong>Generating:</strong> Blue accent color (may pulse)</li>
          <li><strong>Error:</strong> Red accent color</li>
          <li><strong>Empty State:</strong> Subtle message when no matches</li>
        </ul>
      </div>

      {/* Expected Counts Info */}
      <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded text-xs">
        <strong className="text-purple-900 dark:text-purple-300">Count Calculations:</strong>
        <ul className="mt-2 space-y-1 text-purple-800 dark:text-purple-400 list-disc list-inside">
          <li><strong>All:</strong> Total scenes across all chapters</li>
          <li><strong>Complete:</strong> Scenes with status="complete"</li>
          <li><strong>Draft:</strong> Scenes with status="draft"</li>
          <li><strong>Generating:</strong> Scenes with status="generating"</li>
          <li><strong>Error:</strong> Scenes with status="error"</li>
          <li>Counts update in real-time as scene statuses change</li>
          <li>When filter active, chapter stats reflect only visible scenes</li>
        </ul>
      </div>

      {/* Test Scenarios */}
      <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded text-xs">
        <strong className="text-indigo-900 dark:text-indigo-300">Test Scenarios:</strong>
        <ul className="mt-2 space-y-1 text-indigo-800 dark:text-indigo-400 list-disc list-inside">
          <li><strong>All Complete:</strong> Filter to "Complete" - all scenes visible</li>
          <li><strong>All Draft:</strong> Filter to "Draft" - all scenes visible</li>
          <li><strong>Mixed Statuses:</strong> Filter switches between statuses smoothly</li>
          <li><strong>No Matches:</strong> Filter with no scenes shows empty state</li>
          <li><strong>During Drag:</strong> Filter persists while dragging scenes</li>
          <li><strong>During Generation:</strong> New generating scenes appear if filter matches</li>
          <li><strong>Multiple Chapters:</strong> Filter applies consistently across chapters</li>
        </ul>
      </div>
    </div>
  )
})
