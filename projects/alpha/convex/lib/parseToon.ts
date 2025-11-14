/**
 * TOON Parser - Parse Terse Object Notation format
 *
 * TOON is a simple key:value format with 60% token savings over JSON.
 *
 * Format:
 * - Each line contains a key:value pair
 * - Multiple values for a key are separated by pipes: key:value1|value2|value3
 * - Whitespace is trimmed from keys and values
 * - Lines without colons are ignored
 *
 * Example input:
 * ```
 * emotional:anxious|hopeful
 * pov:first-limited
 * voice:short-sentences
 * physical:trembling-hands
 * ```
 *
 * Example output:
 * ```typescript
 * {
 *   emotional: "anxious|hopeful",
 *   pov: "first-limited",
 *   voice: "short-sentences",
 *   physical: "trembling-hands"
 * }
 * ```
 */

export function parseToon(input: string): Record<string, string> {
  const result: Record<string, string> = {};

  // Split input into lines and process each
  input.split("\n").forEach((line) => {
    // Skip empty lines and lines without colons
    if (!line.includes(":")) return;

    // Split on first colon only
    const colonIndex = line.indexOf(":");
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    // Skip if key or value is empty
    if (key && value) {
      result[key] = value;
    }
  });

  return result;
}

/**
 * Encode object back to TOON format
 * Useful for testing and debugging
 *
 * Example:
 * ```typescript
 * encodeToon({ emotional: "anxious|hopeful", pov: "first-limited" })
 * // Returns: "emotional:anxious|hopeful\npov:first-limited"
 * ```
 */
export function encodeToon(obj: Record<string, string>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${key}:${value}`)
    .join("\n");
}
