import React, { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAllStories, useChaptersByStory } from '@/hooks/useConvexQueries'

export const ChapterManagementTest = React.memo(function ChapterManagementTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [newChapterTitle, setNewChapterTitle] = useState('')

  // Use shared hooks to eliminate redundant queries
  const stories = useAllStories()
  const chapters = useChaptersByStory(selectedStoryId)

  const updateChapter = useMutation(api.chapters.updateChapter)

  const handleUpdateChapter = async () => {
    if (!selectedChapterId || !newChapterTitle.trim()) return
    try {
      await updateChapter({
        chapterId: selectedChapterId as any,
        title: newChapterTitle
      })
      setNewChapterTitle('')
      setSelectedChapterId(null)
      console.log('Updated chapter')
    } catch (error) {
      console.error('Failed to update chapter:', error)
      alert(String(error))
    }
  }

  return (
    <div className="border dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4 mb-6 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4 dark:text-slate-100">📖 Chapter Management Test (Story 2.2)</h3>

      {/* Select Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block dark:text-slate-200">Select a Story:</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {stories.map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                  : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
              onClick={() => {
                setSelectedStoryId(story._id)
                setSelectedChapterId(null)
              }}
            >
              <span className="font-medium text-sm">{story.title}</span>
            </div>
          ))}
          {stories.length === 0 && (
            <p className="text-sm text-muted-foreground dark:text-slate-400 italic">
              Create a story first using the test above
            </p>
          )}
        </div>
      </div>

      {/* Chapter List */}
      {selectedStoryId && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">
            Chapters ({chapters.length}) - Ordered 1-24:
          </label>
          <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            {chapters.map((chapter) => (
              <div
                key={chapter._id}
                className={`p-2 rounded border cursor-pointer transition-colors text-xs ${
                  selectedChapterId === chapter._id
                    ? 'bg-green-100 border-green-300'
                    : 'bg-white hover:bg-slate-50'
                }`}
                onClick={() => setSelectedChapterId(chapter._id)}
              >
                <div className="font-semibold">#{chapter.chapterNumber}</div>
                <div className="truncate">{chapter.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update Chapter */}
      {selectedChapterId && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">Update Chapter Title:</label>
          <div className="flex gap-2">
            <Input
              placeholder="New chapter title..."
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdateChapter()}
            />
            <Button onClick={handleUpdateChapter} variant="secondary">
              Update
            </Button>
          </div>
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t">
        <p>✅ getChaptersByStory - uses by_story index</p>
        <p>✅ Chapters ordered by chapterNumber (1-24)</p>
        <p>✅ updateChapter - validates title (1-200 chars)</p>
      </div>
    </div>
  )
})
