/** One-shot attribution captured at dispatch entry, before arbitrary event listeners run. */
import type { Context } from './adapter/dsh/types.js';
export declare function toolChangeScopes(): readonly object[] | undefined;
export declare function withToolChange<T>(scopes: readonly object[], action: () => T): T;
/** Every dispatch has its own args array; nested unwrapped mutations receive no attribution. */
export declare function onToolChange(ctx: Context, callback: (scopes?: readonly object[]) => void): void;
