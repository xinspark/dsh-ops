/** The prefix every session directory shares, so an operator can find and prune them. */
export declare const SESSION_TEMP_PREFIX = "dsh-ops-session-";
/**
 * The directory this session owns below the system temporary root.
 * @param {string} sessionId - the authoritative session identity.
 * @param {string} [tempRoot] - the system temporary root; defaults to `os.tmpdir()`.
 * @returns {string} the absolute path.
 */
export declare function sessionTempDir(sessionId: string, tempRoot?: string): string;
/**
 * Create the session's directory if it is missing.
 *
 * A directory that cannot be created is reported as a denied write rather than
 * an exception: the caller's fence has already decided the write is allowed,
 * and the failure to provide the one place it may go is the operator's answer
 * to give, not a crash.
 * @param {string} directory - the absolute directory.
 * @returns {{ok: true}|{ok: false, message: string}} the outcome.
 */
export type SessionTempOutcome = {
    ok: true;
} | {
    ok: false;
    message: string;
};
export declare function ensureSessionTemp(directory: string): SessionTempOutcome;
