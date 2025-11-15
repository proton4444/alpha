import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

/**
 * DataCleanupTest - Utility to delete all test data
 *
 * WARNING: This deletes ALL stories, chapters, scenes, and characters!
 * Use only for cleaning test data before production.
 */
export function DataCleanupTest() {
  const deleteAllData = useMutation(api.stories.deleteAllData)

  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      '⚠️ WARNING: This will delete ALL data (stories, chapters, scenes, characters).\n\nAre you absolutely sure?'
    )

    if (!confirmed) return

    const doubleCheck = window.confirm(
      '⚠️ FINAL WARNING: This action cannot be undone!\n\nDelete all data?'
    )

    if (!doubleCheck) return

    try {
      const result = await deleteAllData()
      alert(`✅ Data deleted successfully!\n\n` +
            `Stories deleted: ${result.deletedStories}\n` +
            `Characters deleted: ${result.deletedCharacters}`)
    } catch (error) {
      alert(`❌ Error deleting data: ${error}`)
      console.error(error)
    }
  }

  return (
    <div className="border-4 border-red-500 rounded-lg p-6 bg-red-50 dark:bg-red-900/20 space-y-4">
      <h3 className="text-xl font-bold text-red-700 dark:text-red-300">
        ⚠️ Data Cleanup Utility
      </h3>

      <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
        <p className="font-semibold">WARNING: Destructive Operation!</p>
        <p>This will permanently delete:</p>
        <ul className="list-disc list-inside ml-4">
          <li>All stories</li>
          <li>All chapters</li>
          <li>All scenes</li>
          <li>All characters</li>
        </ul>
        <p className="font-semibold mt-4">Use only for:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Cleaning test data</li>
          <li>Starting fresh</li>
          <li>Before production deployment</li>
        </ul>
      </div>

      <button
        onClick={handleDeleteAll}
        className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
      >
        🗑️ Delete All Data
      </button>

      <div className="text-xs text-red-600 dark:text-red-400 italic">
        You will be asked to confirm twice before deletion
      </div>
    </div>
  )
}
