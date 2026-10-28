/** PTC-only typed projection over the shared capability catalogue and canonical worker. */
import type { ToolDefinition } from '../adapter/dsh/types.js';
import { PTC_TOOLS } from '../capabilities/registry.js';
import type { FileToolName, PtcToolName } from '../capabilities/registry.js';
import { PARAMETERS, DESCRIPTIONS, OUTPUT } from '../capabilities/ptc.js';
export { PTC_TOOLS, PARAMETERS, DESCRIPTIONS, OUTPUT };
export declare const PTC_API_TOOLS: readonly ("replace" | "read_pdf" | "read_docx" | "read_table" | "inspect_local_file" | "result" | "glob" | "grep" | "write_file" | "edit_file" | "diff" | "stat" | "copy" | "move" | "remove" | "read_files" | "batch")[];
export declare const PTC_SECTION = "dsh-ops:repository-tooling:mode-ptc";
export declare function definition(tool: FileToolName | PtcToolName, execute: ToolDefinition['execute']): ToolDefinition;
