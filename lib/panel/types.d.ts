/** Persisted capture boundaries. JSON remains unknown until the fields used by the fold are checked. */
import type fsp from 'node:fs/promises';
export type Row = Record<string, unknown>;
export interface PanelConfig {
    readonly capture: boolean;
    readonly textLimit: number;
    readonly maxSessionBytes: number;
}
export interface PanelPaths {
    dir: string;
    data: string;
    wal: string;
    html: string;
    sessionId: string;
}
export interface TextField {
    text?: string | null;
    chars?: number | null;
    truncated?: unknown;
    droppedChars?: number | null;
}
export type CoreBucket = 'inputTokens' | 'outputTokens' | 'cacheReadTokens' | 'cacheWriteTokens';
export type UsageBucket = CoreBucket | 'reasoningTokens' | 'totalTokens';
export type Usage = Partial<Record<UsageBucket, number>>;
export interface CaptureEvent {
    seq: number;
    time: number;
    type: string;
    role?: string;
    source?: unknown;
    turn?: unknown;
    step?: unknown;
    callId?: string;
    name?: string;
    reason?: string;
    errorCode?: string;
    interrupted?: unknown;
    isError?: unknown;
    payload?: TextField | null;
    reasoning?: TextField | null;
    arguments?: TextField | null;
    toolCalls?: unknown[];
    usage?: Usage | null;
    usageReported?: unknown;
    usageBuckets?: string[];
}
export interface ArchiveMember {
    path: string;
    bytes: number;
    sha256: string;
    role: string;
}
export interface EventFile {
    path: string;
    events: number;
    sha256: string;
}
export interface FoldedEvents {
    layout: 'merged';
    merged: boolean;
    mergedAt?: string;
    records: number;
    malformed: number;
    types: Record<string, number>;
    files: EventFile[];
}
export interface SessionState {
    sessionId: string;
    paths: PanelPaths;
    size: number;
    droppedEvents: number;
    capped: boolean;
    closed: boolean;
    pendingBytes: number;
    queueCapped: boolean;
    openFailed: boolean;
    header?: Row;
    chain: Promise<void>;
}
export interface PanelMeta {
    pluginVersion?: unknown;
    platform?: unknown;
    node?: unknown;
    argv?: unknown;
}
export interface FoldContext {
    config?: PanelConfig;
    meta?: PanelMeta;
    droppedEvents?: number;
    malformed?: number;
}
export type PanelIO = Pick<typeof fsp, 'readFile' | 'mkdir' | 'appendFile' | 'writeFile' | 'rename' | 'stat' | 'rm'>;
export interface CollectorOptions {
    config?: PanelConfig;
    io?: PanelIO;
    env?: NodeJS.ProcessEnv;
    now?: () => number;
    report?: (message: string, level: string) => void;
    meta?: PanelMeta;
}
export declare const object: (value: unknown) => value is Row;
export declare const field: (value: unknown, key: string) => unknown;
export declare const finite: (value: unknown) => value is number;
/** Invalid persisted fields are counted as malformed; never coerce them into text or token totals. */
export declare function foldEvent(value: Row): value is Row & CaptureEvent;
export declare const missingFile: (error: unknown) => boolean;
