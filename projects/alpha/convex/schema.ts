import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    createdAt: v.number(),
  }),

  chapters: defineTable({
    storyId: v.id("stories"),
    chapterNumber: v.number(),
    title: v.string(),
  }).index("by_story", ["storyId"]),

  scenes: defineTable({
    storyId: v.id("stories"),
    chapterId: v.id("chapters"),
    sceneNumber: v.number(),
    outline: v.string(),
    prose: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("error")
    ),
    errorMessage: v.optional(v.string()),
    regenerationCount: v.number(),
  })
    .index("by_story", ["storyId"])
    .index("by_chapter", ["chapterId"]),

  characters: defineTable({
    storyId: v.id("stories"),
    name: v.string(),
    traits: v.string(),
    backstory: v.optional(v.string()),
  }).index("by_story", ["storyId"]),
});
