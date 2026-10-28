/**
 * `dsh-ops panel`: serve the shipped viewer and one capture directory on the
 * loopback interface.
 *
 * The viewer itself stays a static page that inlines no data. Opening it from
 * `file://` requires dragging a report in because browsers refuse same-directory
 * `fetch`; this command exists so the ordinary path is one command instead of a
 * drag or a hand-written static server. It serves:
 *
 * - `/` → the viewer, with the newest valid report selected;
 * - `/panel.html` → the viewer shipped in this package (never a stale copy in
 *   the capture directory);
 * - `/api/sessions` → the valid reports in the directory, for the page's
 *   session picker;
 * - `/<sessionId>.json` → one report in that directory.
 *
 * It binds `127.0.0.1` only, reads only the named directory, refuses to follow a
 * path or symlink outside it, and never writes anything. Reports that do not
 * parse as panel documents are skipped with their reason instead of making the
 * newest valid report unusable.
 *
 * @module dsh-ops/cli/panel
 */
import http from 'node:http';
/** The only interface this command binds. */
export declare const PANEL_SERVE_HOST = "127.0.0.1";
/** One valid report found in a capture directory. */
export interface PanelSession {
    /** File name inside the capture directory. */
    file: string;
    /** Session id from the document's `meta`, or the file name without `.json`. */
    sessionId: string;
    /** File modification time, milliseconds since the epoch. */
    mtimeMs: number;
    /** File size in bytes. */
    bytes: number;
}
/** The parsed state of one capture directory. */
export interface PanelDirectory {
    /** Absolute capture directory. */
    dir: string;
    /** Valid reports, newest first. */
    sessions: PanelSession[];
    /** Files that look like reports but are not valid panel documents. */
    invalid: {
        file: string;
        reason: string;
    }[];
    /** The newest valid report, when there is one. */
    latest?: PanelSession;
}
/** The report index the viewer fetches from a live server. */
export interface PanelSessionIndex {
    sessions: PanelSession[];
    latest: PanelSession['file'] | null;
    invalid: {
        file: string;
        reason: string;
    }[];
}
/** Options for {@link commandPanel}. */
export interface PanelCommandOptions {
    /** Capture directory; defaults to `<cwd>/.dsh-ops/panel`. */
    dir?: string;
    /** Loopback port; 0 (default) lets the kernel choose one. */
    port?: number;
}
/**
 * The capture directory used when the command line names none.
 * @param {string} [cwd] - the working directory to anchor it to.
 * @returns {string} the absolute default path.
 */
export declare function defaultPanelDirectory(cwd?: string): string;
/**
 * Read one capture directory without changing it: valid reports, their order,
 * and the files that look like reports but cannot be used.
 * @param {string} [raw] - the directory to inspect; defaults to {@link defaultPanelDirectory}.
 * @returns {PanelDirectory} what the directory currently holds.
 * @throws {Error} when the directory is absent, unreadable, or not a directory.
 */
export declare function inspectPanelDirectory(raw?: string): PanelDirectory;
/** The JSON index the page fetches for its session picker. */
export declare function sessionIndex(directory: PanelDirectory): PanelSessionIndex;
/**
 * Create the read-only server for one capture directory. It starts listening
 * only when the caller calls `listen`; {@link listenPanel} is the helper.
 * @param {object} options - the directory to serve.
 * @param {string} options.dir - absolute or relative capture directory.
 * @returns {http.Server} the server, not listening yet.
 * @throws {Error} when the directory is missing or not a directory.
 */
export declare function createPanelServer({ dir }: {
    dir: string;
}): http.Server;
/**
 * Listen on loopback and report the port the kernel chose (`0` = ephemeral).
 * @param {http.Server} server - the server from {@link createPanelServer}.
 * @param {{host?: string, port?: number}} [options] - interface and port; the host is loopback by contract.
 * @returns {Promise<number>} the bound port.
 */
export declare function listenPanel(server: http.Server, { host, port }?: {
    host?: string;
    port?: number;
}): Promise<number>;
/**
 * `dsh-ops panel`: print the loopback URL and serve until the process is stopped.
 * A directory without a report is still served: the page keeps its drag/select
 * flow, and the command says why it is empty instead of failing.
 * @param {PanelCommandOptions} [options] - directory and port.
 * @returns {Promise<number>} never resolves while the server is running; rejects when it cannot start.
 */
export declare function commandPanel({ dir, port }?: PanelCommandOptions): Promise<number>;
