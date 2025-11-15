import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

/**
 * Create a new scene in a chapter
 * Auto-increments sceneNumber within the chapter
 * Scene CRUD Operation: CREATE
 */
export const createScene = mutation({
  args: {
    storyId: v.id("stories"),
    chapterId: v.id("chapters"),
    outline: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate outline length (1-2000 characters)
    if (args.outline.length < 1 || args.outline.length > 2000) {
      throw new Error("Scene outline must be between 1 and 2000 characters");
    }

    // Get existing scenes in this chapter to auto-increment sceneNumber
    const existingScenes = await ctx.db
      .query("scenes")
      .withIndex("by_chapter", (q) => q.eq("chapterId", args.chapterId))
      .collect();

    // Calculate next scene number
    const sceneNumber = existingScenes.length + 1;

    // Create the scene with initial status "draft"
    const sceneId = await ctx.db.insert("scenes", {
      storyId: args.storyId,
      chapterId: args.chapterId,
      sceneNumber,
      outline: args.outline,
      status: "draft",
      regenerationCount: 0,
    });

    return sceneId;
  },
});

/**
 * Get all scenes for a chapter, ordered by scene number
 * Scene CRUD Operation: READ (multiple)
 */
export const getScenesByChapter = query({
  args: {
    chapterId: v.id("chapters"),
  },
  handler: async (ctx, args) => {
    // Use by_chapter index for efficient lookup
    const scenes = await ctx.db
      .query("scenes")
      .withIndex("by_chapter", (q) => q.eq("chapterId", args.chapterId))
      .order("asc")
      .collect();

    return scenes;
  },
});

/**
 * Get a single scene by ID
 * Scene CRUD Operation: READ (single)
 */
export const getScene = query({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sceneId);
  },
});

/**
 * Update a scene's outline and/or prose
 * Scene CRUD Operation: UPDATE
 */
export const updateScene = mutation({
  args: {
    sceneId: v.id("scenes"),
    outline: v.optional(v.string()),
    prose: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate outline length if provided (1-2000 characters)
    if (args.outline !== undefined) {
      if (args.outline.length < 1 || args.outline.length > 2000) {
        throw new Error("Scene outline must be between 1 and 2000 characters");
      }
    }

    // Build update object with only provided fields
    const updates: {
      outline?: string;
      prose?: string;
    } = {};

    if (args.outline !== undefined) {
      updates.outline = args.outline;
    }

    if (args.prose !== undefined) {
      updates.prose = args.prose;
    }

    // Update the scene
    await ctx.db.patch(args.sceneId, updates);

    return args.sceneId;
  },
});

/**
 * Delete a scene
 * Scene CRUD Operation: DELETE
 */
export const deleteScene = mutation({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sceneId);
    return args.sceneId;
  },
});

/**
 * Update scene status and optional error message
 * Used by the generateScene action to update generation progress
 * Story 3.3: Enables scene generation tracking
 */
