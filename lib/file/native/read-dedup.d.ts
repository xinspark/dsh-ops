import type { Context } from '../../adapter/dsh/types.js';
import type { ToolDefinition } from '../../adapter/dsh/types.js';
/** Scope-owned, bounded evidence. This never caches execution values or skips file authority/IO. */
export declare function createNativeReadDedup(ctx: Context): {
    wrap(tool: ToolDefinition): ToolDefinition;
    dispose(): void;
};
