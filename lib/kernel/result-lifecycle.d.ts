export interface ResultSession {
    id: string;
    header?: {
        cwd?: string;
    };
}
export interface LifecycleHost {
    root?: object;
    on(name: 'session/disposed', callback: (session: ResultSession) => void): unknown;
    on(name: 'session/event', callback: (session: ResultSession, event: {
        type: string;
    }) => void): unknown;
    effect(callback: () => (() => Promise<void>), label: string): unknown;
    logger?: {
        warn?: (message: string) => void;
    };
}
/** A reopened persisted session receives a fresh authority binding, even with the same id. */
export declare function resultSessionNonce(ctx: Pick<LifecycleHost, 'root'>, session: ResultSession): string;
export declare function registerResultCleanup(ctx: Pick<LifecycleHost, 'root'>, session: ResultSession, key: string, cleanup: () => Promise<void>): void;
export declare function withResultSession<T>(ctx: Pick<LifecycleHost, 'root'>, session: ResultSession, signal: AbortSignal | undefined, run: (signal: AbortSignal) => Promise<T>): Promise<T>;
export declare function expireResultSession(ctx: Pick<LifecycleHost, 'root' | 'logger'>, session: ResultSession, disposed?: boolean): Promise<void>;
/** Each component owns its listeners. Last-owner teardown expires remaining sessions. */
export declare function mountResultLifecycle(ctx: LifecycleHost): void;
