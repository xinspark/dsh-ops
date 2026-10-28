/**
 * Locating a Rust toolchain and running a release build of a crate.
 *
 * The native worker is a Rust executable, so a source checkout needs one
 * explicit, reproducible build step (`dsh-ops build-ptc`). This module owns it:
 * find `cargo` without guessing, run the release build, and report the exact
 * toolchain that produced the binary.
 *
 * @module dsh-ops/rust
 */
export interface CargoDiscoveryOptions {
    env?: NodeJS.ProcessEnv;
    platform?: string;
}
export interface CargoToolchain {
    file: string;
    source: string;
    version: string;
    env: NodeJS.ProcessEnv;
}
export interface CargoBuildOptions {
    cargo: Pick<CargoToolchain, 'file' | 'env'>;
    sourceDir: string;
    extraArgs?: readonly string[];
    onLine?: (line: string) => void;
}
export interface CargoBuildResult {
    code: number;
    output: string;
}
/** Environment variable that names the `cargo` executable to use. */
export declare const CARGO_ENV = "DSH_OPS_CARGO";
/** Error raised when no usable Rust toolchain is found. */
export declare class CargoNotFoundError extends Error {
    readonly tried: string[];
    /**
     * @param {string} message - the failure summary.
     * @param {string[]} tried - every candidate considered.
     */
    constructor(message: string, tried: string[]);
}
/**
 * Find a working `cargo`.
 *
 * `DSH_OPS_CARGO` is authoritative: when it names something unusable the search
 * fails instead of silently building with a different toolchain.
 * @param {object} [options] - discovery inputs.
 * @param {NodeJS.ProcessEnv} [options.env] - the environment to read.
 * @param {string} [options.platform] - `process.platform`.
 * @returns {{file: string, source: string, version: string, env: NodeJS.ProcessEnv}} the toolchain.
 * @throws {CargoNotFoundError} when no usable `cargo` is found.
 */
export declare function findCargo({ env, platform }?: CargoDiscoveryOptions): CargoToolchain;
/**
 * Run `cargo build --release` over one crate, streaming its output to the
 * caller's terminal.
 * @param {object} options - build inputs.
 * @param {object} options.cargo - the toolchain from {@link findCargo}.
 * @param {string} options.sourceDir - the crate to build (the directory holding its `Cargo.toml`).
 * @param {string[]} [options.extraArgs] - additional cargo arguments.
 * @param {(line: string) => void} [options.onLine] - receives each output line.
 * @returns {Promise<{code: number, output: string}>} the exit code and everything cargo wrote.
 */
export declare function cargoBuild(options: CargoBuildOptions): Promise<CargoBuildResult>;
