"use node";

import { v } from 'convex/values'
import { action } from '../_generated/server'
import { parseToon } from '../lib/parseToon'

/**
 * OpenRouter API helper for calling Claude 3.5 Sonnet
 * Uses exponential backoff for resilience against rate limiting
 */

interface OpenRouterRequest {
  model: string
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  temperature?: number
  max_tokens?: number
}

interface OpenRouterResponse {
  id: string
  choices: Array<{
    message: {
      content: string
      role: string
    }
    finish_reason: string
    index: number
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
  }
}

/**
 * Helper function to call OpenRouter API with exponential backoff
 */
async function callOpenRouterWithRetry(
  request: OpenRouterRequest,
  maxRetries: number = 3
): Promise<OpenRouterResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY environment variable not set in Convex settings'
    )
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://narrative-canvas.local',
            'X-Title': 'Narrative Canvas Platform',
          },
          body: JSON.stringify(request),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()

        // Handle rate limiting with exponential backoff
        if (response.status === 429 && attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000 // 1s, 2s, 4s
          console.warn(
            `Rate limited. Waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries - 1}`
          )
          await new Promise((resolve) => setTimeout(resolve, waitTime))
          continue
        }

        throw new Error(
          `OpenRouter API error (${response.status}): ${JSON.stringify(errorData)}`
        )
      }

      return (await response.json()) as OpenRouterResponse
    } catch (error) {
      lastError = error as Error
      console.error(`Attempt ${attempt + 1} failed: ${lastError.message}`)

      // Don't retry on auth errors
      if (lastError.message.includes('401') || lastError.message.includes('Unauthorized')) {
        throw lastError
      }

      // Exponential backoff for network errors
      if (attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * 1000
        console.warn(
          `Network error. Waiting ${waitTime}ms before retry ${attempt + 1}/${maxRetries - 1}`
        )
        await new Promise((resolve) => setTimeout(resolve, waitTime))
      }
    }
  }

  throw new Error(
    `Failed to call OpenRouter API after ${maxRetries} attempts: ${lastError?.message}`
  )
}

/**
 * Convex Action to generate text using OpenRouter Claude
 * Server-side only - API key never exposed to frontend
 */
export const generateWithClaude = action({
  args: {
    prompt: v.string(),
    systemPrompt: v.optional(v.string()),
    temperature: v.optional(v.number()),
    maxTokens: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const messages = []

    // Add system prompt if provided
    if (args.systemPrompt) {
      messages.push({
        role: 'system' as const,
        content: args.systemPrompt,
      })
    }

    // Add user prompt
    messages.push({
      role: 'user' as const,
      content: args.prompt,
    })

    const request: OpenRouterRequest = {
      model: 'anthropic/claude-3.5-sonnet',
      messages,
      temperature: args.temperature ?? 1,
      max_tokens: args.maxTokens ?? 2048,
    }

    try {
      const response = await callOpenRouterWithRetry(request)

      // Extract the generated text
      const generatedText = response.choices[0]?.message?.content

      if (!generatedText) {
        throw new Error('No content in OpenRouter response')
      }

      return {
        success: true,
        text: generatedText,
        usage: response.usage,
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.error('OpenRouter error:', errorMessage)

      return {
        success: false,
        error: errorMessage,
      }
    }
  },
})

/**
 * Convex Action for testing OpenRouter integration
 * Returns API status and token usage
 */
export const testOpenRouterConnection = action({
  args: {},
  handler: async (ctx) => {
    try {
      const response = await callOpenRouterWithRetry({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: 'Say "OpenRouter integration successful" in one sentence.',
          },
        ],
        max_tokens: 50,
      })

      return {
        success: true,
        message: response.choices[0]?.message?.content || 'No response',
        tokensUsed: response.usage.prompt_tokens + response.usage.completion_tokens,
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'

      return {
        success: false,
        error: errorMessage,
      }
    }
  },
})

/**
 * Helper function to call OpenRouter and parse TOON format response
 * Used by Character Agent integration (Story 4.2)
 *
 * @param prompt - The prompt to send to the model
 * @param systemPrompt - Optional system prompt for guiding response format
 * @returns Parsed TOON object mapping keys to values
 */
export async function generateToonResponse(
  prompt: string,
  systemPrompt?: string
): Promise<Record<string, string>> {
  const messages = []

  if (systemPrompt) {
    messages.push({
      role: 'system' as const,
      content: systemPrompt,
    })
  }

  messages.push({
    role: 'user' as const,
    content: prompt,
  })

  const request: OpenRouterRequest = {
    model: 'anthropic/claude-3.5-sonnet',
    messages,
    temperature: 1,
    max_tokens: 500, // TOON responses are compact
  }

  const response = await callOpenRouterWithRetry(request)
  const toonText = response.choices[0]?.message?.content

  if (!toonText) {
    throw new Error('No TOON response from OpenRouter')
  }

  // Parse the TOON format response into a typed object
  return parseToon(toonText)
}
