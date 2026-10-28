/**
 * The remedy a failed spawn of the plugin's own bash deserves.
 *
 * It lives apart from `lib/shells/publish.js` so that the tool definition
 * (`lib/shells/tool.js`) can render a spawn failure without importing the module
 * that publishes the tool. Those two used to import each other; a definition and
 * its publisher in one cycle is a load-order question nobody should have to
 * answer twice, so the remedy sits below both of them.
 *
 * @module dsh-ops/shells/spawn-error
 */
/**
 * Convert an infrastructure spawn failure into a concise model-facing result.
 *
 * Only ENOENT is source-routed: it is the one failure that means "this exact
 * executable vanished", and what to do about it depends entirely on which rung
 * supplied it. Every other spawn failure keeps the plain message, because the
 * rung is not the interesting part of it.
 * @param {unknown} error - the failure `ctx.subprocess.spawn` raised.
 * @param {string} file - the executable the rung resolved.
 * @param {string} source - where that executable came from.
 * @param {string} [workdir] - the directory the spawn was told to run in.
 * @returns {string} the model-facing error text.
 */
export declare function formatBashSpawnError(error: unknown, file: string, source: string, workdir?: string): string;
