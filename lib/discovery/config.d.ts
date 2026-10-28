import { DISCOVERY_TERMS } from '../capabilities/discovery.js';
export type DiscoverableName = keyof typeof DISCOVERY_TERMS;
export interface DiscoveryConfig {
    enabled: boolean;
    maxResults: number;
    allowedTools: DiscoverableName[];
    alwaysLoaded: DiscoverableName[];
    binaryPath?: string;
    required: boolean;
    denyCredentialReads: boolean;
}
export declare const DISCOVERABLE_TOOLS: readonly ("replace" | "read_pdf" | "read_docx" | "read_table" | "inspect_local_file" | "result" | "glob" | "grep" | "write_file" | "edit_file" | "diff" | "stat" | "copy" | "move" | "remove")[];
export declare const DISCOVERY_CONFIG_KEYS: readonly ["enabled", "maxResults", "allowedTools", "alwaysLoaded", "binaryPath", "required", "denyCredentialReads"];
export declare function resolveDiscoveryConfig(raw?: unknown): DiscoveryConfig;
