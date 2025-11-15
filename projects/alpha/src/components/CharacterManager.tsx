import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
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
import type { Id } from '../../convex/_generated/dataModel'

// Custom hook for character queries
import { useQuery } from 'convex/react'

function useCharactersByStory(storyId: Id<"stories"> | null) {
  return useQuery(
    api.characters.getCharactersByStory,
    storyId ? { storyId } : "skip"
  ) ?? []
}

interface CharacterManagerProps {
  storyId: Id<"stories">
}

interface CharacterFormData {
  name: string
  traits: string
  backstory: string
}

export function CharacterManager({ storyId }: CharacterManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCharacterId, setEditingCharacterId] = useState<Id<"characters"> | null>(null)
  const [formData, setFormData] = useState<CharacterFormData>({
    name: '',
    traits: '',
    backstory: '',
  })

  const characters = useCharactersByStory(storyId)
  const createCharacter = useMutation(api.characters.createCharacter)
  const updateCharacter = useMutation(api.characters.updateCharacter)
  const deleteCharacter = useMutation(api.characters.deleteCharacter)

  const resetForm = () => {
    setFormData({ name: '', traits: '', backstory: '' })
    setEditingCharacterId(null)
  }

  const handleOpenDialog = (characterId?: Id<"characters">) => {
    if (characterId) {
      // Edit mode - pre-fill form
      const character = characters.find((c) => c._id === characterId)
      if (character) {
        setFormData({
          name: character.name,
          traits: character.traits,
          backstory: character.backstory || '',
        })
        setEditingCharacterId(characterId)
      }
    } else {
      // Add mode - reset form
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.traits.trim()) {
      alert('Name and traits are required')
      return
    }

    try {
      if (editingCharacterId) {
        // Update existing character
        await updateCharacter({
          characterId: editingCharacterId,
          name: formData.name,
          traits: formData.traits,
          backstory: formData.backstory.trim() || undefined,
        })
      } else {
        // Create new character
        await createCharacter({
          storyId,
          name: formData.name,
          traits: formData.traits,
          backstory: formData.backstory.trim() || undefined,
        })
      }
      handleCloseDialog()
    } catch (error) {
      console.error('Failed to save character:', error)
      alert(String(error))
    }
  }

  const handleDelete = async (characterId: Id<"characters">) => {
    const character = characters.find((c) => c._id === characterId)
    if (!character) return

    if (!confirm(`Delete character "${character.name}"? This cannot be undone.`)) {
      return
    }

    try {
      await deleteCharacter({ characterId })
    } catch (error) {
      console.error('Failed to delete character:', error)
      alert(String(error))
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold dark:text-slate-100">Characters</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>Add Character</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCharacterId ? 'Edit Character' : 'Add Character'}
              </DialogTitle>
              <DialogDescription>
                {editingCharacterId
                  ? 'Update character information below.'
                  : 'Create a new character for your story.'}
              </DialogDescription>
            </DialogHeader>

            {/* Character Form */}
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Character name (1-100 chars)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Traits <span className="text-red-500">*</span>
                </label>
                <Textarea
                  placeholder="Character traits (1-1000 chars, e.g., brave, loyal, quick-tempered)"
                  value={formData.traits}
                  onChange={(e) => setFormData({ ...formData, traits: e.target.value })}
                  rows={4}
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.traits.length}/1000 characters
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Backstory (Optional)</label>
                <Textarea
                  placeholder="Character backstory (max 5000 chars)"
                  value={formData.backstory}
                  onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
                  rows={6}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.backstory.length}/5000 characters
                </p>
              </div>
            </div>

            {/* Dialog Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingCharacterId ? 'Update' : 'Create'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Character List */}
      {characters.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg dark:border-slate-700">
          <p className="text-muted-foreground dark:text-slate-400">
            No characters yet. Create your first character to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {characters.map((character) => (
            <div
              key={character._id}
              className="border rounded-lg p-4 space-y-3 bg-white dark:bg-slate-800 dark:border-slate-700 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold dark:text-slate-100">
                  {character.name}
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(character._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(character._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground dark:text-slate-400 mb-1">
                    Traits:
                  </p>
                  <p className="text-sm dark:text-slate-300">
                    {truncateText(character.traits, 100)}
                  </p>
                </div>

                {character.backstory && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground dark:text-slate-400 mb-1">
                      Backstory:
                    </p>
                    <p className="text-sm dark:text-slate-300">
                      {truncateText(character.backstory, 100)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
