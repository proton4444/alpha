/**
 * Canvas Layout Constants
 * Centralized configuration for canvas node positioning and spacing
 */

// Layout Configuration
export const LAYOUT = {
  CHAPTER: {
    SPACING_X: 260,
    SPACING_Y: 400,
    COLUMNS: 4, // Number of chapters per row
    SCENE_OFFSET_Y: 150, // Vertical offset for scenes below chapter
  },
  SCENE: {
    WIDTH: 160,
    SPACING: 20, // Horizontal spacing between scenes
  },
} as const

// React Flow Configuration
export const CANVAS_CONFIG = {
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 2,
  DEFAULT_ZOOM: 0.8,
  BACKGROUND_GAP: 16,
} as const

// Status-based styling
export const STATUS_COLORS = {
  draft: {
    light: {
      bg: 'bg-slate-200',
      border: 'border-slate-400',
      text: 'text-slate-900',
    },
    dark: {
      bg: 'dark:bg-slate-700',
      border: 'dark:border-slate-500',
      text: 'dark:text-slate-100',
    },
  },
  generating: {
    light: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-900',
    },
    dark: {
      bg: 'dark:bg-blue-900',
      border: 'dark:border-blue-400',
      text: 'dark:text-blue-100',
    },
  },
  complete: {
    light: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-900',
    },
    dark: {
      bg: 'dark:bg-green-900',
      border: 'dark:border-green-400',
      text: 'dark:text-green-100',
    },
  },
  error: {
    light: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-900',
    },
    dark: {
      bg: 'dark:bg-red-900',
      border: 'dark:border-red-400',
      text: 'dark:text-red-100',
    },
  },
} as const

// Status icons
export const STATUS_ICONS = {
  draft: '📝',
  generating: '⏳',
  complete: '✓',
  error: '⚠️',
} as const

// Edge styling
export const EDGE_STYLES = {
  complete: {
    stroke: '#10B981',
    strokeWidth: 2,
  },
  default: {
    stroke: '#94A3B8',
    strokeWidth: 2,
  },
} as const

// Mini map colors
export const MINIMAP_COLORS = {
  chapter: '#C026D3',
  scene: {
    complete: '#10B981',
    generating: '#3B82F6',
    error: '#EF4444',
    draft: '#94A3B8',
  },
} as const

// Character badge colors (for scene nodes)
export const CHARACTER_COLORS = [
  'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
  'bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200',
  'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
  'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200',
] as const
