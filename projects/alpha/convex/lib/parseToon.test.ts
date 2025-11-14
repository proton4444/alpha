/**
 * Tests for TOON Parser
 *
 * Run with: npm test -- parseToon.test.ts
 */

import { parseToon, encodeToon } from "./parseToon";

describe("parseToon", () => {
  describe("basic parsing", () => {
    it("should parse single key:value pair", () => {
      const input = "emotional:anxious";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious" });
    });

    it("should parse multiple key:value pairs", () => {
      const input = "emotional:anxious\npov:first-limited\nvoice:short-sentences";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        pov: "first-limited",
        voice: "short-sentences",
      });
    });

    it("should handle pipe-separated values", () => {
      const input = "emotional:anxious|hopeful";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious|hopeful" });
    });

    it("should handle multiple values with pipes", () => {
      const input = "emotional:anxious|hopeful|determined";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious|hopeful|determined" });
    });
  });

  describe("whitespace handling", () => {
    it("should trim whitespace from keys", () => {
      const input = "  emotional  :anxious";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious" });
    });

    it("should trim whitespace from values", () => {
      const input = "emotional:  anxious  ";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious" });
    });

    it("should trim whitespace from both keys and values", () => {
      const input = "  emotional  :  anxious  ";
      const result = parseToon(input);
      expect(result).toEqual({ emotional: "anxious" });
    });

    it("should handle lines with leading/trailing whitespace", () => {
      const input = "  emotional:anxious\n  pov:first-limited  ";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        pov: "first-limited",
      });
    });
  });

  describe("edge cases", () => {
    it("should skip empty lines", () => {
      const input = "emotional:anxious\n\npov:first-limited";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        pov: "first-limited",
      });
    });

    it("should skip lines without colons", () => {
      const input = "emotional:anxious\nthis is not valid\npov:first-limited";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        pov: "first-limited",
      });
    });

    it("should skip lines with empty keys", () => {
      const input = "emotional:anxious\n:value\npov:first-limited";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        pov: "first-limited",
      });
    });

    it("should skip lines with empty values", () => {
      const input = "emotional:anxious\npov:\nvoice:short-sentences";
      const result = parseToon(input);
      expect(result).toEqual({
        emotional: "anxious",
        voice: "short-sentences",
      });
    });

    it("should return empty object for empty input", () => {
      const result = parseToon("");
      expect(result).toEqual({});
    });

    it("should return empty object for input with no valid lines", () => {
      const input = "\n\nno colons here\nalso invalid";
      const result = parseToon(input);
      expect(result).toEqual({});
    });

    it("should handle multiple colons (only first is separator)", () => {
      const input = "url:https://example.com:8080";
      const result = parseToon(input);
      expect(result).toEqual({ url: "https://example.com:8080" });
    });

    it("should handle special characters in values", () => {
      const input = 'description:A scene with "quotes" and !@#$%';
      const result = parseToon(input);
      expect(result).toEqual({
        description: 'A scene with "quotes" and !@#$%',
      });
    });
  });

  describe("real-world examples", () => {
    it("should parse Character Agent output", () => {
      const toonOutput = `emotional:anxious|hopeful
pov:first-limited
voice:short-sentences
physical:trembling-hands|nervous-energy`;

      const result = parseToon(toonOutput);
      expect(result).toEqual({
        emotional: "anxious|hopeful",
        pov: "first-limited",
        voice: "short-sentences",
        physical: "trembling-hands|nervous-energy",
      });
    });

    it("should parse multi-line Character Agent response with extra whitespace", () => {
      const toonOutput = `emotional: anxious | hopeful
  pov: first-limited
  voice: short-sentences

  physical: trembling-hands | nervous-energy`;

      const result = parseToon(toonOutput);
      expect(result).toEqual({
        emotional: "anxious | hopeful",
        pov: "first-limited",
        voice: "short-sentences",
        physical: "trembling-hands | nervous-energy",
      });
    });
  });
});

describe("encodeToon", () => {
  it("should encode simple object", () => {
    const obj = { emotional: "anxious", pov: "first-limited" };
    const result = encodeToon(obj);
    expect(result).toContain("emotional:anxious");
    expect(result).toContain("pov:first-limited");
  });

  it("should encode object with pipe-separated values", () => {
    const obj = { emotional: "anxious|hopeful" };
    const result = encodeToon(obj);
    expect(result).toBe("emotional:anxious|hopeful");
  });

  it("should be reversible with parseToon", () => {
    const original = { emotional: "anxious|hopeful", pov: "first-limited" };
    const encoded = encodeToon(original);
    const decoded = parseToon(encoded);
    expect(decoded).toEqual(original);
  });

  it("should handle empty object", () => {
    const result = encodeToon({});
    expect(result).toBe("");
  });

  it("should handle single key-value pair", () => {
    const result = encodeToon({ key: "value" });
    expect(result).toBe("key:value");
  });
});

describe("roundtrip encoding/decoding", () => {
  it("should roundtrip complex TOON", () => {
    const original = {
      emotional: "anxious|hopeful|determined",
      pov: "first-limited",
      voice: "short-sentences",
      physical: "trembling-hands",
      setting: "dimly-lit-room",
      tension: "rising",
    };

    const encoded = encodeToon(original);
    const decoded = parseToon(encoded);

    expect(decoded).toEqual(original);
  });
});
