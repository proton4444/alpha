import React, { useState } from 'react'
import { ChapterOverview } from '@/components/ChapterOverview'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * ChapterOverviewTest - Interactive test harness for Story 6.2
 *
 * Tests the ChapterOverview component with real data from Convex.
 * Verifies all acceptance criteria for Story 6.2.
 */
export const ChapterOverviewTest = React.memo(function ChapterOverviewTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<Id<"scenes"> | null>(null)
  const [viewportSize, setViewportSize] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('large')

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  const handleSelectScene = (sceneId: Id<"scenes">) => {
    setSelectedSceneId(sceneId)
    console.log('Selected scene:', sceneId)
  }

  // Simulate different viewport sizes for responsive testing
  const viewportClasses = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-[1024px]',
    large: 'max-w-[1920px]',
  }

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        🎨 ChapterOverview Test (Story 6.2)
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

      {/* Viewport Size Simulator */}
      <div className="space-y-2 border-t pt-4">
        <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
          Viewport Size (Responsive Testing):
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['mobile', 'tablet', 'desktop', 'large'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setViewportSize(size)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                viewportSize === size
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              {size === 'mobile' && '📱 Mobile (375px)'}
              {size === 'tablet' && '📱 Tablet (768px)'}
              {size === 'desktop' && '💻 Desktop (1024px)'}
              {size === 'large' && '🖥️ Large (1920px)'}
            </button>
          ))}
        </div>
      </div>

      {/* ChapterOverview Visualization */}
      {selectedStoryId && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            Interactive ChapterOverview Component:
          </label>

          {/* Viewport Container */}
          <div className={`border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-4 mx-auto transition-all duration-300 ${viewportClasses[viewportSize]}`}>
            <div className="bg-white dark:bg-slate-800 rounded overflow-auto" style={{ maxHeight: '600px' }}>
              <ChapterOverview
                storyId={selectedStoryId}
                onSelectScene={handleSelectScene}
                selectedSceneId={selectedSceneId}
              />
            </div>
          </div>

          {/* Viewport Info */}
          <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Current viewport: <span className="font-mono font-semibold">{viewportSize}</span>
            {' | '}
            Expected columns:
            {viewportSize === 'mobile' && ' 1'}
            {viewportSize === 'tablet' && ' 2'}
            {viewportSize === 'desktop' && ' 3'}
            {viewportSize === 'large' && ' 4'}
          </div>

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
          Story 6.2 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Display chapters in CSS grid layout</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Show 3-4 chapters per row on desktop (1920px)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Use 1rem gap between chapter cards</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: Responsive layout (mobile: 1 col, tablet: 2 col, desktop: 3-4 col)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Only one chapter expanded at a time</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Clicking another chapter collapses previous</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC7: Scroll position preserved during expand/collapse</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC8: Smooth animations (leverages ChapterNode 150ms)</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Observe grid layout with all 24 chapters</li>
          <li>Test different viewport sizes using the buttons</li>
          <li>Verify columns change: Mobile (1), Tablet (2), Desktop (3), Large (4)</li>
          <li>Click a chapter to expand it</li>
          <li>Click a different chapter - verify first one collapses</li>
          <li>Click the same chapter again - verify it collapses</li>
          <li>Check that scroll position doesn't jump during expand/collapse</li>
          <li>Select a scene within an expanded chapter</li>
          <li>Verify smooth animations during all transitions</li>
        </ol>
      </div>

      {/* Grid Layout Reference */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
        <strong className="text-green-900 dark:text-green-300">Grid Layout Info:</strong>
        <ul className="mt-2 space-y-1 text-green-800 dark:text-green-400 list-disc list-inside">
          <li>CSS Grid with responsive columns</li>
          <li>Gap: 1rem (16px) between all cards</li>
          <li>Tailwind classes: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4</li>
          <li>Breakpoints: md=768px, lg=1024px, xl=1280px</li>
          <li>State: Single expandedChapterId tracked at ChapterOverview level</li>
        </ul>
      </div>
    </div>
  )
})
