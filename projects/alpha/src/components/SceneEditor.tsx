import React, { useState, useEffect } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { GenerationStatus, GenerationError } from '@/components/GenerationStatus'
import { useScene } from '@/hooks/useConvexQueries'
import type { Id } from '../../convex/_generated/dataModel'

interface SceneEditorProps {
  sceneId: Id<"scenes"> | string | null
}

/**
 * SceneEditor Component (Stories 4.5 & 4.6)
 *
 * Story 4.5: Scene Generation Workflow
 * - Scene outline input with auto-save
 * - "Generate Prose" button
 * - Generation status display
 * - Generated prose display area
 *
 * Story 4.6: Accept/Regenerate/Edit Actions
 * - Accept button (green) - marks scene as final
 * - Regenerate button (yellow) - triggers regeneration
 * - Edit button (blue) - enables manual editing
 */
export const SceneEditor: React.FC<SceneEditorProps> = ({ sceneId }) => {
  const scene = useScene(sceneId)
  const [outlineValue, setOutlineValue] = useState('')
  const [proseValue, setProseValue] = useState('')
  const [isEditingProse, setIsEditingProse] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle')

  const updateScene = useMutation(api.scenes.updateScene)
  const requestSceneGeneration = useMutation(api.scenes.requestSceneGeneration)

  // Update local state when scene data changes
  useEffect(() => {
    if (scene) {
      setOutlineValue(scene.outline || '')
      setProseValue(scene.prose || '')
      // Reset edit mode and accepted state when scene changes
      setIsEditingProse(false)
      setIsAccepted(false)
    }
  }, [scene?._id])

  // Auto-save outline after 1 second of inactivity
  useEffect(() => {
    if (!scene || !outlineValue || outlineValue === scene.outline) {
      return
    }

    setSaveStatus('saving')
    const timer = setTimeout(async () => {
      try {
        await updateScene({
          sceneId: scene._id,
          outline: outlineValue,
        })
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch (error) {
        console.error('Failed to auto-save outline:', error)
        setSaveStatus('idle')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [outlineValue, scene, updateScene])

  // Handle Generate Prose button click
  const handleGenerateProse = async () => {
    if (!scene || !outlineValue.trim()) {
      alert('Please enter a scene outline first')
      return
    }

    try {
      await requestSceneGeneration({
        sceneId: scene._id,
        outline: outlineValue,
      })
    } catch (error) {
      console.error('Failed to request scene generation:', error)
      alert('Failed to start generation: ' + String(error))
    }
  }

  // Handle Accept button click (Story 4.6)
  const handleAccept = () => {
    setIsAccepted(true)
    // Visual confirmation only - no backend change needed for PoC
    setTimeout(() => {
      alert('Scene accepted! ✓')
    }, 100)
  }

  // Handle Regenerate button click (Story 4.6)
  const handleRegenerate = async () => {
    if (!scene || !outlineValue.trim()) {
      alert('Cannot regenerate without an outline')
      return
    }

    if (!confirm('Regenerate this scene? This will replace the current prose.')) {
      return
    }

    try {
      // Reset accepted state
      setIsAccepted(false)

      // Call requestSceneGeneration again with the same outline
      // The backend will increment regenerationCount
      await requestSceneGeneration({
        sceneId: scene._id,
        outline: outlineValue,
      })
    } catch (error) {
      console.error('Failed to regenerate scene:', error)
      alert('Failed to regenerate: ' + String(error))
    }
  }

  // Handle Edit button click (Story 4.6)
  const handleEdit = () => {
    setIsEditingProse(true)
    setIsAccepted(false)
  }

  // Handle Save edited prose (Story 4.6)
  const handleSaveEditedProse = async () => {
    if (!scene) return

    try {
      await updateScene({
        sceneId: scene._id,
        prose: proseValue,
      })
      setIsEditingProse(false)
      alert('Prose saved successfully!')
    } catch (error) {
      console.error('Failed to save edited prose:', error)
      alert('Failed to save prose: ' + String(error))
    }
  }

  // Handle Cancel editing
  const handleCancelEdit = () => {
    // Restore original prose value
    setProseValue(scene?.prose || '')
    setIsEditingProse(false)
  }

  if (!sceneId) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Select a scene to start editing
      </div>
    )
  }

  if (!scene) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        Loading scene...
      </div>
    )
  }

  // Status badge styling
  const getStatusBadge = () => {
    switch (scene.status) {
      case 'draft':
        return <span className="text-xs px-2 py-1 rounded bg-gray-300 text-gray-800">Draft</span>
      case 'generating':
        return <span className="text-xs px-2 py-1 rounded bg-blue-500 text-white animate-pulse">Generating...</span>
      case 'complete':
        return <span className="text-xs px-2 py-1 rounded bg-green-500 text-white">✓ Complete</span>
      case 'error':
        return <span className="text-xs px-2 py-1 rounded bg-red-500 text-white">⚠ Error</span>
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">
          Scene {scene.sceneNumber}
        </h2>
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {scene.regenerationCount > 0 && (
            <span className="text-xs text-slate-500">
              (Regenerated {scene.regenerationCount}x)
            </span>
          )}
          {isAccepted && (
            <span className="text-xs px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold">
              ✓ Accepted
            </span>
          )}
        </div>
      </div>

      {/* Scene Outline Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Scene Outline</label>
          {saveStatus === 'saving' && (
            <span className="text-xs text-slate-500">Saving...</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-xs text-green-600">Saved</span>
          )}
        </div>
        <Textarea
          value={outlineValue}
          onChange={(e) => setOutlineValue(e.target.value)}
          placeholder="Enter your scene outline (1-2000 characters)..."
          rows={4}
          className="resize-none"
          disabled={scene.status === 'generating'}
        />
        <p className="text-xs text-slate-500">
          {outlineValue.length} / 2000 characters
        </p>
      </div>

      {/* Generate Prose Button */}
      <div>
        <Button
          onClick={handleGenerateProse}
          disabled={scene.status === 'generating' || !outlineValue.trim()}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {scene.status === 'generating' ? '⏳ Generating...' : '🤖 Generate Prose'}
        </Button>
      </div>

      {/* Generation Status Display (Story 5.4) */}
      {scene.status === 'generating' && (
        <div className="border border-purple-200 dark:border-purple-800 rounded-lg bg-white dark:bg-slate-800">
          <GenerationStatus sceneNumber={scene.sceneNumber} />
        </div>
      )}

      {/* Error Display (Story 5.4) */}
      {scene.status === 'error' && scene.errorMessage && (
        <div className="border border-red-200 dark:border-red-800 rounded-lg bg-white dark:bg-slate-800">
          <GenerationError
            errorMessage={scene.errorMessage}
            onRetry={handleRegenerate}
          />
        </div>
      )}

      {/* Generated Prose Display / Edit Area */}
      {scene.prose && (
        <div className="flex-1 space-y-3 border-t pt-4">
          <label className="text-sm font-medium text-slate-700">Generated Prose</label>

          {/* Prose Display (Read-only or Editable) */}
          {isEditingProse ? (
            <Textarea
              value={proseValue}
              onChange={(e) => setProseValue(e.target.value)}
              rows={12}
              className="resize-none font-serif text-base leading-relaxed"
            />
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
              <p className="font-serif text-base leading-relaxed whitespace-pre-wrap">
                {scene.prose}
              </p>
            </div>
          )}

          {/* Action Buttons (Story 4.6) */}
          {scene.status === 'complete' && (
            <div className="flex gap-2">
              {isEditingProse ? (
                <>
                  <Button
                    onClick={handleSaveEditedProse}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    💾 Save
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleAccept}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isAccepted}
                  >
                    ✓ Accept
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    🔄 Regenerate
                  </Button>
                  <Button
                    onClick={handleEdit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    ✏️ Edit
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
