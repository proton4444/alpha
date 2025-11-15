/**
 * Scene Generation Action - Placeholder for Story 3.3
 *
 * This file demonstrates the character integration pattern for scene generation.
 * Full AI generation implementation will be completed in Story 4.2 and 4.3.
 *
 * Story 3.3 Goal: Ensure all characters for a story are loaded and available
 * during scene generation without requiring explicit selection.
 */

import { internalAction } from "../_generated/server";
import { api } from "../_generated/api";
import { v } from "convex/values";

/**
 * Generate scene prose using AI agents
 *
 * This action demonstrates the character integration pattern:
 * 1. Load the scene to be generated
 * 2. Load ALL characters for the story (implicit character availability)
 * 3. Pass character data to AI agents for consistent character voice
 *
 * Story 3.3 Acceptance Criteria Met:
 * - ✅ Loads all characters for story using getCharactersByStory
 * - ✅ All character data (name, traits, backstory) available to agents
 * - ✅ No explicit character selection required
 * - ✅ Character-specific guidance can be generated
 *
 * @param sceneId - The scene to generate prose for
 */
export const generateScene = internalAction({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    console.log(`[generateScene] Starting generation for scene: ${args.sceneId}`);

    try {
      // Step 1: Load the scene
      const scene = await ctx.runQuery(api.scenes.getScene, {
        sceneId: args.sceneId,
      });

      if (!scene) {
        throw new Error(`Scene ${args.sceneId} not found`);
      }

      console.log(`[generateScene] Loaded scene: ${scene.sceneNumber}, outline length: ${scene.outline.length}`);

      // Step 2: Load ALL characters for the story (Story 3.3 - Implicit character availability)
      // This ensures all characters are available to the AI agents without manual selection
      const characters = await ctx.runQuery(api.characters.getCharactersByStory, {
        storyId: scene.storyId,
      });

      console.log(`[generateScene] Loaded ${characters.length} characters for story ${scene.storyId}`);

      // Log character data to demonstrate it's available for AI agents
      if (characters.length > 0) {
        console.log(`[generateScene] Character data available:`);
        characters.forEach((char) => {
          console.log(`  - ${char.name}: ${char.traits.substring(0, 50)}...`);
          if (char.backstory) {
            console.log(`    Backstory: ${char.backstory.substring(0, 50)}...`);
          }
        });
      } else {
        console.log(`[generateScene] Note: No characters defined for this story yet`);
      }

      // Step 3: Format character data for AI agents
      const characterContext = formatCharactersForGeneration(characters);
      console.log(`[generateScene] Formatted character context (${characterContext.length} chars)`);

      // Step 4: Placeholder for AI generation (Story 4.2 and 4.3)
      // In the full implementation:
      // 1. Call Character Agent with scene.outline + characterContext
      // 2. Character Agent returns character perspective/voice guidance
      // 3. Call Scene Writer Agent with outline + character guidance
      // 4. Scene Writer generates prose with consistent character voice

      console.log(`[generateScene] AI generation placeholder - Stories 4.2 and 4.3 will implement:`);
      console.log(`  1. Character Agent: Analyze scene + characters → voice guidance`);
      console.log(`  2. Scene Writer Agent: Generate prose with character consistency`);

      // For now, update scene with placeholder prose
      const placeholderProse = generatePlaceholderProse(scene, characters);

      await ctx.runMutation(api.scenes.updateScene, {
        sceneId: args.sceneId,
        prose: placeholderProse,
      });

      // Update status to complete
      await ctx.runMutation(api.scenes.updateSceneStatus, {
        sceneId: args.sceneId,
        status: "complete",
      });

      console.log(`[generateScene] ✅ Scene generation complete (placeholder mode)`);

      return {
        success: true,
        sceneId: args.sceneId,
        charactersLoaded: characters.length,
        message: "Story 3.3: Character integration pattern demonstrated successfully",
      };
    } catch (error) {
      console.error(`[generateScene] ❌ Error:`, error);

      // Update scene status to error
      await ctx.runMutation(api.scenes.updateSceneStatus, {
        sceneId: args.sceneId,
        status: "error",
        errorMessage: String(error),
      });

      throw error;
    }
  },
});

/**
 * Helper: Format character data for AI agent consumption
 *
 * Converts character database records into structured text format
 * suitable for inclusion in AI prompts.
 *
 * Story 3.3: This ensures character data is properly formatted
 * and ready to be passed to Character Agent and Scene Writer Agent.
 */
function formatCharactersForGeneration(
  characters: Array<{
    name: string;
    traits: string;
    backstory?: string;
  }>
): string {
  if (characters.length === 0) {
    return "No characters defined for this story.";
  }

  const characterSections = characters.map((char) => {
    let section = `Character: ${char.name}\n`;
    section += `Traits: ${char.traits}\n`;
    if (char.backstory) {
      section += `Backstory: ${char.backstory}\n`;
    }
    return section;
  });

  return characterSections.join("\n");
}

/**
 * Temporary: Generate placeholder prose for testing
 *
 * This will be replaced by actual AI generation in Stories 4.2 and 4.3.
 * For Story 3.3, this demonstrates that character data is successfully
 * loaded and available for use.
 */
function generatePlaceholderProse(
  scene: { outline: string; sceneNumber: number },
  characters: Array<{ name: string }>
): string {
  const characterNames = characters.map((c) => c.name).join(", ");

  return `[Story 3.3 Placeholder Prose]

Scene ${scene.sceneNumber} - ${scene.outline}

${characters.length > 0
  ? `This scene features the following characters: ${characterNames}

In the full implementation (Stories 4.2 and 4.3), the AI agents will generate narrative prose here with:
- Consistent character voices based on their traits and backstory
- Character-specific emotional reactions and perspectives
- Dialogue and actions that match each character's personality

Character data has been successfully loaded and is ready for AI generation.`
  : `No characters have been created for this story yet.

In the full implementation (Stories 4.2 and 4.3), character data will be used to generate prose with consistent character voices.`}

[End Placeholder - Awaiting Stories 4.2 and 4.3]`;
}
