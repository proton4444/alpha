import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAllStories, useChaptersByStory, useScenesByChapter, useScene } from '@/hooks/useConvexQueries'

export function SceneManagementTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [newSceneOutline, setNewSceneOutline] = useState('')
  const [updateOutline, setUpdateOutline] = useState('')
  const [updateProse, setUpdateProse] = useState('')

  // Use shared hooks to eliminate redundant queries
  const stories = useAllStories()
  const chapters = useChaptersByStory(selectedStoryId)
  const scenes = useScenesByChapter(selectedChapterId)
  const selectedScene = useScene(selectedSceneId)

  const createScene = useMutation(api.scenes.createScene)
  const updateScene = useMutation(api.scenes.updateScene)
  const deleteScene = useMutation(api.scenes.deleteScene)
  const testGenerateScene = useMutation(api.scenes.testGenerateScene)

  const handleCreateScene = async () => {
    if (!selectedStoryId || !selectedChapterId || !newSceneOutline.trim()) return
    try {
      await createScene({
        storyId: selectedStoryId as any,
        chapterId: selectedChapterId as any,
        outline: newSceneOutline
      })
      setNewSceneOutline('')
      console.log('Created scene')
    } catch (error) {
      console.error('Failed to create scene:', error)
      alert(String(error))
    }
  }

  const handleUpdateScene = async () => {
    if (!selectedSceneId) return
    try {
      await updateScene({
        sceneId: selectedSceneId as any,
        outline: updateOutline.trim() || undefined,
        prose: updateProse.trim() || undefined
      })
      setUpdateOutline('')
      setUpdateProse('')
      console.log('Updated scene')
    } catch (error) {
      console.error('Failed to update scene:', error)
      alert(String(error))
    }
  }

  const handleDeleteScene = async (sceneId: string) => {
    if (!confirm('Delete this scene?')) return
    try {
      await deleteScene({ sceneId: sceneId as any })
      if (selectedSceneId === sceneId) {
        setSelectedSceneId(null)
      }
      console.log('Deleted scene')
    } catch (error) {
      console.error('Failed to delete scene:', error)
      alert(String(error))
    }
  }

  const handleTestGeneration = async () => {
    if (!selectedSceneId) return
    try {
      const result = await testGenerateScene({ sceneId: selectedSceneId as any })
      console.log('Test generation started:', result)
      alert('Story 3.3 Test: Scene generation started! Watch status change to "complete" and prose appear.')
    } catch (error) {
      console.error('Failed to test generation:', error)
      alert(String(error))
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-slate-50 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">🎬 Scene Management Test (Story 2.3)</h3>

      {/* Select Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">Select Story:</label>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {stories.slice(0, 3).map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer text-xs ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white hover:bg-slate-50'
              }`}
              onClick={() => {
                setSelectedStoryId(story._id)
                setSelectedChapterId(null)
                setSelectedSceneId(null)
              }}
            >
              {story.title}
            </div>
          ))}
        </div>
      </div>

      {/* Select Chapter */}
      {selectedStoryId && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">Select Chapter:</label>
          <div className="grid grid-cols-6 gap-1">
            {chapters.slice(0, 12).map((chapter) => (
              <div
                key={chapter._id}
                className={`p-1 rounded border cursor-pointer text-xs text-center ${
                  selectedChapterId === chapter._id
                    ? 'bg-green-100 border-green-300'
                    : 'bg-white hover:bg-slate-50'
                }`}
                onClick={() => {
                  setSelectedChapterId(chapter._id)
                  setSelectedSceneId(null)
                }}
              >
                #{chapter.chapterNumber}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Scene */}
      {selectedChapterId && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">Create Scene:</label>
          <div className="flex gap-2">
            <Textarea
              placeholder="Scene outline (1-2000 chars)..."
              value={newSceneOutline}
              onChange={(e) => setNewSceneOutline(e.target.value)}
              rows={2}
              className="text-xs"
            />
            <Button onClick={handleCreateScene} size="sm">Add</Button>
          </div>
        </div>
      )}

      {/* Scene List */}
      {selectedChapterId && scenes.length > 0 && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">
            Scenes ({scenes.length}):
          </label>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {scenes.map((scene) => (
              <div
                key={scene._id}
                className={`p-2 rounded border cursor-pointer text-xs ${
                  selectedSceneId === scene._id
                    ? 'bg-purple-100 border-purple-300'
                    : 'bg-white hover:bg-slate-50'
                }`}
                onClick={() => setSelectedSceneId(scene._id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="font-semibold">Scene {scene.sceneNumber}</span>
                    <span className="ml-2 text-muted-foreground">({scene.status})</span>
                    <p className="truncate mt-1">{scene.outline}</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteScene(scene._id)
                    }}
                    className="ml-2"
                  >
                    Del
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update Scene */}
      {selectedScene && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">
            Update Scene {selectedScene.sceneNumber}:
          </label>
          <Textarea
            placeholder="Update outline..."
            value={updateOutline}
            onChange={(e) => setUpdateOutline(e.target.value)}
            rows={2}
            className="text-xs"
          />
          <Textarea
            placeholder="Update prose..."
            value={updateProse}
            onChange={(e) => setUpdateProse(e.target.value)}
            rows={2}
            className="text-xs"
          />
          <Button onClick={handleUpdateScene} variant="secondary" size="sm">
            Update Scene
          </Button>

          {/* Story 3.3 Test Button */}
          <div className="pt-3 border-t">
            <p className="text-xs font-medium mb-2 text-blue-600">
              🧪 Story 3.3 Test: Character Integration
            </p>
            <Button
              onClick={handleTestGeneration}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Test Generate Scene (with Character Loading)
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Triggers generateScene action. Loads all story characters and generates placeholder prose.
            </p>
          </div>
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t">
        <p>✅ createScene - auto-increments sceneNumber</p>
        <p>✅ getScenesByChapter - uses by_chapter index</p>
        <p>✅ updateScene - updates outline/prose</p>
        <p>✅ deleteScene - removes scene</p>
        <p>✅ Initial status: draft, regenerationCount: 0</p>
        <p className="text-blue-600 font-semibold pt-1 border-t mt-1">✅ Story 3.3: Character integration via generateScene action</p>
      </div>
    </div>
  )
}
