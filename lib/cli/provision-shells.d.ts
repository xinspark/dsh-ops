/**
 * `dsh-ops provision-shells`: turn the pinned upstream shell releases into the
 * local copies the shell rungs prefer — download, digest verification, unpacking,
 * and the receipt that records which pin produced each copy.
 *
 * Split out of `bin/dsh-ops.mjs`; the command's argv surface, output and exit
 * codes are unchanged.
 *
 * @module dsh-ops/cli/provision-shells
 */
type ShellKind = 'bash' | 'pwsh';
export interface ShellPin extends Record<string, unknown> {
    name: ShellKind;
    platform: string;
    arch: string;
    version: string;
    assetFile: string;
    url: string;
    sha256: string;
    bytes: number;
    extractor: string;
    extractTo: string;
    executableRelativePath: string;
}
type HelperResult = {
    ok: true;
} | {
    error: string;
    stderr: string[];
};
/** Receipt schema written inside one provisioned shell's version directory. */
export declare const SHELL_RECEIPT_VERSION = 1;
/** The marker file a provisioned version directory carries. */
export declare const SHELL_RECEIPT_FILE = ".provisioned.json";
/** The archive shapes a pin may name, and how each is opened. */
export declare const PIN_EXTRACTORS: readonly string[];
/** The fields every pin must carry; `executableSha256` and the labels are optional. */
export declare const PIN_REQUIRED_FIELDS: readonly string[];
/**
 * The SHA-256 of one file, streamed so a 100 MB archive is never held in memory
 * twice.
 * @param {string} file - the file to hash.
 * @returns {string} the lowercase hex digest.
 */
export declare function sha256File(file: string): string;
/**
 * The last few non-empty lines of one stream, for a failure report.
 * @param {string|undefined} text - the stream.
 * @param {number} [count] - how many lines to keep.
 * @returns {string[]} the lines.
 */
export declare function tailLines(text: string | undefined | null, count?: number): string[];
/**
 * Run one helper program, and report the tail of its stderr when it fails.
 * @param {string} file - the program.
 * @param {string[]} args - its arguments.
 * @param {object} [options] - run inputs.
 * @param {string} [options.cwd] - working directory for the child.
 * @returns {{ok: true}|{error: string, stderr: string[]}} the outcome.
 */
export declare function runTool(file: string, args: string[], { cwd }?: {
    cwd?: string;
}): HelperResult;
/**
 * The proxy one environment names, in curl's own precedence.
 * @param {NodeJS.ProcessEnv} env - the environment to read.
 * @returns {string|undefined} the proxy URL, when one is named.
 */
export declare function proxyFor(env: NodeJS.ProcessEnv): string | undefined;
/**
 * Download one pinned asset with the platform's own `curl`.
 *
 * The child inherits this process's environment — curl reads the proxy
 * variables itself — and a named proxy is ALSO passed as `--proxy`, so the
 * answer does not depend on which of curl's own variables wins. `process.env` is
 * read, never written.
 * @param {object} options - download inputs.
 * @param {{url: string, assetFile: string}} options.pin - what to fetch.
 * @param {string} options.into - the directory to write the asset into.
 * @param {NodeJS.ProcessEnv} options.env - the environment to read.
 * @returns {{file: string}|{error: string, detail: string, stderr: string[]}} the asset, or why not.
 */
export declare function curlAsset({ pin, into, env }: {
    pin: Pick<ShellPin, 'url' | 'assetFile'>;
    into: string;
    env: NodeJS.ProcessEnv;
}): {
    file: string;
} | {
    error: string;
    detail: string;
    stderr: string[];
};
/**
 * A `tar` that can open a zip: Windows' own bsdtar, never the GNU tar a Git
 * installation puts on PATH.
 *
 * The distinction is not cosmetic. GNU tar cannot read a zip container, so
 * pointing it at the PowerShell archive fails with a message about a corrupt
 * archive rather than about the wrong program. `%SystemRoot%\System32\tar.exe`
 * is the bsdtar Windows 10 and newer ship, and its `--version` says so.
 * @param {NodeJS.ProcessEnv} env - the environment to locate it with.
 * @returns {string|undefined} the program, or undefined when there is none.
 */
