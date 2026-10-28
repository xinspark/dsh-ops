import { type ModeConfig } from '../modes/config.js';
import { resolveDiscoveryConfig } from '../discovery/config.js';
import { resolvePanelConfig } from '../panel/collect.js';
import { resolveActivityConfig } from '../tui/activity.js';
type DiscoveryConfig = ReturnType<typeof resolveDiscoveryConfig>;
type PanelConfig = ReturnType<typeof resolvePanelConfig>;
type ActivityConfig = ReturnType<typeof resolveActivityConfig>;
/** Preset sections, in page order. */
export declare const MODES: readonly ["minimal", "standard", "ptc", "cordis"];
export type ModeKey = typeof MODES[number];
/** Every section the row accepts. */
export declare const FEATURES: readonly ["minimal", "standard", "ptc", "cordis", "discovery", "panel", "tui", "other"];
export type Feature = typeof FEATURES[number];
/** The two bundle-wide switches. */
export interface GlobalSwitches {
    readonly bash: boolean;
    readonly hidePwsh: boolean;
    readonly hideOfficialTools: boolean;
    readonly dynamicTools: boolean;
}
/** One section as the row runs it. */
export interface FeatureState<T = Record<string, unknown>> {
    readonly enabled: boolean;
    readonly config: T;
    /** The section's own keys, when the input still carried them. */
    readonly raw?: Record<string, unknown>;
}
/** The resolved configuration of the single row. */
export interface MergedConfig {
    readonly global: GlobalSwitches;
    readonly minimal: FeatureState<ModeConfig>;
    readonly standard: FeatureState<ModeConfig>;
    readonly ptc: FeatureState<ModeConfig>;
    readonly cordis: FeatureState<ModeConfig>;
    readonly discovery: FeatureState<DiscoveryConfig>;
    readonly panel: FeatureState<PanelConfig>;
    readonly tui: FeatureState<ActivityConfig>;
    readonly other: FeatureState<{
        pwsh7Link: boolean;
    }>;
}
/**
 * Validate the whole row configuration.
 * @param raw - the Loader row's config.
 * @returns every section, enabled or not, with its own validated slice.
 * @throws ConfigError naming the section and key that failed.
 */
export declare function resolveMergedConfig(raw?: unknown): MergedConfig;
/**
 * One mode's slice with the bundle gates applied.
 * @param state - the mode's own section.
 * @param global - the bundle-wide switches.
 * @returns keys safe to hand the component module.
 */
export declare function effectiveMode(state: FeatureState<ModeConfig>, global: GlobalSwitches, pwsh7Link?: boolean): Record<string, unknown>;
/** Whether this mode's sessions receive the discovery entry. */
export declare function dynamicForMode(state: FeatureState<ModeConfig>, global: GlobalSwitches): boolean;
/**
 * The row's own keys, as the Loader hands them to apply.
 * @param value - a raw or already-validated row config.
 * @returns the config with every section's keys preserved.
 */
export declare function hostConfig(value: unknown): Record<string, unknown>;
/** The host settings descriptor of the single row. */
export declare const Config: import("./schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: Record<string, unknown>;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
export {};
