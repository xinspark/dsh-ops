/** Provider-owned Native contracts. Registration alone never expands a session's tools. */
import type { Context, Agent, ToolDefinition, ToolExecution } from '../adapter/dsh/types.js';
export interface NativeCapability {
    definition: ToolDefinition;
    search: string;
    /** Provider authorization is mandatory and is rechecked immediately before execution. */
    authorize(context: Readonly<ToolExecution>): boolean | Promise<boolean>;
    available?(agent: Agent): boolean;
    disclosure?: 'resident' | 'on-demand';
}
export interface Provider {
    readonly token: string;
    readonly scope?: object;
    readonly capability: NativeCapability;
    active: boolean;
    calls: Set<AbortController>;
}
export declare function providers(ctx: Context, agent: Agent): Provider[];
export declare function onProvidersChange(ctx: Context, listener: () => void): () => void;
export declare function prepareProviders(ctx: Context): Promise<void>;
/** Use the returned disposer (also bound to ctx) for capability updates, unload and reload. */
export declare function registerNativeCapability(ctx: Context, capability: NativeCapability): Promise<() => void>;
