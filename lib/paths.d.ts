/**
 * Package-wide locations: the installed package root and the DSH home.
 *
 * @module dsh-ops/paths
 */
/** Package root (`lib/`'s parent). */
export declare const PACKAGE_ROOT: string;
/**
 * The DSH home directory this deployment uses.
 * @param {NodeJS.ProcessEnv} [env] - the environment to read.
 * @returns {string} the absolute DSH home.
 */
export declare function dshHome(env?: NodeJS.ProcessEnv): string;
