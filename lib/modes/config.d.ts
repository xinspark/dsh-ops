/**
 * Configuration for a mode row.
 *
 * A mode row carries the file/PTC resolver settings it needs and accepts the
 * compatibility keys older rows used, so one validator owns every accepted key
 * and a malformed row still fails loud and names the offending key.
 */
import { type ResolvedConfig } from '../config.js';
import { type PtcConfig } from '../ptc/config.js';
import { type Field } from '../settings/schema.js';
import type { ModeId } from './types.js';
/** One mode row's resolved configuration. */
export interface ModeConfig extends ResolvedConfig {
    allowedTools: PtcConfig['allowedTools'];
    alwaysLoaded: PtcConfig['alwaysLoaded'];
    /** Publish Bash for this preset's sessions. */
    bash: boolean;
    /** Hide the official Windows shell once Bash replaces it. */
    hidePwsh: boolean;
    /** Hide the official file tools this mode replaces (gated by the bundle switch). */
    hideOfficialTools: boolean;
    /** Publish the discovery entry to this preset's sessions (gated by the bundle switch). */
    dynamicTools: boolean;
}
/** Every key a mode row accepts: the settings each enhanced preset really reads. */
export declare const MODE_CONFIG_KEYS: readonly string[];
/**
 * Validate one mode row's config.
 * @param rawConfig - the loader row's config value.
 * @returns the resolved configuration.
 * @throws ConfigError naming an unknown or malformed key.
 */
export declare function resolveModeConfig(rawConfig?: unknown): ModeConfig;
/**
 * Editable settings fields for one mode row, in the order the host renders them.
 * @param mode - the mode the row enables.
 * @returns field descriptors for the row settings form.
 */
export declare function modeFields(mode: ModeId): Record<string, Field>;
/**
 * The settings descriptor one mode component exports as `Config`.
 * @param mode - the mode the row enables.
 * @returns a settings descriptor that validates with {@link resolveModeConfig}.
 */
export declare function modeConfigForm(mode: ModeId): import("../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: {
                publishBashTool: boolean;
                promptPolicy: boolean;
            };
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
