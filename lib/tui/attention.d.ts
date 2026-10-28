/** Constant-memory aggregate notifications; never a current-session status or issue ledger. */
export type AttentionLevel = 'error' | 'warning';
export interface AttentionSnapshot {
    readonly unread: number;
    readonly capped: boolean;
    readonly level: AttentionLevel | undefined;
}
export interface AttentionStore {
    snapshot(): AttentionSnapshot;
    observe(row: unknown): boolean;
    acknowledge(): boolean;
    subscribe(listener: () => void): () => void;
    dispose(): void;
}
export declare const ALERT_CAP = 999;
export declare function anomalyLevel(row: unknown): AttentionLevel | undefined;
/** Record only newly accepted settlements. Deduplication belongs to the activity store. */
export declare function createAttentionStore(): AttentionStore;
