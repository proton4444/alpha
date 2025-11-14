import { useState } from 'react'
import { ConvexProvider, ConvexReactClient, useMutation } from 'convex/react'
import { api } from '../convex/_generated/api'

const convex = new ConvexReactClient(
  import.meta.env.VITE_CONVEX_URL || 'http://localhost:3210'
)

function TestComponent() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testOpenRouter = useMutation(api.actions.testOpenRouterConnection)

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
                <strong>Status:</strong> Ready for Story 1.3 testing
              </p>
            </div>
          </div>
        </div>
      </div>
    </ConvexProvider>
  )
}

export default App
