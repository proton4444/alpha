/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_generateScene from "../actions/generateScene.js";
import type * as actions_openrouter from "../actions/openrouter.js";
import type * as chapters from "../chapters.js";
import type * as characters from "../characters.js";
import type * as example from "../example.js";
import type * as lib_parseToon from "../lib/parseToon.js";
import type * as scenes from "../scenes.js";
import type * as stories from "../stories.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/generateScene": typeof actions_generateScene;
  "actions/openrouter": typeof actions_openrouter;
  chapters: typeof chapters;
  characters: typeof characters;
  example: typeof example;
  "lib/parseToon": typeof lib_parseToon;
  scenes: typeof scenes;
  stories: typeof stories;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
