import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new character for a story
 * Character CRUD Operation: CREATE
 */
export const createCharacter = mutation({
  args: {
    storyId: v.id("stories"),
    name: v.string(),
    traits: v.string(),
    backstory: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate name length (1-100 characters)
    if (args.name.length < 1 || args.name.length > 100) {
      throw new Error("Character name must be between 1 and 100 characters");
    }

    // Validate traits length (1-1000 characters)
    if (args.traits.length < 1 || args.traits.length > 1000) {
      throw new Error("Character traits must be between 1 and 1000 characters");
    }

    // Validate backstory length if provided (max 5000 characters)
    if (args.backstory && args.backstory.length > 5000) {
      throw new Error("Character backstory must not exceed 5000 characters");
    }

    // Create the character
    const characterId = await ctx.db.insert("characters", {
      storyId: args.storyId,
      name: args.name,
      traits: args.traits,
      backstory: args.backstory,
    });

    return characterId;
  },
});

/**
 * Get all characters for a story
 * Uses by_story index for fast lookups
 * Returns characters in insertion order (by _creationTime)
 */
export const getCharactersByStory = query({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    const characters = await ctx.db
      .query("characters")
      .withIndex("by_story", (q) => q.eq("storyId", args.storyId))
      .collect();

    // Sort by creation time (insertion order)
    return characters.sort((a, b) => a._creationTime - b._creationTime);
  },
});

/**
 * Get a single character by ID
 * Character CRUD Operation: READ
 */
export const getCharacter = query({
  args: { characterId: v.id("characters") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.characterId);
  },
});

/**
 * Update an existing character
 * Character CRUD Operation: UPDATE
 */
export const updateCharacter = mutation({
  args: {
    characterId: v.id("characters"),
    name: v.optional(v.string()),
    traits: v.optional(v.string()),
    backstory: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate name length if provided
    if (args.name !== undefined && (args.name.length < 1 || args.name.length > 100)) {
      throw new Error("Character name must be between 1 and 100 characters");
    }

    // Validate traits length if provided
    if (args.traits !== undefined && (args.traits.length < 1 || args.traits.length > 1000)) {
      throw new Error("Character traits must be between 1 and 1000 characters");
    }

    // Validate backstory length if provided
    if (args.backstory !== undefined && args.backstory.length > 5000) {
      throw new Error("Character backstory must not exceed 5000 characters");
    }

    // Build update object with only provided fields
    const updates: any = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.traits !== undefined) updates.traits = args.traits;
    if (args.backstory !== undefined) updates.backstory = args.backstory;

    // Update the character
    await ctx.db.patch(args.characterId, updates);

    return args.characterId;
  },
});

/**
 * Delete a character
 * Character CRUD Operation: DELETE
 */
export const deleteCharacter = mutation({
  args: { characterId: v.id("characters") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.characterId);
    return { success: true };
  },
});
