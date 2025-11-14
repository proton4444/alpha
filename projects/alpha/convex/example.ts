import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createStory = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
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

export const getStories = query({
  handler: async (ctx) => {
    return await ctx.db.query("stories").collect();
  },
});

export const getStory = query({
  args: { storyId: v.id("stories") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.storyId);
  },
});
