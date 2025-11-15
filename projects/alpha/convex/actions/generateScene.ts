/**
 * Scene Generation Action - Full AI Integration (Story 4.2, 4.3)
 *
 * This file implements the complete AI generation pipeline:
 * 1. Load scene and characters (Story 3.3)
 * 2. Call Character Agent for TOON output (Story 4.2)
 * 3. Call Scene Writer Agent for prose generation (Story 4.3)
 *
 * The Character Agent analyzes characters and scene to provide character-specific
 * guidance in TOON format, which the Scene Writer uses to generate consistent prose.
 */

"use node";

import { internalAction } from "../_generated/server";
import { api } from "../_generated/api";
import { v } from "convex/values";
import { generateToonResponse, generateTextResponse } from "./openrouter";

/**
 * Character Agent - Analyze scene and characters, return TOON guidance
 * Story 4.2: Implements Character Agent integration
 *
 * @param sceneOutline - The outline of the scene to generate
 * @param characters - Array of character data (name, traits, backstory)
 * @returns Parsed TOON object with character guidance
 */
async function callCharacterAgent(
  sceneOutline: string,
  characters: Array<{ name: string; traits: string; backstory?: string }>
): Promise<Record<string, string>> {
  // Construct system prompt explaining TOON format and Character Agent role
  const systemPrompt = `You are a Character Agent. Analyze the scene and characters, then return your analysis in TOON format.

TOON Format Rules:
- Each line contains a key:value pair
- Multiple values for a key are separated by pipes: key:value1|value2|value3
- Whitespace is trimmed from keys and values
- Lines without colons are ignored

Required fields:
- emotional: Character emotional states (e.g., anxious|hopeful|determined)
- pov: Point of view perspective (e.g., first-limited, third-omniscient)
- voice: Narrative voice characteristics (e.g., short-sentences, descriptive, introspective)
- physical: Physical reactions and body language (e.g., trembling-hands, steady-gaze)

Example TOON output:
emotional:anxious|hopeful
pov:first-limited
voice:short-sentences|introspective
physical:trembling-hands|quick-glances

Return ONLY the TOON format output, no additional text.`;

  // Format character data for the prompt
  let characterContext = "";
  if (characters.length > 0) {
    characterContext = "\n\nCharacters in this story:\n";
    characters.forEach((char) => {
      characterContext += `\nName: ${char.name}\n`;
      characterContext += `Traits: ${char.traits}\n`;
      if (char.backstory) {
        characterContext += `Backstory: ${char.backstory}\n`;
      }
    });
  } else {
    characterContext = "\n\nNo characters have been defined for this story yet.";
  }

  // Construct user prompt with scene outline and character data
  const userPrompt = `Scene Outline:\n${sceneOutline}${characterContext}

Analyze this scene and the characters involved. Return character perspective and voice guidance in TOON format with the required fields: emotional, pov, voice, physical.`;

  console.log(`[callCharacterAgent] Calling Character Agent with ${characters.length} characters`);

  // Call OpenRouter with Claude 3.5 Sonnet
  const toonResponse = await generateToonResponse(
    userPrompt,
    systemPrompt,
    "anthropic/claude-3.5-sonnet"
  );

  console.log(`[callCharacterAgent] Received TOON response:`, toonResponse);

  return toonResponse;
}

/**
 * Scene Writer Agent - Generate narrative prose using character guidance
 * Story 4.3: Implements Scene Writer Agent integration
 *
 * @param sceneOutline - The outline of the scene to generate
 * @param toonGuidance - Parsed TOON guidance from Character Agent
 * @returns Generated narrative prose (300-500 words)
 */
