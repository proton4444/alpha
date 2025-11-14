/* prettier-ignore */
/**
 * Generated `api` object type. You can import this type from the
 * convex/_generated/api.js file.
 */
import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as schema from "../schema";

/**
 * A utility for referencing Convex functions in your app.
 */
declare const fullApi: ApiFromModules<{}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
