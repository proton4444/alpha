import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface GenerationStatusProps {
  sceneNumber?: number
  onCancel?: () => void
}

/**
 * GenerationStatus Component (Story 5.4)
 *
 * Displays detailed progress feedback during AI scene generation:
 * - Spinner animation
 * - Elapsed time display
 * - Estimated time remaining
 * - Helpful messaging
 * - Visual progress indication
 *
 * Note: For PoC, shows general progress. Detailed step tracking
 * (Character Agent vs Scene Writer) would require backend changes.
 */
export function GenerationStatus({ sceneNumber, onCancel }: GenerationStatusProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  // Track elapsed time (Story 5.4)
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Estimate remaining time (typical generation is 5-15 seconds)
  const estimatedTotal = 12 // seconds
  const progress = Math.min((elapsedSeconds / estimatedTotal) * 100, 95) // Cap at 95% until actually complete

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Main Status */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          {/* Spinner */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-purple-600 dark:border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          🤖 AI Generation in Progress
        </h3>

        {sceneNumber && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Scene {sceneNumber}
          </p>
        )}
      </div>

      {/* Progress Bar (Story 5.5: Enhanced with smooth animations) */}
      <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 transition-colors duration-200">
          <span className="font-medium">Generating prose...</span>
          <span className="font-mono">{elapsedSeconds}s elapsed</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 transition-colors duration-200">
          {elapsedSeconds < estimatedTotal
            ? `~${estimatedTotal - elapsedSeconds}s remaining`
            : 'Finishing up...'}
        </p>
      </div>

      {/* Steps Display (Story 5.5: Enhanced with transitions) */}
      <div className="w-full max-w-md bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3 transition-colors duration-200 shadow-sm">
        <div className="flex items-start gap-3 transition-all duration-200">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center shadow-sm transition-all duration-200">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white transition-colors duration-200">Character Analysis</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors duration-200">Analyzing character traits and context</p>
          </div>
        </div>

        <div className="flex items-start gap-3 transition-all duration-200">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center animate-pulse shadow-sm">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white transition-colors duration-200">Scene Writing</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 transition-colors duration-200">Crafting narrative prose (300-500 words)</p>
          </div>
        </div>
      </div>

      {/* Helpful Info */}
      <div className="w-full max-w-md bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <p className="text-xs text-blue-900 dark:text-blue-100">
          <strong>💡 Tip:</strong> This typically takes 5-15 seconds. The AI is analyzing your
          characters and crafting prose that matches their voice and the scene's emotional tone.
        </p>
      </div>

      {/* Cancel Option (for future enhancement) */}
      {onCancel && (
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
          className="text-slate-600 dark:text-slate-400"
        >
          Cancel Generation
        </Button>
      )}
    </div>
  )
}

interface GenerationErrorProps {
  errorMessage: string
  onRetry: () => void
  onDismiss?: () => void
}

/**
 * GenerationError Component (Story 5.4)
 *
 * Displays error state with recovery options
 */
export function GenerationError({ errorMessage, onRetry, onDismiss }: GenerationErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      {/* Error Icon */}
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
        <span className="text-3xl">⚠️</span>
      </div>

      {/* Error Message */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Generation Failed
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          {errorMessage}
        </p>
      </div>

      {/* Recovery Options (Story 5.5: Enhanced with transitions) */}
      <div className="flex gap-3">
        <Button
          onClick={onRetry}
          className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          🔄 Retry Generation
        </Button>
        {onDismiss && (
          <Button
            onClick={onDismiss}
            variant="outline"
            className="transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            Dismiss
          </Button>
        )}
      </div>

      {/* Troubleshooting Tips */}
      <div className="w-full max-w-md bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <p className="text-xs text-yellow-900 dark:text-yellow-100 font-medium mb-2">
          Common Issues:
        </p>
        <ul className="text-xs text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
          <li>Rate limits - Wait 30 seconds and retry</li>
          <li>Network issues - Check your connection</li>
          <li>Service temporarily unavailable - Try again later</li>
        </ul>
      </div>
    </div>
  )
}
