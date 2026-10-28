/** Exact visible OPS registrations supply Native projections; no shared registry mutation. */
import type { ToolDefinition } from '../adapter/dsh/types.js';
interface Host {
    root?: object;
    emit?(name: 'tools/change'): unknown;
    get(name: 'tools'): {
        get(name: string, scope?: unknown): ToolDefinition | undefined;
    } | undefined;
}
export interface NativeProvider {
    definition: ToolDefinition;
    scope: unknown;
    active: boolean;
    inheritable: boolean;
    priority: number;
}
/** Source-provider revisions include hidden registrations, unlike the projected tool view. */
export declare function nativeProviderRevision(ctx: Host, chain: readonly unknown[]): string;
export declare function registerNativeProvider(ctx: Host, definitions: ToolDefinition[], register: (tool: ToolDefinition) => (() => void), options?: {
    inheritable?: boolean;
    priority?: number;
}): Promise<() => void>;
/** Callers that already resolved the public scope API can commit synchronously. */
export declare function registerNativeProviderAtScope(ctx: Host, scope: unknown, definitions: ToolDefinition[], register: (tool: ToolDefinition) => (() => void), options?: {
    inheritable?: boolean;
    priority?: number;
}): () => void;
/** Discovery controls only owned advanced Native providers in its exact layer. */
export declare function claimNativeSelection(ctx: Host, scope: unknown, names: ReadonlySet<string>): () => void;
/** Yield only this plugin's registrations in the exact layer being claimed. */
export declare function claimPtcSurface(ctx: Host, scope: unknown): () => void;
/** Keep an exact origin for Native shadows; ancestor discovery activations are never inheritable. */
export declare function trackNativeShadow(ctx: Host, scope: unknown, definition: ToolDefinition, source: NativeProvider): () => void;
/** Capture before publishing PTC: external restrictions and sibling scopes remain authoritative. */
export declare function nativeProviders(ctx: Host, scope: unknown, respectSelections?: boolean): NativeProvider[];
export {};
