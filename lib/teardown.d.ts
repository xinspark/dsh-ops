/**
 * Teardown that survives a throwing disposer.
 *
 * Every teardown site in this plugin runs a list of `dispose()` callbacks the
 * host handed back to us. One throwing callback must not stop the others: these
 * lists withdraw tool registrations and capability grants, so an exception
 * escaping the loop leaves later agents holding permissions they should have
 * lost — and where the loop sits inside a capability guard, it wedges that guard
 * closed and freezes publishing for the rest of the session.
 *
 * `safeDispose` isolates one callback and reports the failure, so callers can
 * iterate without their own try/catch and without losing the rest of the list.
 * @module dsh-ops/teardown
 */
/**
 * Run one teardown callback, isolating any failure.
 * @param {(() => void)|undefined} [fn] - the disposer.
 * @param {(error: unknown, label: string) => void} [onError] - sink for a failure.
 * @param {string} [label] - what was being torn down, for the log.
 * @returns {boolean} true when the callback ran (or was absent) without throwing.
 */
export declare function safeDispose(fn?: () => void, onError?: (error: unknown, label: string) => void, label?: string): boolean;
/**
 * Drain an iterable of disposers, isolating each one.
 * @param {Iterable<() => void>} disposers - the callbacks to run.
 * @param {(error: unknown, label: string) => void} [onError] - sink for failures.
 * @param {string} [label] - what was being torn down, for the log.
 * @returns {number} how many callbacks threw.
 */
export declare function safeDisposeAll(disposers: Iterable<() => void>, onError?: (error: unknown, label: string) => void, label?: string): number;
