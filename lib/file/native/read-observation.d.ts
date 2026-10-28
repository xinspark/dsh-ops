import type { ToolDefinition, ToolExecution, ToolExecutionResult } from '../../adapter/dsh/types.js';
export interface ReadObservation {
    readonly body: string;
    readonly key: string;
}
export declare const record: (value: unknown) => value is Record<string, unknown>;
export declare function exactJson(value: unknown): string;
/** A fresh successful worker read is required before any metadata is observed. */
export declare function observeRead(tool: ToolDefinition, exec: Readonly<ToolExecution>, result: Readonly<ToolExecutionResult>): ReadObservation | undefined;
export declare function unchangedContent(body: string, callId: string, messageId: string): string | undefined;
