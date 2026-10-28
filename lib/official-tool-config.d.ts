import type { OfficialReplacement } from './official-tool-catalog.js';
export interface HidingConfig {
    replaceTools: OfficialReplacement[];
}
export declare function resolveHidingConfig(raw?: unknown): HidingConfig;
