/** Document schemas describe their bounded observation scope; registration remains catalogue-owned. */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
export declare const DOCUMENT_PARAMETERS: Readonly<{
    read_pdf: ParameterSchema;
    read_docx: ParameterSchema;
    read_table: ParameterSchema;
}>;
export declare const DOCUMENT_DESCRIPTIONS: Readonly<{
    read_pdf: "Read bounded PDF 1.3-1.7 page text and individual runs relative to session cwd. Restricted classic-xref PDFs with standard Helvetica/Courier/Times Type1 fonts and Standard/WinAnsi encoding only. Scope is text-layer content order; excludes rendered reading order, images/OCR, annotations/forms and metadata. Unsupported or malformed later pages retain preceding complete pages with error/nextAction. Check scanComplete versus pageComplete; total/revision require a stable full scan. 16 MiB input and aggregate decoded/processed streams, 1 MiB/page, 32 pages, 30s. Page offsets cannot bypass physical gaps; compare revisions across calls. Failures return status:error|rejected and error.code; never throw.";
    read_table: "Read bounded CSV/TSV lexical string cells relative to session cwd. Preserves quoted multiline records and physical LF lineStart/lineEnd. Check scanComplete versus pageComplete; total/revision exist only after a stable full scan. Up to 32 MiB, 100000 data records, 1 MiB/record, 1024 columns and 30s; row paging cannot bypass scan gaps. Errors retain safe preceding rows with nextAction. Compare revisions before combining rescanned pages. No spreadsheet formulas or type coercion. Failures return status:error|rejected and error.code; never throw.";
    read_docx: "Read bounded DOCX main-body paragraphs relative to session cwd, preserving Unicode text and table/row/cell coordinates. Scope excludes layout, headers/footers, notes, comments and metadata; complete applies only to that scope. Standard stored/deflated ZIP, strict UTF-8/BOM UTF-16; unsupported content and parse errors retain safe preceding paragraphs with nextAction. Check scanComplete versus pageComplete; total/revision require a stable full scan. 32 MiB archive, 8 MiB main XML, 1 MiB/paragraph, 100000 paragraphs, 30s. Paging cannot bypass physical gaps; compare revisions across calls. No binary DOC, macros, external fetch or extraction to disk. Failures return status:error|rejected and error.code; never throw.";
}>;
export declare const DOCUMENT_FACTS: Record<string, JsonSchemaNode>;
export declare const DOCUMENT_SOURCE: JsonSchemaNode;
export declare function isDocumentTool(tool: string): tool is keyof typeof DOCUMENT_PARAMETERS;
export declare function documentOutput(tool: string): JsonSchemaNode | undefined;
