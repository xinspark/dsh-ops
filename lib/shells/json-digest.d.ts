import type { HostBashResult, ShellCall } from './types.js';
/** Pure digest construction: malformed, scalar, oversized or unhelpful input retains its old rendering. */
export declare function jsonDigest(text: string, fullPath: string): string | undefined;
/** Canonical/SDK values stay unchanged. Prepared text is attached only to a direct Native call. */
export declare function createJsonDigestProjection(): {
    prepare(value: HostBashResult, exec: ShellCall): Promise<void>;
    projectContent: (exec: Readonly<import("@deepseek-ai/dsh-tools").ToolExecution>, result: Readonly<import("@deepseek-ai/dsh-tools").ToolExecutionResult>) => import("@deepseek-ai/dsh-llm").ContentBlock[] | undefined;
};
