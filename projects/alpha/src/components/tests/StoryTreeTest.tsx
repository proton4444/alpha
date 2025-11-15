import { useState } from 'react'
import { StoryTree } from '@/components/StoryTree'
import { useAllStories } from '@/hooks/useConvexQueries'
import type { Id } from '../../../convex/_generated/dataModel'

export function StoryTreeTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<Id<"scenes"> | null>(null)

  // Use shared hook to eliminate redundant queries
  const stories = useAllStories()

  return (
    <div className="border rounded-lg p-6 bg-slate-50 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">🌳 Story Tree Test (Story 2.4)</h3>

      {/* Story Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">Select a Story to View Tree:</label>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {stories.slice(0, 5).map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer text-sm ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white hover:bg-slate-50'
              }`}
              onClick={() => setSelectedStoryId(story._id)}
            >
              {story.title}
            </div>
          ))}
          {stories.length === 0 && (
            <p className="text-sm text-muted-foreground italic">
              Create a story first using the test above
            </p>
          )}
        </div>
      </div>

      {/* Story Tree Visualization */}
      {selectedStoryId && (
        <div className="border-t pt-4">
          <label className="text-sm font-medium block mb-2">Interactive Story Tree:</label>
          <div className="border rounded-lg overflow-hidden bg-white" style={{ height: '500px' }}>
            <StoryTree
              storyId={selectedStoryId}
              selectedSceneId={selectedSceneId}
              onSelectScene={(sceneId) => {
                setSelectedSceneId(sceneId)
                console.log('Selected scene:', sceneId)
              }}
            />
          </div>
          {selectedSceneId && (
            <p className="text-xs text-muted-foreground mt-2">
              Selected scene: {selectedSceneId}
            </p>
          )}
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t">
        <p>✅ getStoryTree - loads story + chapters + scenes</p>
        <p>✅ Story title at root with chapter count</p>
        <p>✅ 24 chapters as expandable/collapsible nodes</p>
        <p>✅ Scenes nested with indentation</p>
        <p>✅ Selected scene highlighted visually</p>
        <p>✅ Empty chapters show "(no scenes)" placeholder</p>
        <p>✅ Status indicators (draft/generating/complete/error)</p>
      </div>
    </div>
  )
}
