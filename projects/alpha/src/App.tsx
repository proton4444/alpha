import { useState } from 'react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || 'https://placeholder.convex.cloud'
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <ConvexProvider client={convex}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Narrative Canvas Platform
            </h1>

            <div className="text-slate-600 mb-6 space-y-3">
              <p className="text-lg">
                ✅ React 19.2+ with TypeScript 5.9+
              </p>
              <p className="text-lg">
                ✅ Vite 7.2+ development server
              </p>
              <p className="text-lg">
                ✅ Convex backend ready
              </p>
              <p className="text-lg">
                ✅ Tailwind CSS 4.0 configured
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p className="text-blue-900 text-sm">
                <strong>Environment:</strong> {import.meta.env.MODE}
              </p>
              <p className="text-blue-900 text-sm">
                <strong>Convex URL:</strong> {import.meta.env.VITE_CONVEX_URL ? '✓ Configured' : '⚠ Not configured'}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setCount((c) => c + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Click count: {count}
              </button>

              <p className="text-center text-sm text-slate-500">
                Story 1.1: Initialize Convex + React Project ✓ Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConvexProvider>
  )
}

export default App
