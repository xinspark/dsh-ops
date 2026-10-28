/** Environment variable naming extra denied paths, separated by the platform delimiter. */
export declare const DENY_ENV = "DSH_OPS_DENY_READ";
export interface CredentialOptions {
    home?: string;
    env?: NodeJS.ProcessEnv;
}
export type CredentialVerdict = {
    denied: true;
    matched: string;
} | {
    denied: false;
};
/**
 * Credential files and directories, as path suffixes below the user's home.
 *
 * A suffix is matched on whole path components, case-insensitively, so
 * `~/.ssh/id_ed25519` is denied by `~/.ssh` and a file merely named
 * `ssh-notes.txt` is not.
 * @type {readonly string[]}
 */
export declare const CREDENTIAL_SUFFIXES: readonly string[];
/**
 * Whether one absolute path is inside a denied credential location.
 *
 * @param {string} candidate - the absolute path to test.
 * @param {object} [options] - comparison inputs.
 * @param {string} [options.home] - the home directory to resolve suffixes against.
 * @param {NodeJS.ProcessEnv} [options.env] - the environment to read extra entries from.
 * @returns {{denied: true, matched: string}|{denied: false}} the verdict and the suffix that matched.
 */
export declare function credentialPath(candidate: unknown, { home, env }?: CredentialOptions): CredentialVerdict;
/**
 * The credential locations as absolute directories, for a caller that wants to
 * skip them during a traversal rather than refuse one path.
 *
 * Only the directory-shaped suffixes are returned: a file such as `.npmrc` is
 * not a root to walk around, and skipping its parent would hide the whole home
 * directory.
 * @param {object} [options] - the same inputs as {@link credentialPath}.
 * @returns {string[]} the absolute directories, deduplicated.
 */
export declare function credentialRoots({ home, env }?: CredentialOptions): string[];
/**
 * The refusal a denied operation reports. The wording names the fence and the way
 * out, because "denied" without either invites a retry loop, and it names both
 * directions: a caller stopped from writing must not read the message as "reads
 * are fenced" (#204 P4).
 * Denied paths and matching rules are intentionally absent: either can reveal a real parent path.
 * @param {string} _candidate - ignored; retained for internal call compatibility.
 * @param {string} _matched - ignored; the refusal does not disclose the matching rule.
 * @returns {{code: string, message: string, nextAction: string}} the refusal.
 */
export declare function credentialRefusal(_candidate: string, _matched: string): {
    code: string;
    message: string;
    nextAction: string;
};
