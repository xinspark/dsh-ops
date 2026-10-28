/**
 * Identify the agent preset a live Agent was composed from.
 *
 * The preset id is the only authority for which OPS mode applies: a preset is a
 * scoped plugin composition, and a prompt or tool name is not a preset identity.
 * The value comes from the public preset registry when that service is mounted;
 * hosts without a preset roster fall back to the session projection or the frozen
 * session header. A host with no preset registry at all is a single-composition
 * deployment (headless/SDK), which this plugin treats as the built-in Standard
 * composition so OPS keeps working there.
 */
import type { Context } from '../adapter/dsh/types.js';
import type { Agent } from '../adapter/dsh/types.js';
import { type ModeId } from './types.js';
/**
 * The preset id an Agent is currently composed from.
 * @param ctx - a context on the same Cordis root as the Agent.
 * @param agent - the live Agent.
 * @returns the preset id, or undefined when the host composes no preset for it.
 */
export declare function presetOf(ctx: Context, agent: Agent): string | undefined;
/**
 * The OPS mode that applies to an Agent.
 * @param ctx - a context on the same Cordis root as the Agent.
 * @param agent - the live Agent.
 * @returns the mode, or undefined when no enhanced preset applies.
 */
export declare function modeOf(ctx: Context, agent: Agent): ModeId | undefined;
