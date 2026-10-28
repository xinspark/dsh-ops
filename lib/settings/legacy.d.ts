import type { Context } from '../adapter/dsh/types.js';
/** Whether this package ships the merged single-row bundle. */
export declare function mergedBundle(): boolean;
/** Mark the window in which the merged row mounts its own features. */
export declare function beginMergedRow(): void;
/** Close that window. */
export declare function endMergedRow(): void;
/**
 * Refuse a retired legacy row, once per activation.
 * @param ctx - the legacy row's context.
 * @param name - the component the saved row names.
 * @returns true when this row must stay inert.
 */
export declare function retired(ctx: Context | null | undefined, name: string): boolean;
