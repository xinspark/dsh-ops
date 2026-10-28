import type { ToolDefinition } from '../adapter/dsh/types.js';
import type { FileToolName } from '../capabilities/registry.js';
import { PARAMETERS, DESCRIPTIONS, OUTPUT } from '../capabilities/file.js';
export { FILE_TOOLS } from '../capabilities/registry.js';
export { PARAMETERS, DESCRIPTIONS, OUTPUT };
/** Drop unused empty placeholders strict adapters send for optional fields; never mutate the caller's object. */
export declare function normalizeArguments(rawName: string, args: unknown): unknown;
export declare function definition(rawName: FileToolName, execute: ToolDefinition['execute']): ToolDefinition;
