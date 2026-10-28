/**
 * Cross-row state for the mode switches.
 *
 * Mode rows, the Compatibility switch, and the discovery row are independent
 * Loader rows; they share one small registry keyed by the Cordis root so each
 * row can see which modes are on without importing another row's module state.
 */
import type { Context } from '../adapter/dsh/types.js';
import type { ModeConfig } from './config.js';
import type { ModeId } from './types.js';
declare module '@deepseek-ai/cordis' {
    interface Events {
        /** One mode row or the Compatibility switch changed its enabled state or config. */
        'dsh-ops/modes'(): void;
    }
}
/**
 * Register one enabled mode row.
 * @param ctx - the row's context.
 * @param id - the mode the row enables.
 * @param config - the row's resolved configuration.
 * @returns the disposer that unregisters the mode.
 */
export declare function joinMode(ctx: Context, id: ModeId, config: ModeConfig): () => void;
/**
 * Record the Compatibility switch.
 * @param ctx - the switch row's context.
 * @param enabled - whether official tools stay visible.
 * @returns the disposer that clears the switch.
 */
export declare function joinCompatibility(ctx: Context, enabled: boolean): () => void;
/**
 * The enabled modes and their configuration.
 * @param ctx - any context on the root.
 * @returns a snapshot keyed by mode id.
 */
export declare function enabledModes(ctx: Context): ReadonlyMap<ModeId, ModeConfig>;
/**
 * Whether the Compatibility switch is on.
 * @param ctx - any context on the root.
 * @returns true when official tools must stay exposed.
 */
export declare function compatibilityOn(ctx: Context): boolean;
/**
 * Observe every mode/compatibility change.
 * @param ctx - the row's context; the listener is disposed with it.
 * @param listener - the callback to run after a change.
 * @returns the unsubscribe function.
 */
export declare function onModesChange(ctx: Context, listener: () => void): () => void;
