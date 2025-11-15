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
 *
 * This mutation implements the non-blocking pattern:
 * 1. Updates scene outline
 * 2. Sets status to "generating"
 * 3. Schedules generateScene action asynchronously
 * 4. Returns immediately (UI doesn't freeze)
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

    // Update the scene with the new outline and set status to generating
    await ctx.db.patch(args.sceneId, {
      outline: args.outline,
      status: "generating",
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
