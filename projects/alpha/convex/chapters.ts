import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all chapters for a story, ordered by chapter number
 * Chapter Management Operation: READ
 */
export const getChaptersByStory = query({
  args: {
    storyId: v.id("stories"),
  },
  handler: async (ctx, args) => {
    // Use by_story index for efficient lookup
    const chapters = await ctx.db
      .query("chapters")
      .withIndex("by_story", (q) => q.eq("storyId", args.storyId))
      .order("asc")
      .collect();

    return chapters;
  },
});

/**
 * Update a chapter's title
 * Chapter Management Operation: UPDATE
 */
export const updateChapter = mutation({
  args: {
    chapterId: v.id("chapters"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate title length (1-200 characters)
    if (args.title.length < 1 || args.title.length > 200) {
      throw new Error("Chapter title must be between 1 and 200 characters");
    }

    // Update the chapter title
    await ctx.db.patch(args.chapterId, {
      title: args.title,
    });

    return args.chapterId;
  },
});
