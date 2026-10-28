import type { ToolDefinition } from '../adapter/dsh/types.js';
import { invoke } from '../ptc/worker.js';
export declare function resultDefinition(execute: ToolDefinition['execute']): ToolDefinition;
type Execution = Parameters<ToolDefinition['execute']>[1];
export declare function invokeResult(ctx: Parameters<typeof invoke>[0], file: string, args: unknown, exec: Execution, signal: AbortSignal, config: Parameters<typeof invoke>[6]): Promise<unknown>;
export {};
