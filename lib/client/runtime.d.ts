import type { RuntimeAction, RuntimePlan, RuntimeRemote, RuntimeResult, RuntimeSnapshot } from '../settings/runtime-contract.js';
/** What a mounted runtime surface can read and ask the Host to do. */
export interface RuntimeState {
    readonly snapshot: RuntimeSnapshot | undefined;
    /** Local time of the accepted snapshot; absent until the first answer. */
    readonly at: string | undefined;
    readonly busy: boolean;
    /** Last transport or planning failure, shown inline. */
    readonly message: string;
    readonly plan: RuntimePlan | undefined;
    readonly result: RuntimeResult | undefined;
    refresh(): Promise<void>;
    preview(action: RuntimeAction): Promise<void>;
    execute(): Promise<void>;
    cancel(): void;
    dismiss(): void;
}
/**
 * Mount the runtime remote for one page.
 * @param api - the typed remote the browser half mounted at apply time.
 * @returns the snapshot, the pending plan and the actions that operate on them.
 */
export declare function useRuntime(api: RuntimeRemote): RuntimeState;
/** One detected executor the operator may copy into the row's own configuration. */
export interface DetectedBash {
    /** Absolute path the Host reported. */
    readonly path: string;
    /** Where it came from, as a short operator-facing label. */
    readonly source: 'managed' | 'git';
    /** Managed installation version, when the Host reports one. */
    readonly version?: string;
}
