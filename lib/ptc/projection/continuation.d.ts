/** Continuations describe read-only retrieval. They are data, never authority or automatic retries. */
import type { CanonicalData } from './outcome.js';
import { CONTINUATION_TOOLS as readers } from '../../capabilities/registry.js';
export type ContinuationTool = typeof readers[number];
export interface RetrievalContinuation {
    version: 1;
    tool: ContinuationTool;
    args: CanonicalData;
}
/** Decode only; callers choose whether and when to invoke an available SDK binding. */
export declare function decodeContinuation(token: string): RetrievalContinuation | undefined;
export declare function continuationFor(tool: string, rawArgs: unknown, data: CanonicalData): string | undefined;
