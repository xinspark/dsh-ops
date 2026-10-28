import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
/** Reviewed, currently implemented advanced operations. Future formats are absent. */
export declare const DISCOVERY_TERMS: Readonly<{
    read_pdf: "pdf portable document pages text extraction font";
    read_docx: "docx word document paragraphs body text tables zip xml unicode";
    read_table: "table csv tsv delimiter quoted records columns rows encoding utf16";
    inspect_local_file: "read inspect single file text hex binary bounded line windows";
    result: "result reference page release stored output continuation";
    glob: "glob find search file paths patterns";
    grep: "grep search content regex matching text count summary";
    replace: "batch literal text replacement across files";
    write_file: "write create overwrite full file content atomic revision cas";
    edit_file: "edit patch unique text atomic revision cas";
    diff: "diff preview compare proposed file content";
    stat: "stat metadata revision hash bytes size line count";
    copy: "copy duplicate file no clobber revision";
    move: "move rename file no clobber revision";
    remove: "remove delete unlink file revision";
}>;
export declare const DISCOVERY_PARAMETERS: ParameterSchema;
export declare const DISCOVERY_DESCRIPTION = "Select allowed OPS capabilities for the next model step in this scope; no file action.";
export declare const DISCOVERY_OUTPUT: JsonSchemaNode;
