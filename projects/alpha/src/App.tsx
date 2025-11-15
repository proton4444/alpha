import { useState } from 'react'
import { ConvexProvider, ConvexReactClient, useMutation, useAction, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || 'http://localhost:3210'
)

function TestComponent() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testOpenRouter = useAction(api.actions.openrouter.testOpenRouterConnection)

  const handleTest = async () => {
    setLoading(true)
    try {
      const response = await testOpenRouter()
      setResult(response)
      console.log('Test result:', response)
    } catch (error) {
      setResult({ error: String(error) })
      console.error('Test failed:', error)
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', margin: '20px' }}>
      <h2>🧪 OpenRouter API Test</h2>
      <button
        onClick={handleTest}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        {loading ? 'Testing...' : 'Test OpenRouter Connection'}
      </button>

      {result && (
        <pre style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

function StoryCRUDTest() {
  const [newStoryTitle, setNewStoryTitle] = useState('')
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [updateTitle, setUpdateTitle] = useState('')

  const stories = useQuery(api.stories.getAllStories) ?? []
  const selectedStory = useQuery(
    api.stories.getStory,
    selectedStoryId ? { storyId: selectedStoryId as any } : "skip"
  )

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
    <div className="border rounded-lg p-6 bg-slate-50 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">📚 Story CRUD Test (Story 2.1)</h3>

      {/* Create Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">Create New Story:</label>
        <div className="flex gap-2">
          <Input
            placeholder="Story title..."
            value={newStoryTitle}
            onChange={(e) => setNewStoryTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
          />
          <Button onClick={handleCreate}>Create</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Creates story with 24 auto-generated chapters
        </p>
      </div>

      {/* Story List */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">
          Stories ({stories.length}):
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {stories.map((story) => (
            <div
              key={story._id}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white hover:bg-slate-50'
              }`}
              onClick={() => setSelectedStoryId(story._id)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{story.title}</span>
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
            <p className="text-sm text-muted-foreground italic">
              No stories yet. Create one above!
            </p>
          )}
        </div>
      </div>

      {/* Update Selected Story */}
      {selectedStory && (
        <div className="space-y-2 border-t pt-4">
          <label className="text-sm font-medium block">
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
      <div className="text-xs space-y-1 pt-2 border-t">
        <p>✅ createStory - creates story + 24 chapters</p>
        <p>✅ getStory - retrieves story by ID</p>
        <p>✅ getAllStories - lists all stories</p>
        <p>✅ updateStory - updates story title (1-200 chars)</p>
        <p>✅ deleteStory - cascades to chapters & scenes</p>
      </div>
    </div>
  )
}

function ChapterManagementTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [newChapterTitle, setNewChapterTitle] = useState('')

  const stories = useQuery(api.stories.getAllStories) ?? []
  const chapters = useQuery(
    api.chapters.getChaptersByStory,
    selectedStoryId ? { storyId: selectedStoryId as any } : "skip"
  ) ?? []

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
    <div className="border rounded-lg p-6 bg-slate-50 space-y-4 mb-6">
      <h3 className="text-xl font-semibold mb-4">📖 Chapter Management Test (Story 2.2)</h3>

      {/* Select Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block">Select a Story:</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {stories.map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 border-blue-300'
                  : 'bg-white hover:bg-slate-50'
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
            <p className="text-sm text-muted-foreground italic">
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
}

function SceneManagementTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const [newSceneOutline, setNewSceneOutline] = useState('')
  const [updateOutline, setUpdateOutline] = useState('')
  const [updateProse, setUpdateProse] = useState('')

  const stories = useQuery(api.stories.getAllStories) ?? []
  const chapters = useQuery(
    api.chapters.getChaptersByStory,
    selectedStoryId ? { storyId: selectedStoryId as any } : "skip"
  ) ?? []
  const scenes = useQuery(
    api.scenes.getScenesByChapter,
    selectedChapterId ? { chapterId: selectedChapterId as any } : "skip"
  ) ?? []
  const selectedScene = useQuery(
    api.scenes.getScene,
    selectedSceneId ? { sceneId: selectedSceneId as any } : "skip"
  )

  const createScene = useMutation(api.scenes.createScene)
  const updateScene = useMutation(api.scenes.updateScene)
  const deleteScene = useMutation(api.scenes.deleteScene)

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
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t">
        <p>✅ createScene - auto-increments sceneNumber</p>
        <p>✅ getScenesByChapter - uses by_chapter index</p>
        <p>✅ updateScene - updates outline/prose</p>
        <p>✅ deleteScene - removes scene</p>
        <p>✅ Initial status: draft, regenerationCount: 0</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Narrative Canvas Platform
            </h1>

            {/* Test Component */}
            <TestComponent />

            {/* Rest of app */}
            <div className="text-slate-600 mb-6 space-y-3">
              <p className="text-lg">✅ React 18.2+ with TypeScript 5.9+</p>
              <p className="text-lg">✅ Vite 7.2+ development server</p>
              <p className="text-lg">✅ Convex backend ready</p>
              <p className="text-lg">✅ Tailwind CSS 4.0 configured</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p className="text-blue-900 text-sm">
                <strong>Environment:</strong> development
              </p>
              <p className="text-blue-900 text-sm">
                <strong>Status:</strong> Story 2.3 - Scene Management implemented
              </p>
            </div>

            {/* Story CRUD Test - Story 2.1 */}
            <StoryCRUDTest />

            {/* Chapter Management Test - Story 2.2 */}
            <ChapterManagementTest />

            {/* Scene Management Test - Story 2.3 */}
            <SceneManagementTest />

            {/* shadcn/ui Components Demo - Story 1.5 */}
            <div className="border rounded-lg p-6 bg-slate-50 space-y-4">
              <h3 className="text-xl font-semibold mb-4">shadcn/ui Components Demo</h3>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Button Variants:</label>
                  <div className="flex gap-2 flex-wrap">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Input:</label>
                  <Input placeholder="Type something..." />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Textarea:</label>
                  <Textarea placeholder="Enter your text here..." />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Dialog:</label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Dialog Title</DialogTitle>
                        <DialogDescription>
                          This is a dialog component from shadcn/ui. It demonstrates the modal functionality.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Input placeholder="Name" />
                        <Textarea placeholder="Description" />
                      </div>
                      <Button>Save</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConvexProvider>
  )
}

export default App
