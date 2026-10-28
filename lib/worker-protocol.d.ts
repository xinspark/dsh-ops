export declare const WORKER_TIMEOUT_MS = 30000;
export declare const WORKER_OUTPUT_BYTES: number;
export interface WorkerStorage {
    root: string;
    authorityId: string;
    allowedTools: string[];
    windowsWriteSid?: string;
}
export declare function workerEnvelope(component: 'file' | 'ptc', request: Record<string, unknown>, timeoutMs?: number | null, storage?: WorkerStorage): {
    storage?: WorkerStorage | undefined;
    version: number;
    requestId: `${string}-${string}-${string}-${string}-${string}`;
    component: "file" | "ptc";
    budget: {
        timeoutMs: number;
        maxBytes: number;
    };
    request: Record<string, unknown>;
};
