/** Adapt one OPS execution to the host job registry without replacing its lifecycle. */
import type { ShellJobs, ShellCall, StartShell, ShellExecution, HostBashResult } from './types.js';
/** A run hook may have been accepted even when admission itself throws. */
export declare class BashJobAdmissionError extends Error {
    readonly runInvoked: boolean;
    constructor(cause: unknown, runInvoked: boolean);
}
export declare function startBashJob(jobs: ShellJobs, args: {
    description?: string;
    command?: string;
    script_path?: string;
}, exec: ShellCall, start: StartShell): {
    id: string;
    label: string;
    process: () => ShellExecution | undefined;
    stopped: () => string | undefined;
    effects: () => "none" | "unknown";
};
export declare function waitOnBashJob(jobs: ShellJobs, attached: ReturnType<typeof startBashJob>, exec: ShellCall, timeoutMs: number): Promise<HostBashResult>;
