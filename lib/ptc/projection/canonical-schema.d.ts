/** Typed fields describe canonical data, independently of the Native display projection. */
import type { JsonSchemaNode } from '../../adapter/dsh/types.js';
import type { FileToolName, PtcToolName } from '../../capabilities/registry.js';
export declare function canonicalOutput(tool: FileToolName | PtcToolName): JsonSchemaNode;
