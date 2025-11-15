import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Create a new story with 24 default chapters
 * Story CRUD Operation: CREATE
 */
export const createStory = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate title length (1-200 characters)
    if (args.title.length < 1 || args.title.length > 200) {
      throw new Error("Story title must be between 1 and 200 characters");
    }

    // Create the story
    const storyId = await ctx.db.insert("stories", {
      title: args.title,
      createdAt: Date.now(),
    });

    // Create 24 chapters for the story
    for (let i = 1; i <= 24; i++) {
      await ctx.db.insert("chapters", {
        storyId,
        chapterNumber: i,
        title: `Chapter ${i}`,
      });
    }

    return storyId;
  },
});

/**
 * Get a single story by ID
 * Story CRUD Operation: READ
 */
export const getStory = query({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.storyId);
  },
});

/**
 * Get all stories ordered by creation date (newest first)
 * Useful for story list UI
 */
export const getAllStories = query({
  handler: async (ctx) => {
    const stories = await ctx.db.query("stories").collect();
    // Sort by createdAt descending (newest first)
    return stories.sort((a, b) => b.createdAt - a.createdAt);
  },
});

/**
 * Update a story's title
 * Story CRUD Operation: UPDATE
 */
export const updateStory = mutation({
  args: {
    storyId: v.id("stories"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate title length (1-200 characters)
    if (args.title.length < 1 || args.title.length > 200) {
      throw new Error("Story title must be between 1 and 200 characters");
    }

    // Update the story title
    await ctx.db.patch(args.storyId, {
      title: args.title,
    });

    return args.storyId;
  },
});

/**
 * Delete a story and all its associated chapters and scenes
 * Cascading delete: Story -> Chapters -> Scenes
 * Story CRUD Operation: DELETE
 */
export const deleteStory = mutation({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    // Find all chapters for this story
    const chapters = await ctx.db
      .query("chapters")
      .withIndex("by_story", (q) => q.eq("storyId", args.storyId))
      .collect();

    // Delete all scenes and chapters
    for (const chapter of chapters) {
      // Find all scenes for this chapter
      const scenes = await ctx.db
        .query("scenes")
        .withIndex("by_chapter", (q) => q.eq("chapterId", chapter._id))
        .collect();

      // Delete all scenes
      for (const scene of scenes) {
        await ctx.db.delete(scene._id);
      }

      // Delete the chapter
      await ctx.db.delete(chapter._id);
    }

    // Finally, delete the story
    await ctx.db.delete(args.storyId);

    return args.storyId;
  },
});
