import type { SubprocessOutputReader } from '../adapter/dsh/types.js';
import type { ShellExecutorOptions, ShellExecutionSpec, ShellCall, ShellExecution, ShellStream } from './types.js';
/** Read the retained stream after settlement, preserving honest truncation facts. */
export declare function settledStream(reader: SubprocessOutputReader | undefined, includeMetadata?: boolean): ShellStream;
/**
 * Start preparation and execution once. The caller owns the returned handle; the host owns
 * process containment, collection and disposal. A job can observe output without consuming it.
 * `onExpiry: none` disables only this executor's deadline, never caller cancellation.
 */
export declare function startBashExecution({ file, source, subprocess, prepareArgv, env, projectResult }: ShellExecutorOptions, spec: ShellExecutionSpec, exec?: ShellCall): ShellExecution;
