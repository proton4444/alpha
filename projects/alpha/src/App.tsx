import { useState, useEffect, useMemo, useCallback } from 'react'
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
import { Workspace } from '@/components/Workspace'
import { OpenRouterTest } from '@/components/tests/OpenRouterTest'
import { StoryCRUDTest } from '@/components/tests/StoryCRUDTest'
import { ChapterManagementTest } from '@/components/tests/ChapterManagementTest'
import { SceneManagementTest } from '@/components/tests/SceneManagementTest'
import { StoryTreeTest } from '@/components/tests/StoryTreeTest'
import { CharacterCRUDTest } from '@/components/tests/CharacterCRUDTest'
import { CharacterManager } from '@/components/CharacterManager'
import { SceneEditor } from '@/components/SceneEditor'
import { ChapterNodeTest } from '@/components/tests/ChapterNodeTest'
import { ChapterOverviewTest } from '@/components/tests/ChapterOverviewTest'
import { ChapterWorkspaceTest } from '@/components/tests/ChapterWorkspaceTest'
import { CharacterBadgesTest } from '@/components/tests/CharacterBadgesTest'
import { DragDropTest } from '@/components/tests/DragDropTest'
import { StatusFilterTest } from '@/components/tests/StatusFilterTest'
import { DataCleanupTest } from '@/components/tests/DataCleanupTest'
import { useAllStories } from '@/hooks/useConvexQueries'

// Initialize ConvexReactClient as singleton (only once per session)
let convexInstance: ConvexReactClient | null = null

function getConvexClient(): ConvexReactClient {
  if (!convexInstance) {
    convexInstance = new ConvexReactClient(
      import.meta.env.VITE_CONVEX_URL || 'http://localhost:3210'
    )
  }
  return convexInstance
}

