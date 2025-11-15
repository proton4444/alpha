import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAllStories } from '@/hooks/useConvexQueries'
import type { Id } from '../../../convex/_generated/dataModel'

// Custom hook for character queries
import { useQuery } from 'convex/react'

function useCharactersByStory(storyId: Id<"stories"> | string | null) {
  return useQuery(
    api.characters.getCharactersByStory,
    storyId ? { storyId: storyId as Id<"stories"> } : "skip"
  ) ?? []
}

function useCharacter(characterId: Id<"characters"> | string | null) {
  return useQuery(
    api.characters.getCharacter,
    characterId ? { characterId: characterId as Id<"characters"> } : "skip"
  )
}

export function CharacterCRUDTest() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null)

  // Create form state
  const [newCharacterName, setNewCharacterName] = useState('')
  const [newCharacterTraits, setNewCharacterTraits] = useState('')
  const [newCharacterBackstory, setNewCharacterBackstory] = useState('')

  // Update form state
  const [updateName, setUpdateName] = useState('')
  const [updateTraits, setUpdateTraits] = useState('')
  const [updateBackstory, setUpdateBackstory] = useState('')

  // Queries
  const stories = useAllStories()
  const characters = useCharactersByStory(selectedStoryId)
  const selectedCharacter = useCharacter(selectedCharacterId)

  // Mutations
  const createCharacter = useMutation(api.characters.createCharacter)
  const updateCharacter = useMutation(api.characters.updateCharacter)
  const deleteCharacter = useMutation(api.characters.deleteCharacter)

  const handleCreate = async () => {
    if (!selectedStoryId || !newCharacterName.trim() || !newCharacterTraits.trim()) {
      alert('Please select a story and fill in name and traits')
      return
    }

    try {
      const characterId = await createCharacter({
        storyId: selectedStoryId as any,
        name: newCharacterName,
        traits: newCharacterTraits,
        backstory: newCharacterBackstory.trim() || undefined,
      })
      setNewCharacterName('')
      setNewCharacterTraits('')
      setNewCharacterBackstory('')
      setSelectedCharacterId(characterId)
      console.log('Created character:', characterId)
    } catch (error) {
      console.error('Failed to create character:', error)
      alert(String(error))
    }
  }

  const handleUpdate = async () => {
    if (!selectedCharacterId) return

    try {
      await updateCharacter({
        characterId: selectedCharacterId as any,
        name: updateName.trim() || undefined,
        traits: updateTraits.trim() || undefined,
        backstory: updateBackstory.trim() || undefined,
      })
      setUpdateName('')
      setUpdateTraits('')
      setUpdateBackstory('')
      console.log('Updated character')
    } catch (error) {
      console.error('Failed to update character:', error)
      alert(String(error))
    }
  }

  const handleDelete = async (characterId: string) => {
    if (!confirm('Delete this character?')) return

    try {
      await deleteCharacter({ characterId: characterId as any })
      if (selectedCharacterId === characterId) {
        setSelectedCharacterId(null)
      }
      console.log('Deleted character')
    } catch (error) {
      console.error('Failed to delete character:', error)
      alert(String(error))
    }
  }

  return (
    <div className="border dark:border-slate-700 rounded-lg p-6 bg-slate-50 dark:bg-slate-800 space-y-4 mb-6 transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-4 dark:text-slate-100">👤 Character CRUD Test (Story 3.1)</h3>

      {/* Select Story */}
      <div className="space-y-2">
        <label className="text-sm font-medium block dark:text-slate-200">Select a Story:</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {stories.map((story) => (
            <div
              key={story._id}
              className={`p-2 rounded border cursor-pointer transition-colors ${
                selectedStoryId === story._id
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                  : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
              onClick={() => {
                setSelectedStoryId(story._id)
                setSelectedCharacterId(null)
              }}
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

      {/* Create Character */}
      {selectedStoryId && (
        <div className="space-y-2 border-t dark:border-slate-700 pt-4">
          <label className="text-sm font-medium block dark:text-slate-200">Create New Character:</label>
          <Input
            placeholder="Character name (1-100 chars)..."
            value={newCharacterName}
            onChange={(e) => setNewCharacterName(e.target.value)}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Textarea
            placeholder="Character traits (1-1000 chars, e.g., brave, loyal, quick-tempered)..."
            value={newCharacterTraits}
            onChange={(e) => setNewCharacterTraits(e.target.value)}
            rows={3}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Textarea
            placeholder="Character backstory (optional, max 5000 chars)..."
            value={newCharacterBackstory}
            onChange={(e) => setNewCharacterBackstory(e.target.value)}
            rows={3}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Button onClick={handleCreate}>Create Character</Button>
        </div>
      )}

      {/* Character List */}
      {selectedStoryId && characters.length > 0 && (
        <div className="space-y-2 border-t dark:border-slate-700 pt-4">
          <label className="text-sm font-medium block dark:text-slate-200">
            Characters ({characters.length}):
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {characters.map((character) => (
              <div
                key={character._id}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  selectedCharacterId === character._id
                    ? 'bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700'
                    : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600'
                }`}
                onClick={() => setSelectedCharacterId(character._id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium dark:text-slate-100">{character.name}</div>
                    <div className="text-sm text-muted-foreground dark:text-slate-400 mt-1 line-clamp-2">
                      {character.traits}
                    </div>
                    {character.backstory && (
                      <div className="text-xs text-muted-foreground dark:text-slate-500 mt-1 line-clamp-1">
                        Backstory: {character.backstory}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(character._id)
                    }}
                    className="ml-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Update Character */}
      {selectedCharacter && (
        <div className="space-y-2 border-t dark:border-slate-700 pt-4">
          <label className="text-sm font-medium block dark:text-slate-200">
            Update "{selectedCharacter.name}":
          </label>
          <Input
            placeholder="New name (leave empty to keep current)..."
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Textarea
            placeholder="New traits (leave empty to keep current)..."
            value={updateTraits}
            onChange={(e) => setUpdateTraits(e.target.value)}
            rows={2}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Textarea
            placeholder="New backstory (leave empty to keep current)..."
            value={updateBackstory}
            onChange={(e) => setUpdateBackstory(e.target.value)}
            rows={2}
            className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
          />
          <Button onClick={handleUpdate} variant="secondary">
            Update Character
          </Button>
        </div>
      )}

      {/* Success Indicators */}
      <div className="text-xs space-y-1 pt-2 border-t dark:border-slate-700 dark:text-slate-300">
        <p>✅ createCharacter - validates name (1-100 chars) and traits (1-1000 chars)</p>
        <p>✅ getCharactersByStory - uses by_story index, returns in insertion order</p>
        <p>✅ getCharacter - retrieves single character by ID</p>
        <p>✅ updateCharacter - updates name, traits, and/or backstory</p>
        <p>✅ deleteCharacter - removes character from story</p>
      </div>
    </div>
  )
}
