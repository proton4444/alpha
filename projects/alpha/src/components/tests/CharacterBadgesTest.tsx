import React, { useState } from 'react'
import { ChapterWorkspace } from '@/components/ChapterWorkspace'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

/**
 * CharacterBadgesTest - Interactive test harness for Story 6.5
 *
 * Tests the character badge display on scene cards.
 * Verifies all acceptance criteria for Story 6.5.
 */
export const CharacterBadgesTest = React.memo(function CharacterBadgesTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<Id<"stories"> | null>(null)

  // Get all stories for selection
  const allStories = useQuery(api.stories.getAllStories)

  // Get characters for selected story
  const characters = useQuery(
    api.characters.getCharactersByStory,
    selectedStoryId ? { storyId: selectedStoryId } : "skip"
  )

  return (
    <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-900 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">
        👥 Character Badges Test (Story 6.5)
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

      {/* Character List */}
      {selectedStoryId && characters && (
        <div className="border-t pt-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300 mb-2">
            Characters in Story:
          </label>
          {characters.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {characters.map((character) => (
                <div
                  key={character._id}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {character.name}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No characters found. Create characters using the Character CRUD test.
            </p>
          )}
        </div>
      )}

      {/* ChapterWorkspace with Character Badges */}
      {selectedStoryId && (
        <div className="border-t pt-4 space-y-4">
          <label className="text-sm font-medium block text-slate-700 dark:text-slate-300">
            ChapterWorkspace with Character Badges:
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
          Story 6.5 Acceptance Criteria:
        </h4>
        <p className="text-slate-700 dark:text-slate-300">✓ AC1: Show character initials on each scene card (e.g., [M][S])</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC2: Badges display character initials (first letter of name)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC3: Hover over badge shows tooltip with full character name</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC4: Characters are color-coded consistently</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC5: Characters loaded from story context (existing API)</p>
        <p className="text-slate-700 dark:text-slate-300">✓ AC6: Badges don't interfere with drag-drop functionality</p>
      </div>

      {/* Testing Instructions */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <strong className="text-amber-900 dark:text-amber-300">Test Instructions:</strong>
        <ol className="mt-2 space-y-1 text-amber-800 dark:text-amber-400 list-decimal list-inside">
          <li>Select a story from the dropdown above</li>
          <li>Ensure the story has characters (create using Character CRUD test if needed)</li>
          <li>Expand a chapter to view scene cards</li>
          <li>Verify character badges appear on each scene card</li>
          <li>Verify badges show character initials (first letter of name)</li>
          <li>Hover over a badge to see full character name tooltip</li>
          <li>Verify each character has a consistent color across all scenes</li>
          <li>Try dragging a scene - verify drag-drop still works</li>
          <li>Check multiple characters display correctly with different colors</li>
        </ol>
      </div>

      {/* Character Badge Info */}
      <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-xs">
        <strong className="text-green-900 dark:text-green-300">Character Badge Info:</strong>
        <ul className="mt-2 space-y-1 text-green-800 dark:text-green-400 list-disc list-inside">
          <li>Initials: First letter of character name (e.g., "Marcus" → "M")</li>
          <li>Color-coded: Each character has a unique, consistent color</li>
          <li>Tooltip: Hover to see full character name</li>
          <li>Position: Displayed below scene outline, above word count</li>
          <li>All story characters shown on every scene (MVP scope)</li>
          <li>Future: Track which characters appear in each specific scene</li>
        </ul>
      </div>

      {/* Color Palette Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
        <strong className="text-blue-900 dark:text-blue-300">Color Palette:</strong>
        <div className="mt-2 flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Blue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-purple-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Purple</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-pink-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Pink</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Orange</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Green</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-teal-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Teal</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Red</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span className="text-blue-800 dark:text-blue-400">Yellow</span>
          </div>
        </div>
        <p className="mt-2 text-blue-800 dark:text-blue-400">
          Colors cycle through this palette based on character order
        </p>
      </div>
    </div>
  )
})