function AppContent() {
  const [isDark, setIsDark] = useState(false)
  const [showTestComponents, setShowTestComponents] = useState(false)
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedSceneId, setSelectedSceneId] = useState<string | null>(null)
  const stories = useAllStories()

  const updateTheme = useCallback((dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(isDarkMode)
    updateTheme(isDarkMode)
  }, [updateTheme])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    updateTheme(newIsDark)
  }

  // Story 5.1: Production workspace view (default)
  if (!showTestComponents) {
    return (
      <div className="relative h-screen">
        {/* Theme Toggle (floating) - Story 5.5: Enhanced */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 focus:ring-2 focus:ring-purple-500"
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
        </button>

        {/* Test Components Toggle (floating) - Story 5.5: Enhanced */}
        <button
          onClick={() => setShowTestComponents(true)}
          className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm font-medium focus:ring-2 focus:ring-purple-500"
          title="Show test components for development"
        >
          🧪 Dev Tools
        </button>

        {/* Production Workspace */}
        <Workspace />
      </div>
    )
  }

  // Test Components view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 max-w-2xl mx-auto transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-0">
                  Narrative Canvas Platform
                </h1>
                <span className="text-xs px-2 py-1 rounded bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-medium">
                  TEST MODE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowTestComponents(false)}
                  className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 text-sm font-medium hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-purple-500"
                  title="Return to production workspace"
                >
                  ← Workspace
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-purple-500"
                  title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                >
                  {isDark ? '☀️' : '🌙'}
                </button>
              </div>
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
                <strong>Environment:</strong> development (test mode)
              </p>
              <p className="text-blue-900 dark:text-blue-100 text-sm">
                <strong>Status:</strong> Story 5.1 - Split-Screen Workspace with Responsive Design implemented
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-xs mt-2">
                💡 Click "← Workspace" above to view the production split-screen layout
              </p>
            </div>

            {/* Utilities */}
            <details className="border-2 border-red-500 dark:border-red-700 rounded-lg overflow-hidden mb-6">
              <summary className="cursor-pointer px-6 py-4 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-semibold text-lg text-red-900 dark:text-red-100">
                🧹 Utilities & Data Management
              </summary>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
                {/* Data Cleanup Utility - Clear test data */}
                <DataCleanupTest />
              </div>
            </details>

            {/* Story & Content Management (Stories 2-3) */}
            <details className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden mb-6">
              <summary className="cursor-pointer px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold text-lg text-slate-900 dark:text-white">
                📚 Story & Content Management (Stories 2.1 - 3.1)
              </summary>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
                {/* Story CRUD Test - Story 2.1 */}
                <StoryCRUDTest />

                {/* Chapter Management Test - Story 2.2 */}
                <ChapterManagementTest />

                {/* Scene Management Test - Story 2.3 */}
                <SceneManagementTest />

                {/* Story Tree Test - Story 2.4 */}
                <StoryTreeTest />

                {/* Character CRUD Test - Story 3.1 */}
                <CharacterCRUDTest />
              </div>
            </details>

            {/* Production UI Components (Stories 3-4) */}
            <details className="border border-purple-300 dark:border-purple-700 rounded-lg overflow-hidden mb-6">
              <summary className="cursor-pointer px-6 py-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors font-semibold text-lg text-purple-900 dark:text-purple-100">
                ✏️ Production Editors (Stories 3.2 - 4.6)
              </summary>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
                {/* CharacterManager Production UI - Story 3.2 */}
                <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">📋 Character Manager UI (Story 3.2)</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">Select a Story to Manage Characters:</label>
                    {stories.length === 0 ? (
                      <p className="text-sm text-slate-600 dark:text-slate-400">Create a story first using the test above</p>
                    ) : (
                      <div className="space-y-2">
                        {stories.map((story) => (
                          <button
                            key={story._id}
                            onClick={() => setSelectedStoryId(story._id)}
                            className={`block w-full text-left px-4 py-2 rounded border transition-colors ${
                              selectedStoryId === story._id
                                ? 'bg-blue-500 text-white border-blue-600'
                                : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
                            }`}
                          >
                            {story.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedStoryId && (
                    <div className="mt-4 border-t pt-4">
                      <CharacterManager storyId={selectedStoryId as any} />
                    </div>
                  )}
                </div>

                {/* SceneEditor Production UI - Stories 4.5 & 4.6 */}
                <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">✏️ Scene Editor (Stories 4.5 & 4.6)</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">
                      Select a Scene to Edit (use Scene Management Test above to create scenes):
                    </label>
                    <Input
                      type="text"
                      placeholder="Paste scene ID here..."
                      value={selectedSceneId || ''}
                      onChange={(e) => setSelectedSceneId(e.target.value || null)}
                      className="mb-4"
                    />
                  </div>
                  {selectedSceneId && (
                    <div className="mt-4 border-t pt-4 bg-white dark:bg-slate-800 rounded-lg min-h-[600px]">
                      <SceneEditor sceneId={selectedSceneId as any} />
                    </div>
                  )}
                  <div className="text-xs space-y-1 pt-2 border-t text-slate-700 dark:text-slate-300">
                    <p className="font-semibold">Story 4.5 Features:</p>
                    <p>✅ Scene outline input with auto-save (1 second debounce)</p>
                    <p>✅ "Generate Prose" button</p>
                    <p>✅ Generation status display (Draft / Generating / Complete / Error)</p>
                    <p>✅ Generated prose display area</p>
                    <p className="font-semibold mt-2">Story 4.6 Features:</p>
                    <p>✅ Accept button (green) - marks scene as final</p>
                    <p>✅ Regenerate button (yellow) - triggers regeneration with count increment</p>
                    <p>✅ Edit button (blue) - enables manual editing with Save button</p>
                  </div>
                </div>
              </div>
            </details>

            {/* Story 6: Chapter Node-Based UI Tests */}
            <details open className="border border-blue-300 dark:border-blue-700 rounded-lg overflow-hidden mb-6">
              <summary className="cursor-pointer px-6 py-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-semibold text-lg text-blue-900 dark:text-blue-100">
                🎯 Story 6: Chapter Node UI (Grid View)
              </summary>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
                {/* Chapter Node Test - Story 6.1 */}
                <ChapterNodeTest />

                {/* Chapter Overview Test - Story 6.2 */}
                <ChapterOverviewTest />

                {/* Chapter Workspace Test - Story 6 Integration */}
                <ChapterWorkspaceTest />

                {/* Drag Drop Test - Story 6.4 */}
                <DragDropTest />

                {/* Character Badges Test - Story 6.5 */}
                <CharacterBadgesTest />

                {/* Status Filter Test - Story 6.6 */}
                <StatusFilterTest />
              </div>
            </details>
            {/* shadcn/ui Components Demo - Story 1.5 */}
            <details className="border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden mb-6">
              <summary className="cursor-pointer px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-semibold text-lg text-slate-900 dark:text-white">
                🎨 shadcn/ui Component Library (Story 1.5)
              </summary>
              <div className="p-6 space-y-6 bg-white dark:bg-slate-900">
                <div className="border rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">shadcn/ui Components Demo</h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">Button Variants:</label>
                      <div className="flex gap-2 flex-wrap">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Destructive</Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">Input:</label>
                      <Input placeholder="Type something..." />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">Textarea:</label>
                      <Textarea placeholder="Enter your text here..." />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block text-slate-700 dark:text-slate-300">Dialog:</label>
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
            </details>
          </div>
        </div>
      </div>
    )
}

function App() {
  const convex = useMemo(() => getConvexClient(), [])
  return (
    <ConvexProvider client={convex}>
      <AppContent />
    </ConvexProvider>
  )
}

export default App
