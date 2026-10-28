/**
 * Apply one enhanced-preset mode row.
 *
 * Each row is self-contained: it registers its mode in the shared registry, then
 * publishes only for Agents composed from its preset. The native file surface is
 * registered per Agent, the Windows shell layer and the PTC SDK are gated by the
 * same preset test, and the replacement controller hides only official tools
 * whose OPS counterpart is visible. Compatibility mode is a runtime switch that
 * lifts those hides without unloading any row.
 */
import type { Context } from '../adapter/dsh/types.js';
import { type ModeConfig } from './config.js';
import type { ModeId } from './types.js';
/** Built-in product replacement policy; generic publication does not know preset ids. */
export declare function replacementTargets(mode: ModeId, platform?: string, hidePwsh?: boolean): ReadonlyMap<string, string>;
export declare function applyMode(root: Context, rawConfig: unknown, mode: ModeId): void;
/**
 * Apply a mode from a config that was already resolved and validated.
 * @param root - the fiber mounting the feature.
 * @param config - the resolved mode configuration.
 * @param mode - the preset this feature publishes for.
 */
export declare function applyResolvedMode(root: Context, config: ModeConfig, mode: ModeId): void;
