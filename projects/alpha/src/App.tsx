import { useState, useEffect } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
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
import { OpenRouterTest } from '@/components/tests/OpenRouterTest'
import { StoryCRUDTest } from '@/components/tests/StoryCRUDTest'
import { ChapterManagementTest } from '@/components/tests/ChapterManagementTest'
import { SceneManagementTest } from '@/components/tests/SceneManagementTest'
import { StoryTreeTest } from '@/components/tests/StoryTreeTest'
import { CharacterCRUDTest } from '@/components/tests/CharacterCRUDTest'
import { CharacterManager } from '@/components/CharacterManager'
import { useAllStories } from '@/hooks/useConvexQueries'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || 'http://localhost:3210'
)

function App() {
  const [isDark, setIsDark] = useState(false)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const stories = useAllStories()

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(isDarkMode)
    updateTheme(isDarkMode)
  }, [])

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    updateTheme(newIsDark)
  }

  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 max-w-2xl mx-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-0">
                Narrative Canvas Platform
              </h1>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
            </div>

            {/* OpenRouter API Test */}
            <OpenRouterTest />

            {/* Platform Status */}
            <div className="text-slate-600 dark:text-slate-400 mb-6 space-y-3">
              <p className="text-lg">✅ React 18.2+ with TypeScript 5.9+</p>
              <p className="text-lg">✅ Vite 7.2+ development server</p>
              <p className="text-lg">✅ Convex backend ready</p>
              <p className="text-lg">✅ Tailwind CSS 4.0 configured</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-4 mb-6">
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                <strong>Environment:</strong> development
              </p>
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                <strong>Status:</strong> Story 3.2 - CharacterManager Production UI implemented
              </p>
            </div>

            {/* Story CRUD Test - Story 2.1 */}
            <StoryCRUDTest />

            {/* Character CRUD Test - Story 3.1 */}
            <CharacterCRUDTest />

            {/* CharacterManager Production UI - Story 3.2 */}
            <div className="border dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4 mb-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-4 dark:text-slate-100">
                👥 Character Manager (Story 3.2 - Production UI)
              </h3>

              {/* Story Selector */}
              <div className="space-y-2 pb-4 border-b dark:border-slate-700">
                <label className="text-sm font-medium block dark:text-slate-200">
                  Select a Story to Manage Characters:
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {stories.map((story) => (
                    <div
                      key={story._id}
                      className={`p-2 rounded border cursor-pointer transition-colors ${
                        selectedStoryId === story._id
                          ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                          : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
                      }`}
                      onClick={() => setSelectedStoryId(story._id)}
                    >
                      <span className="font-medium text-sm dark:text-slate-100">{story.title}</span>
                    </div>
                  ))}
                  {stories.length === 0 && (
                    <p className="text-sm text-muted-foreground dark:text-slate-400 italic">
                      Create a story first using the Story CRUD test above
                    </p>
                  )}
                </div>
              </div>

              {/* CharacterManager Component */}
              {selectedStoryId && (
                <CharacterManager storyId={selectedStoryId as any} />
              )}

              {!selectedStoryId && stories.length > 0 && (
                <p className="text-sm text-muted-foreground dark:text-slate-400 italic text-center py-8">
                  Select a story above to manage its characters
                </p>
              )}
            </div>

            {/* Chapter Management Test - Story 2.2 */}
            <ChapterManagementTest />

            {/* Scene Management Test - Story 2.3 */}
            <SceneManagementTest />

            {/* Story Tree Test - Story 2.4 */}
            <StoryTreeTest />

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