export const updateSceneStatus = mutation({
  args: {
    sceneId: v.id("scenes"),
    status: v.union(
      v.literal("draft"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("error")
    ),
    errorMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: {
      status: "draft" | "generating" | "complete" | "error";
      errorMessage?: string;
    } = {
      status: args.status,
    };

    if (args.errorMessage !== undefined) {
      updates.errorMessage = args.errorMessage;
    }

    await ctx.db.patch(args.sceneId, updates);
    return args.sceneId;
  },
});

/**
 * Request scene generation with non-blocking scheduler pattern
 * Story 4.1: Production-ready mutation for scene prose generation
 * Story 4.6: Enhanced to increment regenerationCount on each request
 *
 * This mutation implements the non-blocking pattern:
 * 1. Updates scene outline
 * 2. Sets status to "generating"
 * 3. Increments regenerationCount (Story 4.6)
 * 4. Schedules generateScene action asynchronously
 * 5. Returns immediately (UI doesn't freeze)
 *
 * The UI can continue to operate while the action runs in the background.
 * Status updates happen via Convex's reactive queries.
 */
export const requestSceneGeneration = mutation({
  args: {
    sceneId: v.id("scenes"),
    outline: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate outline length (1-2000 characters)
    if (args.outline.length < 1 || args.outline.length > 2000) {
      throw new Error("Scene outline must be between 1 and 2000 characters");
    }

    // Get current scene to check regenerationCount
    const currentScene = await ctx.db.get(args.sceneId);
    if (!currentScene) {
      throw new Error("Scene not found");
    }

    // Determine if this is a regeneration (scene already has prose)
    const isRegeneration = currentScene.prose !== undefined && currentScene.prose !== null;
    const newRegenerationCount = isRegeneration
      ? currentScene.regenerationCount + 1
      : currentScene.regenerationCount;

    // Update the scene with the new outline, set status to generating, and increment regenerationCount if needed
    await ctx.db.patch(args.sceneId, {
      outline: args.outline,
      status: "generating",
      regenerationCount: newRegenerationCount,
    });

    // Schedule the generateScene action to run immediately (non-blocking)
    // The action will run asynchronously and update the scene when complete
    await ctx.scheduler.runAfter(0, internal.actions.generateScene.generateScene, {
      sceneId: args.sceneId,
    });

    // Return immediately - UI doesn't wait for AI response
    return { success: true };
  },
});

/**
 * Test scene generation with character integration
 * Story 3.3: Demonstrates character loading during scene generation
 *
 * This is a test mutation that triggers the generateScene action.
 * Use requestSceneGeneration for production code (Story 4.1).
 */
export const testGenerateScene = mutation({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    // Set status to generating
    await ctx.db.patch(args.sceneId, { status: "generating" });

    // Schedule the generateScene action to run immediately
    await ctx.scheduler.runAfter(0, internal.actions.generateScene.generateScene, {
      sceneId: args.sceneId,
    });

    return { success: true, message: "Scene generation started (Story 3.3 test)" };
  },
});

/**
 * Reorder scenes within a chapter
 * Story 6.4: Drag-drop scene reordering
 *
 * Moves a scene to a new position within its chapter and renumbers all scenes.
 */
export const reorderScenesInChapter = mutation({
  args: {
    chapterId: v.id("chapters"),
    sceneId: v.id("scenes"),
    newPosition: v.number(), // 1-indexed position
  },
  handler: async (ctx, args) => {
    // Get all scenes in this chapter, sorted by current scene number
    const scenes = await ctx.db
      .query("scenes")
      .withIndex("by_chapter", (q) => q.eq("chapterId", args.chapterId))
      .order("asc")
      .collect();

    // Sort by sceneNumber to ensure correct order
    scenes.sort((a, b) => a.sceneNumber - b.sceneNumber);

    // Find the scene being moved
    const sceneIndex = scenes.findIndex(s => s._id === args.sceneId);
    if (sceneIndex === -1) {
      throw new Error("Scene not found in chapter");
    }

    // Validate new position
    if (args.newPosition < 1 || args.newPosition > scenes.length) {
      throw new Error(`Invalid position: must be between 1 and ${scenes.length}`);
    }

    // If position hasn't changed, no-op
    if (sceneIndex + 1 === args.newPosition) {
      return { success: true, message: "Scene already at target position" };
    }

    // Remove scene from current position
    const [movedScene] = scenes.splice(sceneIndex, 1);

    // Insert at new position (converting from 1-indexed to 0-indexed)
    scenes.splice(args.newPosition - 1, 0, movedScene);

    // Update sceneNumber for all scenes in the chapter
    for (let i = 0; i < scenes.length; i++) {
      await ctx.db.patch(scenes[i]._id, {
        sceneNumber: i + 1, // 1-indexed
      });
    }

    return {
      success: true,
      message: `Scene reordered to position ${args.newPosition}`
    };
  },
});
