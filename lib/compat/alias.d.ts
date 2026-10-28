/** Backward-compatible alias mapping for tool names renamed in 0.4.0.
 *  Old raw names in saved profiles are silently migrated to new names at load time. */
export declare const RENAMED_TOOLS: Readonly<{
    readonly read_many: "read_files";
    readonly edit_many: "edit_file";
    readonly table_read: "read_table";
    readonly doc_read: "read_docx";
    readonly pdf_read: "read_pdf";
    readonly sdk: "load_sdk";
    readonly discover: "discover_tools";
}>;
export type OldRawName = keyof typeof RENAMED_TOOLS;
export type NewRawName = typeof RENAMED_TOOLS[OldRawName];
/** Map a raw name through the rename table; unknown names pass through unchanged. */
export declare function migrateRawName(name: string): string;
/** Migrate an array of raw names, deduplicating after rename. */
export declare function migrateRawNames(names: readonly string[]): string[];
