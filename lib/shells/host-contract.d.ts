/** DSH 0.2.0-rc.2 shell DTO and rendering, with explicit OPS compatibility fields. */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ShellResult, HostForeground, HostBashResult } from './types.js';
export declare const HOST_BASH_OUTPUT_SCHEMA: JsonSchemaNode;
export declare function hostForeground(value: ShellResult, effects?: 'none' | 'unknown'): HostForeground;
export declare function hostFailure(message: string, timeoutMs?: number, effects?: 'none' | 'unknown', cancelled?: boolean): HostForeground;
export declare function renderHostBash(value: HostBashResult): string;
