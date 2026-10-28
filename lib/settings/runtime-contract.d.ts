/** Shared strict descriptors for operator-only settings actions; no host value imports. */
import type { InvocationDescriptor, RemoteResult } from '../adapter/dsh/types.js';
export declare const RUNTIME_ACTIONS: readonly ["install-bash", "remove-bash", "upgrade-pwsh"];
export type RuntimeAction = typeof RUNTIME_ACTIONS[number];
export type BashSource = 'managed' | 'git';
export interface RuntimePlan {
    id: string;
    action: RuntimeAction;
    available: boolean;
    details: string[];
    reason?: string;
}
export interface RuntimeSnapshot {
    platform: string;
    managed: {
        version: string;
        directory: string;
        owned: boolean;
    }[];
    git: string[];
    powerShell: {
        supported: boolean;
        guidance: string;
        unavailable?: string;
        version?: string;
    };
    /** Installed version of dsh-win-pwsh7, when the profile has it. */
    companion?: string;
}
export interface RuntimeSelection {
    bashPath: string;
    restriction: string;
}
export interface RuntimeResult {
    status: 'completed' | 'no-update' | 'failed' | 'cancelled' | 'stale' | 'unavailable' | 'busy';
    effectState: 'none' | 'applied' | 'unknown';
    message: string;
    exitCode?: number | null;
}
export interface RuntimeRemote {
    snapshot(): Promise<RemoteResult<RuntimeSnapshot>>;
    plan(action: RuntimeAction): Promise<RemoteResult<RuntimePlan>>;
    select(source: BashSource): Promise<RemoteResult<RuntimeSelection>>;
    execute(id: string, signal?: AbortSignal): Promise<RemoteResult<RuntimeResult>>;
}
declare module '@deepseek-ai/dsh-typert-protocol' {
    interface TypertRemoteNamespaceMap {
        opsSettings: RuntimeRemote;
    }
}
export declare const parseAction: (value: unknown) => RuntimeAction;
export declare const parseSource: (value: unknown) => BashSource;
export declare const RUNTIME_DESCRIPTORS: readonly InvocationDescriptor[];
export declare const RUNTIME_REMOTE: Readonly<{
    package: "dsh-ops";
    descriptors: readonly InvocationDescriptor[];
}>;
