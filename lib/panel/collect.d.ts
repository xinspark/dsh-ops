/**
 * Opt-in capture of new conversations into the session's own working directory
 * (issue #205 §五), and the NDJSON → JSON fold that keeps it crash safe.
 *
 * One projected record per `session/event` is appended to
 * `<cwd>/.dsh-ops/panel/<sessionId>.ndjson` while a session is live, and folded
 * into the single JSON document `<sessionId>.json` at every turn end, on session
 * disposal. Disabling the component stops queued work and retains the append log. The JSON is the only data source; `panel.html` is a
 * viewer that reads it. Three contracts shape the code:
 *
 * - **Capture can never break a session.** Every entry point is wrapped, every
 *   async write is chained and caught, and a failure is reported once per kind;
 *   the handler must not throw into a committed append.
 * - **Data stays bounded.** `textLimit` clamps one text field, `maxSessionBytes`
 *   caps the append log (further records are dropped and counted), and the fold
 *   trims the oldest view rows when the JSON would overrun the same cap.
 * - **Nothing outside the session workspace is touched.** Paths come from the
 *   session's own `header.cwd`; a cwd inside the DSH home, a relative cwd and an
 *   id that cannot be a file name are refused with one log line each.
 *
 * The fold reuses `bench/run.schema.json` field names where the two documents
 * describe the same fact; one live session has no `arms`/`results` counterpart.
 *
 * @module dsh-ops/panel/collect
 */
import type { Row, PanelConfig, PanelPaths, CoreBucket, CaptureEvent, ArchiveMember, FoldedEvents, FoldContext, CollectorOptions } from './types.js';
/** Document format tag; a reader must reject a tag it does not know. */
export declare const PANEL_FORMAT = "dsh-ops/panel-capture@1";
/** Directory below the session working directory that holds both panel files. */
export declare const PANEL_DIR: string;
/** The viewer file name inside {@link PANEL_DIR}. */
export declare const PANEL_HTML = "panel.html";
/** Recognised row keys and their defaults; `capture` is the user-facing switch. */
export declare const PANEL_DEFAULTS: PanelConfig;
/** Error raised for a panel configuration value this component cannot honour. */
export declare class PanelConfigError extends Error {
    /** @param {string} message - what is wrong and what is accepted. */
    constructor(message: string);
}
/** Validate one row's config, applying every default; unknown or out-of-range values fail loud. */
export declare function resolvePanelConfig(options?: unknown): PanelConfig;
/**
 * A session id is used as a file name, so only a conservative character set is
 * accepted: an id this plugin cannot name safely is a session it does not capture.
 * @param {unknown} value - the candidate id.
 * @returns {string|undefined} the id, or undefined when it cannot be a file name.
 */
export declare function safeSessionId(value: unknown): string | undefined;
/**
 * Resolve the three panel paths for one session, or refuse.
 * @returns {{dir: string, data: string, wal: string, html: string, sessionId: string}|undefined} the paths.
 */
export declare function panelPaths(cwd: unknown, sessionId: unknown, options?: {
    env?: NodeJS.ProcessEnv;
}): PanelPaths | undefined;
/**
 * Project one session event onto the bounded append-log record. An event this
 * module does not recognise is still recorded by type, so a newer harness shows
 * up in the document instead of vanishing.
 * @returns {object|undefined} the projected record, or undefined when it is unusable.
 */
export declare function projectEvent(event: unknown, config?: PanelConfig): CaptureEvent | undefined;
/**
 * Read one NDJSON append log, counting lines that are not objects instead of
 * failing the whole fold on one bad byte sequence.
 * @param {string} text - the file contents.
 * @returns {{records: object[], malformed: number}} the parsed records.
 */
export declare function parseAppendLog(text: string): {
    records: Row[];
    malformed: number;
};
/**
 * Fold one session's records into the document `panel.html` reads.
 * @param {object[]} records - parsed append-log records, in order.
 * @param {{config?: object, meta?: object, droppedEvents?: number, malformed?: number}} [context] - fold inputs.
 * @returns {object} the panel document.
 */
export declare function foldRecords(records: readonly unknown[], context?: FoldContext): {
    schemaVersion: number;
    format: string;
    meta: {
        pluginVersion: string | undefined;
        platform: string;
        node: string;
        argv: string[];
        sessionId: string | undefined;
        cwd: string | undefined;
        startedAt: string | undefined;
        endedAt: string | undefined;
    };
    metrics: {
        toolCallsByName: Record<string, number>;
        usage: Record<CoreBucket, number> & {
            grandTotal: number;
            reasoningTokens?: number;
        };
        usageBucketsSeen: string[];
        turnEndReason: string | undefined;
        malformed: number;
        turns: number;
        steps: number;
        stepsWithUsage: number;
        toolCalls: number;
        toolErrors: number;
        textChars: number;
        thinkingChars: number;
        eventCount: number;
        usageReported: boolean;
        format: string;
        sessionId: string | undefined;
        startedAt: string | undefined;
        endedAt: string | undefined;
        durationMs: number;
    };
    conversation: Row[];
    trace: Row[];
    verify: {
        checks: number;
        passed: number;
        failed: number;
        degraded: boolean;
        notes: string[];
    };
    events: FoldedEvents;
    archive: ArchiveMember[];
    limits: {
        textLimit: number;
        maxSessionBytes: number;
        truncated: boolean;
        droppedEvents: number;
        droppedChars: number;
        traceTruncated: boolean;
        conversationTruncated: boolean;
        trimmed: boolean;
        trimmedRows: number;
    };
};
/**
 * Shrink a document until it fits `cap`, dropping the oldest view rows first.
 * Metrics and usage totals are never dropped: they stay the complete accounting.
 * @returns {{text: string, bytes: number, trimmedRows: number}} the fitted text.
 */
export declare function fitDocument(document: ReturnType<typeof foldRecords>, cap: number): {
    text: string;
    bytes: number;
    trimmedRows: number;
};
/**
 * Create the capture sink for one activation. It owns no timers and registers
 * nothing; persistence is per session and lazy, so no directory exists until the
 * first event of the first captured session arrives.
 * @param {object} [options] - `config`, `io`, `env`, `now`, `report` and `meta` seams.
 * Returns the collector for this activation.
 */
export declare function createPanelCollector(options?: CollectorOptions): Readonly<{
    config: PanelConfig;
    /** Observe one committed session event; never throws, never rejects. */
    observe(session: unknown, event: unknown): void;
    /** Wait for every append scheduled for one session (or all of them). */
    flush(sessionId?: string): Promise<void>;
    /** Fold one session's append log into its JSON document. */
    merge(sessionId: string): Promise<void>;
    /** Seal one session: final fold that drops the append log. */
    close(sessionId: string): Promise<void>;
    /** Stop collection without starting a final fold. Await all issued I/O before
     * the loader reports this row disabled; retained append logs remain recoverable. */
    stop(): Promise<void>;
    /** Explicitly seal every session. Component teardown uses stop() instead. */
    dispose(): Promise<void>;
    /** The paths one captured session writes to, for callers that must report them. */
    pathsFor(sessionId: string): PanelPaths | undefined;
    /** How many sessions this activation has captured. */
    readonly size: number;
}>;
