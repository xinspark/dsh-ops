export { PTC_RESIDENT_TOOLS } from '../capabilities/registry.js';
import type { FileToolName, PtcToolName } from '../capabilities/registry.js';
export type ApiName = FileToolName | PtcToolName;
export declare const PTC_LOADABLE_TOOLS: readonly ApiName[];
export interface PtcConfig {
    binaryPath?: string;
    required: boolean;
    allowedTools: ApiName[];
    alwaysLoaded: ApiName[];
}
export declare function parsePtcConfig(raw?: unknown): PtcConfig;
