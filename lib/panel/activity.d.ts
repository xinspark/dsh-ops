/** Fence queued work before shutdown, while callers await operations already running. */
export declare function activityGate(): {
    run<T>(operation: () => T | Promise<T>): Promise<T>;
    stop(): void;
    cancelled(error: unknown): boolean;
};
