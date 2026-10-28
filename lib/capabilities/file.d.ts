/** File capability data; no host services or registration side effects. */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
export declare const PARAMETERS: Readonly<{
    read_files: ParameterSchema;
    inspect_local_file: ParameterSchema;
    glob: ParameterSchema;
    grep: ParameterSchema;
    stat: ParameterSchema;
    diff: ParameterSchema;
    write_file: ParameterSchema;
    edit_file: ParameterSchema;
    copy: ParameterSchema;
    move: ParameterSchema;
    remove: ParameterSchema;
    replace: ParameterSchema;
    read_pdf: ParameterSchema;
    read_docx: ParameterSchema;
    read_table: ParameterSchema;
}>;
export declare const OUTPUT: JsonSchemaNode;
export declare const READ_FILES_OUTPUT: JsonSchemaNode;
export declare const SEARCH_OUTPUT: JsonSchemaNode;
/** Every projection declares the same canonical execution shape. */
export declare function fileOutput(rawName: keyof typeof PARAMETERS): JsonSchemaNode;
export declare const DESCRIPTIONS: Readonly<{
    read_files: "Read UTF-8 ranges relative to session cwd. Check each file complete/error; nextOffset continues lines, nextIndex resumes pending files. Binary needs a binary reader. Failures return status:error|rejected and error.code; never throw.";
    inspect_local_file: string;
    glob: string;
    grep: string;
    stat: string;
    diff: string;
    write_file: string;
    edit_file: string;
    copy: string;
    move: string;
    remove: string;
    replace: string;
    read_pdf: "Read bounded PDF 1.3-1.7 page text and individual runs relative to session cwd. Restricted classic-xref PDFs with standard Helvetica/Courier/Times Type1 fonts and Standard/WinAnsi encoding only. Scope is text-layer content order; excludes rendered reading order, images/OCR, annotations/forms and metadata. Unsupported or malformed later pages retain preceding complete pages with error/nextAction. Check scanComplete versus pageComplete; total/revision require a stable full scan. 16 MiB input and aggregate decoded/processed streams, 1 MiB/page, 32 pages, 30s. Page offsets cannot bypass physical gaps; compare revisions across calls. Failures return status:error|rejected and error.code; never throw.";
    read_table: "Read bounded CSV/TSV lexical string cells relative to session cwd. Preserves quoted multiline records and physical LF lineStart/lineEnd. Check scanComplete versus pageComplete; total/revision exist only after a stable full scan. Up to 32 MiB, 100000 data records, 1 MiB/record, 1024 columns and 30s; row paging cannot bypass scan gaps. Errors retain safe preceding rows with nextAction. Compare revisions before combining rescanned pages. No spreadsheet formulas or type coercion. Failures return status:error|rejected and error.code; never throw.";
    read_docx: "Read bounded DOCX main-body paragraphs relative to session cwd, preserving Unicode text and table/row/cell coordinates. Scope excludes layout, headers/footers, notes, comments and metadata; complete applies only to that scope. Standard stored/deflated ZIP, strict UTF-8/BOM UTF-16; unsupported content and parse errors retain safe preceding paragraphs with nextAction. Check scanComplete versus pageComplete; total/revision require a stable full scan. 32 MiB archive, 8 MiB main XML, 1 MiB/paragraph, 100000 paragraphs, 30s. Paging cannot bypass physical gaps; compare revisions across calls. No binary DOC, macros, external fetch or extraction to disk. Failures return status:error|rejected and error.code; never throw.";
}>;
