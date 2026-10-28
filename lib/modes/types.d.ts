/**
 * The built-in DSH agent presets OPS can enhance.
 *
 * One mode row exists per preset: enabling it makes OPS publish its surface for
 * sessions composed from that preset and, unless Compatibility mode is on, hide
 * the official tools that surface replaces.
 */
export declare const MODE_IDS: readonly ["minimal", "standard", "ptc", "cordis"];
/** One enhanced built-in preset. */
export type ModeId = typeof MODE_IDS[number];
/** The agent-preset id each mode enhances; the preset ids are the built-in ids. */
export declare const MODE_PRESET: Readonly<Record<ModeId, string>>;
/** The preset a minimal-mode session uses even when the Minimal row is off. */
export declare const MINIMAL_PRESET: string;
