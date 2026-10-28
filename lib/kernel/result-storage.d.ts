import type { SandboxExecutionPolicy, ConfinedArgv } from '../adapter/dsh/types.js';
import type { WorkerStorage } from '../worker-protocol.js';
import type { ResultSession } from './result-lifecycle.js';
interface Subprocess {
    spawn(spec: {
        argv: string[];
        cwd: string;
        stdio: {
            stdin: {
                data: string;
            };
            stdout: {
                maxBytes: number;
            };
            stderr: {
                maxBytes: number;
            };
        };
        graceMs: number;
        signal: AbortSignal;
    }): {
        done: Promise<{
            exitCode: number | null;
            signal?: unknown;
        }>;
        collected: {
            stdout: {
                readFrom(offset: number): {
                    text: string;
                    lossy?: boolean;
                };
            };
        };
    };
}
export interface StorageHost {
    root?: object;
    get(name: 'sandbox'): {
        confine(argv: string[], policy: SandboxExecutionPolicy & {
            mode: 'read-only' | 'workspace-write';
        }, signal?: AbortSignal): Promise<ConfinedArgv>;
    } | undefined;
    get(name: 'sandboxPolicy'): {
        resolve(input: {
            session: ResultSession;
        }): SandboxExecutionPolicy;
    } | undefined;
    get(name: 'tools'): {
        schemas(scope: unknown): {
            name: string;
        }[];
        get(name: string, scope: unknown): unknown;
    } | undefined;
    get(name: 'subprocess'): Subprocess | undefined;
}
type Location = {
    root: string;
    windowsWriteSid?: string;
};
/** Parse only the runner's pre-separator contract, not the wrapped program's arguments. */
export declare function windowsCacheLocation(argv: readonly string[]): Location | undefined;
/**
 * bwrap gives workspace-write children a private tmpfs over /tmp, which hides the host-created
 * cache below tmpdir(). Re-expose exactly that one private directory; every other runner, and
 * read-only bwrap (no tmpfs), already sees it and is returned unchanged.
 */
export declare function exposePosixCache(argv: readonly string[], storage: WorkerStorage | undefined): string[];
export declare function resultStorage(ctx: StorageHost, session: ResultSession, scope: unknown, file: string, tool: string, policy: SandboxExecutionPolicy, denyRoots: string[], denyNames: boolean, signal?: AbortSignal, confined?: ConfinedArgv): Promise<WorkerStorage | undefined>;
export {};
