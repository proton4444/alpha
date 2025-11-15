import React, { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export const OpenRouterTest = React.memo(function OpenRouterTest() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3-haiku')

  const testOpenRouter = useAction(api.actions.openrouter.testOpenRouterConnection)

  const models = [
    { id: 'anthropic/claude-3-haiku', name: '🔷 Claude 3 Haiku' },
    { id: 'deepseek/deepseek-chat-v3.1:free', name: '🔍 DeepSeek Chat v3.1' },
    { id: 'moonshotai/kimi-k2-thinking', name: '🧠 Moonshot Kimi K2 Thinking' },
    { id: 'mistralai/mistral-7b-instruct:free', name: '🎯 Mistral 7B' },
  ]

  const handleTest = async () => {
    setLoading(true)
    try {
      const response = await testOpenRouter({ model: selectedModel })
      setResult(response)
      console.log('Test result:', response)
    } catch (error) {
      setResult({ error: String(error) })
      console.error('Test failed:', error)
    }
    setLoading(false)
  }

  return (
    <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 transition-colors duration-300">
      <h2 className="dark:text-slate-100">🧪 OpenRouter API Test - Stable & Ready ✅</h2>

      <div className="mt-4 space-y-3">
        <label className="text-sm font-medium block dark:text-slate-200">Select Model:</label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 rounded border dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleTest}
        disabled={loading}
        className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded transition-colors disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test OpenRouter Connection'}
      </button>

      {result && (
        <pre className={`mt-5 p-3 rounded overflow-auto text-sm transition-colors ${
          result.success
            ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
            : 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
        }`}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
})
