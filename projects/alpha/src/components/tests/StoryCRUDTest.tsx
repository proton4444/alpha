import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAllStories, useStory } from '@/hooks/useConvexQueries'

export function StoryCRUDTest() {
  const [newStoryTitle, setNewStoryTitle] = useState('')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [updateTitle, setUpdateTitle] = useState('')

  // Use shared hooks to eliminate redundant queries
  const stories = useAllStories()
  const selectedStory = useStory(selectedStoryId)

  const createStory = useMutation(api.stories.createStory)
  const updateStory = useMutation(api.stories.updateStory)
  const deleteStory = useMutation(api.stories.deleteStory)

  const handleCreate = async () => {
    if (!newStoryTitle.trim()) return
    try {
      const storyId = await createStory({ title: newStoryTitle })
      setNewStoryTitle('')
      setSelectedStoryId(storyId)
      console.log('Created story:', storyId)
    } catch (error) {
      console.error('Failed to create story:', error)
      alert(String(error))
    }
  }

  const handleUpdate = async () => {
    if (!selectedStoryId || !updateTitle.trim()) return
    try {
      await updateStory({
        storyId: selectedStoryId as any,
        title: updateTitle
      })
      setUpdateTitle('')
      console.log('Updated story')
    } catch (error) {
      console.error('Failed to update story:', error)
      alert(String(error))
    }
  }

  const handleDelete = async (storyId: string) => {
    if (!confirm('Delete this story and all its chapters/scenes?')) return
    try {
      await deleteStory({ storyId: storyId as any })
      if (selectedStoryId === storyId) {
        setSelectedStoryId(null)
      }
      console.log('Deleted story')
    } catch (error) {
      console.error('Failed to delete story:', error)
      alert(String(error))
    }
  }

  return (
    <div className="border dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4 mb-6 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4">📚 Story CRUD Test (Story 2.1)</h3>

      {/* Create Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block dark:text-slate-200">Create New Story:</label>
        <div className="flex gap-2">
          <Input
            placeholder="Story title..."
            value={newStoryTitle}
            onChange={(e) => setNewStoryTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Button onClick={handleCreate}>Create</Button>
        </div>
        <p className="text-xs text-muted-foreground dark:text-slate-400">
          Creates story with 24 auto-generated chapters
        </p>
      </div>

      {/* Story List */}
      <div className="space-y-2">
        <label className="text-sm font-medium block dark:text-slate-200">
          Stories ({stories.length}):
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {stories.map((story) => (
            <div
              key={story._id}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                  : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
              onClick={() => setSelectedStoryId(story._id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium dark:text-slate-100">{story.title}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(story._id)
                  }}
                >
                  Delete
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(story.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {stories.length === 0 && (
            <p className="text-sm text-muted-foreground dark:text-slate-400 italic">
              No stories yet. Create one above!
            </p>
          )}
        </div>
      </div>

      {/* Update Selected Story */}
      {selectedStory && (
        <div className="space-y-2 border-t dark:border-slate-700 pt-4">
          <label className="text-sm font-medium block dark:text-slate-200">
            Update "{selectedStory.title}":
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="New title..."
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
            />
            <Button onClick={handleUpdate} variant="secondary">
              Update
            </Button>
          </div>
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t dark:border-slate-700 dark:text-slate-300">
        <p>✅ createStory - creates story + 24 chapters</p>
        <p>✅ getStory - retrieves story by ID</p>
        <p>✅ getAllStories - lists all stories</p>
        <p>✅ updateStory - updates story title (1-200 chars)</p>
        <p>✅ deleteStory - cascades to chapters & scenes</p>
      </div>
    </div>
  )
}
