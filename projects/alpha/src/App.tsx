import { useState } from 'react'
import { ConvexProvider, ConvexReactClient, useAction } from 'convex/react'
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
                <strong>Status:</strong> Story 1.5 - shadcn/ui components ready
              </p>
            </div>

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