export declare function findZipCapableTar(env: NodeJS.ProcessEnv): string | undefined;
/**
 * Unpack one verified asset into a version directory.
 * @param {object} options - unpack inputs.
 * @param {{extractor: string, extractTo: string}} options.pin - the pin.
 * @param {string} options.asset - the verified archive.
 * @param {string} options.target - the version directory.
 * @returns {{ok: true}|{error: string, stderr: string[]}} the outcome.
 */
export declare function unpackAsset({ pin, asset, target }: {
    pin: Pick<ShellPin, 'extractor' | 'extractTo'>;
    asset: string;
    target: string;
}): HelperResult;
/**
 * Validate one pin object from a `--pin` file.
 *
 * The fields become path segments (`name`, `version`), a file name
 * (`assetFile`), and an extraction directory (`extractTo`), so they are checked
 * rather than trusted: this table is the one operator-supplied input that
 * reaches the filesystem and the network.
 * @param {unknown} value - the candidate pin.
 * @param {number} index - its position, for the error message.
 * @returns {object} the validated pin.
 * @throws {Error} when a field is missing or malformed.
 */
export declare function validatePin(value: unknown, index: number): ShellPin;
/**
 * The pins `provision-shells` works from.
 *
 * The shipped table is the default; `--pin` replaces it with one JSON file — a
 * mirror, an offline pin set, or a test fixture. Every pin that arrives that way
 * is validated, because these values become paths and a download.
 * @param {string|undefined} file - the `--pin` path, when one was given.
 * @returns {object[]} the pins.
 * @throws {Error} when the file is unreadable or a pin is malformed.
 */
export declare function pinTable(file: string | undefined): ShellPin[];
/**
 * Read one provision marker, or undefined when it is absent or unreadable.
 * @param {string} file - the marker file.
 * @returns {object|undefined} the parsed marker.
 */
export declare function readShellReceipt(file: string): Record<string, unknown> | undefined;
/**
 * Provision one pinned shell: download, verify, unpack, and record.
 *
 * Nothing outside the deployment is written: the asset lands in a fresh
 * temporary directory that is removed once the copy is in place, and the copy
 * lands in `<DSH_HOME>/dsh-ops/shells/<name>/<version>`. A failure keeps the
 * downloaded bytes and says where they are, because "the digest did not match"
 * is only actionable with the file in hand.
 * @param {object} pin - the validated pin.
 * @param {object} options - run inputs.
 * @param {boolean} options.force - reinstall even when a matching copy is present.
 * @param {boolean} options.dryRun - report what would happen, and download nothing.
 * @returns {boolean} whether this shell is provisioned (or already was).
 */
export declare function provisionShell(pin: ShellPin, { force, dryRun }: {
    force: boolean;
    dryRun: boolean;
}): boolean;
/**
 * `provision-shells`: turn the pinned upstream releases into the local copies
 * the shell rungs prefer.
 *
 * The pointer is the whole distribution story for these two binaries: this
 * command is what reads {@link SHELL_UPSTREAM_PINS}, downloads the exact
 * archive, checks the exact digest, and unpacks it under `DSH_HOME`. A shell
 * that is already there with the pinned digest is left alone (`--force` is the
 * way to reinstall), and `--dry-run` answers "what would this do" without
 * touching the network or the filesystem.
 * @param {object} options - command inputs.
 * @param {('bash'|'pwsh')[]} options.kinds - which shells to provision.
 * @param {boolean} options.force - reinstall even when current.
 * @param {boolean} options.dryRun - report only.
 * @param {string|undefined} options.pinFile - read the pins from this JSON file instead.
 * @returns {number} the exit code: 0 when every selected shell is in place, 1 otherwise.
 */
export declare function commandProvisionShells({ kinds, force, dryRun, pinFile }: {
    kinds: ShellKind[];
    force: boolean;
    dryRun: boolean;
    pinFile?: string;
}): 0 | 1;
export {};
