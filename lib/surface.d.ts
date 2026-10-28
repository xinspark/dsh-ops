/** The tool surface a presentation probe reads, shared by both PTC rows. */
import type { Agent } from './adapter/dsh/types.js';
import type { ToolRuntime } from './adapter/dsh/types.js';
/**
 * The surface of one agent, the memo key a presentation probe is cached under.
 *
 * Two things move a `ptcOnly`/`native` verdict, and the key must see both:
 *
 * - **which names are visible.** `run_code` exists only outside `native`, so a mode flip
 *   adds or drops it.
 * - **which definition each name resolves to.** A same-named registration shadows the one
 *   it replaces, and the publish that follows captures the definition inside its shadow's
 *   closure. A names-only key returns a stale hit there and publishes nothing, leaving the
 *   cached verdict standing for a surface it never described.
 *
 * Both are read from ONE `view()` call. `view()` hands back the definitions themselves, so
 * identity costs a `WeakMap` lookup against an object already in hand — measurably cheaper
 * than pairing `schemas()` with a `tools.get()` per name, because that `get()` rebuilds the
 * whole scope view and turns the key into O(names²).
 *
 * The cost is what makes this safe to memoize at all: reading through `schemas()` deep-copies
 * every visible schema — 34.2 ms for 258 tools at the issue's own surface shape on the
 * published runtime — against ~0.05 ms here, identity included. A key that costs more
 * than the assembly it skips turns the memo into a slowdown. `schemas()` survives only as
 * the fallback for a host whose view is not reachable, where correctness outranks the cost.
 * @param tools - the tool registry.
 * @param agent - the scope to read.
 * @returns per-entry `name\u0001identity` joined by NUL, usable as a memo key.
 */
export declare const surfaceOf: (tools: Pick<ToolRuntime, "schemas">, agent: Agent) => string;
/**
 * The tool names a surface names, in view order.
 *
 * Callers that only need the name set (diagnostics, assertions) read it back out of a key
 * rather than paying for a second `view()`.
 * @param surface - a key produced by {@link surfaceOf}.
 * @returns the names, in the order the view reported them.
 */
export declare const surfaceNames: (surface: string) => string[];
/**
 * The visible tool names of one scope, without copying any schema.
 *
 * `schemas()` deep-copies every definition's parameters (34.2 ms for 258 tools at the
 * issue's own surface shape on the official host) just to hand back names; the view
 * reports the same names, in the same order, for ~0.043 ms. Name-only readers (prompt
 * sections, restriction planning) pay the copy for nothing. Cost tracks nested schema
 * nodes rather than payload bytes, so both figures are for the shape the issue measured.
 * `undefined` reads the global layer on both paths, and a host without a reachable view
 * falls back to the projection — correctness outranks the cost.
 * @param tools - the tool registry.
 * @param scope - the scope to read, or `undefined` for the global layer.
 * @returns the visible tool names, in view order.
 */
export declare const visibleNames: (tools: Pick<ToolRuntime, "schemas">, scope?: object) => string[];
