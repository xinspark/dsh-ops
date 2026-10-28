/** Narrow untrusted worker and argument values before touching host services. */
export interface WorkerInvokeConfig {
    binaryPath?: string;
    required?: boolean;
    denyCredentialReads?: boolean;
    toolCallTimeoutMs?: number;
}
export declare function record(value: unknown): value is Record<string, unknown>;
export declare function errorText(error: unknown): string;
