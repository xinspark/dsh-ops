/**
 * What each mode contributes to a session of its preset.
 *
 * This table is the product contract between the four mode rows and the shared
 * publication controllers: resident OPS tools, official tools replaced once
 * their OPS counterpart is visible, and whether the mode consumes the advanced
 * file tools through the discovery entry.
 */
import type { OfficialReplacement } from '../capabilities/replacements.js';
import type { ModeId } from './types.js';
/** Raw resident native file capabilities: one per replaced official tool plus the multi-file reader. */
export declare const NATIVE_RESIDENT_RAW: readonly ["inspect_local_file", "glob", "grep", "read_files", "result"];
/** Official Windows shell names the host may publish. Only visible ones are replaced. */
export declare const SHELL_OFFICIAL_NAMES: readonly string[];
/** One mode's publication and replacement policy. */
export interface ModePlan {
    /** Publish the resident native file tools for matching Agents. */
    nativeFiles: boolean;
    /** Official file tools replaced once their OPS counterpart is visible in the same scope. */
    replacements: readonly OfficialReplacement[];
    /** Replace the official Windows shell with ops_bash when the row is on. */
    shell: boolean;
    /** Publish the PTC SDK APIs for matching Agents. */
    ptc: boolean;
    /** Progressive discovery population for matching Agents. */
    discovery: 'none' | 'advanced' | 'all';
    /** The mode's routing section suffix; null publishes no routing text. */
    section: string | null;
}
/** Everything one mode publishes; consumers read this instead of branching on ids. */
export declare const MODE_PLANS: Readonly<Record<ModeId, ModePlan>>;
/**
 * The resident native capability names of one mode.
 * @param mode - the mode to read.
 * @returns public OPS names, or an empty list when the mode publishes no native file tools.
 */
export declare function residentTools(mode: ModeId): readonly string[];
