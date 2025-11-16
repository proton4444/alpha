import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { Workspace } from '@/components/Workspace'
import { GraphicalCanvasDemo } from '@/components/canvas/GraphicalCanvasDemo'
import { useAllStories } from '@/hooks/useConvexQueries'

// Lazy load test components to reduce production bundle size
const TestComponents = lazy(() => import('@/dev/TestComponents').then(module => ({ default: module.TestComponents })))

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
  // Initialize theme from localStorage or system preference (lazy initializer - runs once)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return savedTheme ? savedTheme === 'dark' : prefersDark
  })
  const [showTestComponents, setShowTestComponents] = useState(false)
  const [useGraphicalCanvas, setUseGraphicalCanvas] = useState(true)
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

  // Apply theme to DOM when isDark changes
  useEffect(() => {
    updateTheme(isDark)
  }, [isDark, updateTheme])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    updateTheme(newIsDark)
  }

  // Production workspace view (default)
  if (!showTestComponents) {
    return (
      <div className="relative h-screen">
        {/* Theme Toggle (floating) */}
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110 focus:ring-2 focus:ring-purple-500"
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
        </button>

        {/* Canvas/Workspace Toggle (floating) */}
        <button
          onClick={() => setUseGraphicalCanvas(!useGraphicalCanvas)}
          className="fixed top-4 right-16 z-50 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm font-medium focus:ring-2 focus:ring-purple-500"
          title={useGraphicalCanvas ? 'Switch to text view' : 'Switch to canvas view'}
        >
          {useGraphicalCanvas ? '📝 Text' : '🎨 Canvas'}
        </button>

        {/* Test Components Toggle (floating) */}
        <button
          onClick={() => setShowTestComponents(true)}
          className="fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg bg-white hover:bg-gray-100 text-black transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-sm font-medium focus:ring-2 focus:ring-purple-500"
          title="Show test components for development"
        >
          🧪 Dev Tools
        </button>

        {/* Main view - Canvas or Workspace */}
        {useGraphicalCanvas ? <GraphicalCanvasDemo /> : <Workspace />}
      </div>
    )
  }

  // Test Components view (lazy loaded)
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading dev tools...</p>
          </div>
        </div>
      }
    >
      <TestComponents
        isDark={isDark}
        toggleTheme={toggleTheme}
        onClose={() => setShowTestComponents(false)}
        selectedStoryId={selectedStoryId}
        setSelectedStoryId={setSelectedStoryId}
        selectedSceneId={selectedSceneId}
        setSelectedSceneId={setSelectedSceneId}
        stories={stories}
      />
    </Suspense>
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
