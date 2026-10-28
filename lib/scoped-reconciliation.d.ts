/** Host probes may never resolve. Only their inheritance family may wait for them. */
export interface Reconciliation {
    signal: AbortSignal;
    current(): boolean;
    wait<T>(promise: Promise<T>): Promise<T>;
}
export declare function scopedReconciliation<K>(failed: (error: unknown) => void): {
    cancel: (members: Iterable<K>) => void;
    forget(member: K): void;
    version: (member: K) => unknown;
    run(members: Iterable<K>, action: (work: Reconciliation) => Promise<void>): Promise<void>;
    drain(member: K): Promise<boolean>;
    stop(): Promise<void>;
};
/** Ancestor overlays and their descendants commit together; roots stay independent. */
export declare function scopeFamilies<K extends object>(members: Iterable<K>, targets: Iterable<K>, ancestors: (scope: K) => object[]): Set<K>[];
