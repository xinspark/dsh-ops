import type { BusinessOutcome, ResultDetails } from './result.js';
export interface ActivityConfig {
    maxSessions: number;
    maxActive: number;
    recentLimit: number;
}
export type ActiveCall = Readonly<{
    id: string;
    name: string;
    startedAt: number;
    status: 'running';
}>;
export type SettledCall = Readonly<Omit<ActiveCall, 'status'> & ResultDetails & {
    status: 'error' | 'returned';
    durationMs: number;
}>;
export type ActivityRow = ActiveCall | SettledCall;
export interface ActivitySnapshot {
    readonly business: Readonly<Record<BusinessOutcome, number>>;
    readonly total: number;
    readonly running: number;
    readonly returned: number;
    readonly errors: number;
    readonly limited: boolean;
    readonly since: number | undefined;
    readonly active: readonly ActiveCall[];
    readonly recent: readonly SettledCall[];
}
export interface ActivityStore {
    observe(sessionId: unknown, event: unknown): boolean;
    snapshot(sessionId?: string): ActivitySnapshot;
    subscribe(listener: () => void): () => void;
    dispose(): void;
}
export declare const ACTIVITY_DEFAULTS: Readonly<{
    maxSessions: 32;
    maxActive: 128;
    recentLimit: 8;
}>;
/** Validate retention settings shared by the optional observer and its bundle row. */
export declare function resolveActivityConfig(options?: unknown): Readonly<ActivityConfig>;
/**
 * Bounded, instance-owned activity for events observed after mounting, not session-history replay.
 * At capacity, new active calls are omitted and limited is set; existing calls still settle.
 * Session LRU eviction drops statistics only, never running work. Call IDs are opaque.
 */
export declare function createActivityStore(options?: Partial<ActivityConfig>): ActivityStore;
