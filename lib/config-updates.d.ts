/** Update configuration modification area.
 * Append migrations here; never spread upgrade write-back across components.
 * Markers belong to each owning config row, not a machine-global sentinel.
 * The 0.4 seven-row upgrade is additive bundle composition, not a config rewrite:
 * stable IDs and names preserve saved on/off/config overrides, and the Loader
 * adds discovery from cordis.patch.yml. Never copy the composed tree into a
 * profile or rename dsh-ops/file: name-qualified overrides would be skipped.
 * Explicit legacy panel capture:false is retained; no migration may start capture.
 */
import type { Context } from './adapter/dsh/types.js';
export declare const CONFIG_UPDATE_VERSION = 2;
/** Apply every pending step in order; each step runs exactly once per row. */
export declare function updatedConfig(value?: unknown, disableEvaluatedFallback?: boolean): Record<string, unknown>;
/** Save only this component's raw owning row through the profile config editor.
 *
 * Runtime migration happens synchronously in apply before any executor resolves;
 * this function only records that it ran. The write is submitted through
 * `configEditor.edit()`, which rewrites the **active profile's patch layer** —
 * validating the whole candidate before touching disk, preserving YAML comments
 * and `!!js` expressions outside the replaced value, and serializing with
 * profile changes and HMR.
 *
 * Deliberately **never** `EntryTree.write()` (#91, #108). That API is a
 * whole-composed-tree write-back: it bakes every composed row into the profile
 * root file, which the profile loader documents as an empty entry list that it
 * defensively resets on boot. The stale copy then carries *other* plugins'
 * settings rows — `ui-theme`'s `preference`/`fontSize` above all — so changing
 * the theme or font size echoes the previous value back into the settings scope
 * and the row visibly bounces (dark -> system -> dark). Routing the marker
 * through the patch layer leaves every other row untouched.
 *
 * Errors, and a profile without the editor, degrade to an in-memory migration:
 * the effective config was already derived from `updatedConfig()` in
 * applyComponent, so the runtime stays confined either way and the next
 * activation retries the save. That degradation is #136's behaviour on purpose —
 * it never writes anything, never surfaces an error into the boot path, and never
 * needs an owning row to be correct — while the save itself is #138's channel.
 */
export declare function mountConfigUpdates(ctx: Context, value: unknown): void;