async function callSceneWriterAgent(
  sceneOutline: string,
  toonGuidance: Record<string, string>
): Promise<string> {
  // Construct system prompt for Scene Writer Agent
  const systemPrompt = `You are a Scene Writer Agent. Generate narrative prose (300-500 words).

Your task is to write compelling narrative prose based on the scene outline and character guidance provided. The prose should be vivid, engaging, and appropriate for the scene's emotional tone and perspective.

Word count requirement: 300-500 words

Return ONLY the narrative prose, no meta-commentary or explanations.`;

  // Format character guidance for inclusion in the prompt
  const guidanceText = Object.entries(toonGuidance)
    .map(([key, value]) => `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join("\n");

  // Construct user prompt with scene outline and character guidance
  const userPrompt = `Scene Outline:
${sceneOutline}

Character Guidance:
${guidanceText}

Generate narrative prose (300-500 words) for this scene. Use the character guidance to inform:
- The emotional atmosphere and character feelings (emotional)
- The narrative perspective and whose thoughts we follow (pov)
- The writing style and sentence structure (voice)
- Physical descriptions of character reactions and body language (physical)

Write vivid, engaging prose that brings this scene to life.`;

  console.log(`[callSceneWriterAgent] Calling Scene Writer Agent`);
  console.log(`[callSceneWriterAgent] TOON guidance:`, toonGuidance);

  // Call OpenRouter with Claude 3.5 Sonnet
  // Using higher max_tokens for prose generation (300-500 words ≈ 400-700 tokens)
  const prose = await generateTextResponse(
    userPrompt,
    systemPrompt,
    "anthropic/claude-3.5-sonnet",
    1000 // Max tokens for 300-500 word response
  );

  console.log(`[callSceneWriterAgent] ✅ Scene Writer Agent generated ${prose.split(/\s+/).length} words`);

  return prose;
}

/**
 * Generate scene prose using AI agents
 *
 * This action implements the complete AI generation pipeline:
 * 1. Load the scene to be generated (Story 3.3)
 * 2. Load ALL characters for the story (Story 3.3 - implicit availability)
 * 3. Call Character Agent for TOON guidance (Story 4.2)
 * 4. Call Scene Writer Agent for prose generation (Story 4.3)
 *
 * Story 3.3 Acceptance Criteria Met:
 * - ✅ Loads all characters for story using getCharactersByStory
 * - ✅ All character data (name, traits, backstory) available to agents
 * - ✅ No explicit character selection required
 * - ✅ Character-specific guidance can be generated
 *
 * Story 4.2 Acceptance Criteria Met:
 * - ✅ Character Agent accepts scene outline and characters
 * - ✅ Constructs prompt with TOON format rules
 * - ✅ Specifies required fields: emotional, pov, voice, physical
 * - ✅ Calls OpenRouter with anthropic/claude-3.5-sonnet
 * - ✅ Returns parsed TOON object
 *
 * Story 4.3 Acceptance Criteria Met:
 * - ✅ Scene Writer accepts scene outline and TOON guidance
 * - ✅ Parses/formats TOON output for prompt inclusion
 * - ✅ Constructs prompt with 300-500 word requirement
 * - ✅ Includes character guidance (emotional, pov, voice, physical)
 * - ✅ Calls OpenRouter with anthropic/claude-3.5-sonnet
 * - ✅ Returns generated prose as plain text
 *
 * @param sceneId - The scene to generate prose for
 */
export const generateScene = internalAction({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args): Promise<any> => {
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

      // Step 3: Call Character Agent for TOON guidance (Story 4.2)
      console.log(`[generateScene] Step 3: Calling Character Agent for TOON guidance...`);
      const toonGuidance = await callCharacterAgent(scene.outline, characters);
      console.log(`[generateScene] ✅ Character Agent returned TOON guidance:`, toonGuidance);

      // Step 4: Call Scene Writer Agent (Story 4.3)
      console.log(`[generateScene] Step 4: Calling Scene Writer Agent for prose generation...`);
      const prose = await callSceneWriterAgent(scene.outline, toonGuidance);
      console.log(`[generateScene] ✅ Scene Writer Agent generated prose (${prose.split(/\s+/).length} words)`);

      await ctx.runMutation(api.scenes.updateScene, {
        sceneId: args.sceneId,
        prose: prose,
      });

      // Update status to complete
      await ctx.runMutation(api.scenes.updateSceneStatus, {
        sceneId: args.sceneId,
        status: "complete",
      });

      console.log(`[generateScene] ✅ Scene generation complete (Stories 4.2 & 4.3: Full AI pipeline working)`);

      return {
        success: true,
        sceneId: args.sceneId,
        charactersLoaded: characters.length,
        toonGuidance,
        proseWordCount: prose.split(/\s+/).length,
        message: "Stories 4.2 & 4.3: Complete AI generation pipeline successful. Character Agent + Scene Writer working.",
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
