import type { Context } from '../adapter/dsh/types.js';
import type { ToolDefinition } from '../adapter/dsh/types.js';
import type { FileToolName } from '../capabilities/registry.js';
type Execution = Parameters<ToolDefinition['execute']>[1];
type NativeToolName = FileToolName | 'result';
export interface NativeRuntimeConfig {
    workerPath?: string;
    required?: boolean;
    denyCredentialReads?: boolean;
    toolCallTimeoutMs?: number;
}
type Reporter = (message: string, level?: string) => void;
export declare class NativeFileTools {
    readonly ctx: Context;
    readonly config: NativeRuntimeConfig;
    readonly report: Reporter;
    file: string | undefined;
    readonly active: Map<AbortController, Promise<unknown>>;
    readonly disposers: (() => void)[];
    private stopped;
    private readonly readDedup;
    private unregisterProvider;
    constructor({ ctx, config, report }: {
        ctx: Context;
        config: NativeRuntimeConfig;
        report?: Reporter;
    });
    start(names?: readonly NativeToolName[]): Promise<string[]>;
    definition(rawName: NativeToolName): ToolDefinition;
    call(tool: NativeToolName, args: unknown, exec: Execution): Promise<unknown>;
    cancel(reason: string): void;
    stop(): Promise<void>;
}
export {};
