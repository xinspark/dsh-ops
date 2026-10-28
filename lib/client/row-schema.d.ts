/**
 * The single row's page, exactly as the maintainer specified it.
 *
 * Two bundle switches, four switches per preset, and one card for the three
 * opt-in features. Every switch is addressed by a path (`[section, key]`) so the
 * three opt-in switches can share one card while still writing their own section.
 */
import type { SettingsPathOpView } from '../adapter/dsh/types.js';
import type { Translator } from './locales.js';
/** A key of the OPS locale namespace. */
export type LocaleKey = Parameters<Translator>[0];
/** One editable switch. */
export interface FieldSpec {
    readonly path: readonly [string, string];
    readonly label: LocaleKey;
    readonly hint?: LocaleKey;
    /** Bundle switch that must be on for this field to apply. */
    readonly gatedBy?: BundleGate;
}
/** One bundle switch name, for the page's gating hints. */
export type BundleGate = 'bash' | 'hidePwsh' | 'hideOfficialTools' | 'dynamicTools';
/** One page group. */
export interface GroupSpec {
    readonly id: string;
    readonly label: LocaleKey;
    readonly hint?: LocaleKey;
    /** Groups with a toggle carry their own enable switch as `[id, enabled]`. */
    readonly toggle: boolean;
    readonly fields: readonly FieldSpec[];
}
/** The row id the single bundle row declares. */
export declare const ROW_ID = "dsh-ops";
/** Draft values, keyed by `section.key`. */
export type RowDraft = Record<string, boolean>;
/** The two bundle switches. */
export declare const GLOBAL: readonly FieldSpec[];
/** Every group, in page order. */
export declare const GROUPS: readonly GroupSpec[];
/** The draft key of one switch. */
export declare const flatKey: (path: readonly [string, string]) => string;
/**
 * Read the page values out of the raw saved config.
 * @param raw - the host-provided saved values.
 * @returns one value per switch.
 */
export declare function readRowValues(raw: Record<string, unknown>, options?: {
    pwsh7Installed?: boolean;
}): RowDraft;
/**
 * The bundle switches as the draft holds them.
 * @param draft - the current page values.
 * @returns the gate each preset's gated switches are checked against.
 */
export declare function bundleGates(draft: RowDraft): Record<BundleGate, boolean>;
/**
 * The nested write operations that turn the saved values into the draft.
 * @param draft - the current page values.
 * @param raw - the saved values the draft was read from.
 * @returns path operations for `form.mutate`.
 */
export declare function changedFields(draft: RowDraft, raw: Record<string, unknown>): SettingsPathOpView[];
