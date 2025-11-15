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
                <strong>Status:</strong> Story 2.1 - Story CRUD operations implemented
              </p>
            </div>

            {/* Story CRUD Test - Story 2.1 */}
            <StoryCRUDTest />

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
