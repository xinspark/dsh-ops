/**
 * The detail-page status section: the one card a row's or the bundle's page gets.
 *
 * It reports only what the Host actually answered. The runtime snapshot exists
 * today; per-row tool-suppression facts do not, so a row without runtime facts
 * renders nothing instead of inventing a green status. A disabled bundle or row
 * renders nothing at all, matching the proposal in issue #462.
 */
import type { PluginDetailProps } from '../adapter/dsh/types.js';
import type { RuntimeRemote, RuntimeSnapshot } from '../settings/runtime-contract.js';
import type { Translator } from './locales.js';
/** The host installer surface this page uses (a subset of `pluginManager`). */
export interface PluginInstaller {
    listPlugins(): Promise<unknown>;
    /** The host requires the options object as a second argument, even when empty. */
    installBundle(spec: string, options?: Record<string, unknown>): Promise<unknown>;
    /** Optional: resolve the spec first, so the preview can name the version. */
    inspect?(spec: string): Promise<unknown>;
}
/** One labelled fact of the status card. */
export interface StatusFact {
    readonly label: string;
    readonly value: string;
}
/** The status card content, derived from a snapshot alone. */
export interface StatusView {
    readonly summary: string;
    readonly facts: readonly StatusFact[];
    readonly note: string;
}
/**
 * Map a runtime snapshot onto the facts an operator can verify.
 * @param snapshot - the Host answer, or undefined before the first one.
 * @param t - the row's locale.
 * @returns the fact list and the footnote.
 */
export declare function statusView(snapshot: RuntimeSnapshot | undefined, t: Translator): StatusView;
/** Translate the host's invariant plan lines, keeping any line this page cannot parse. */
export declare function planLine(line: string, t: Translator): string;
/** Whether this subject has a status section at all. */
export declare function hasStatus(subject: PluginDetailProps['subject']): boolean;
/**
 * The `plugins.detail.section` contribution.
 * @param props - the page subject, its translator and the runtime remote.
 * @returns the section, or null on a page it has nothing for.
 */
export declare function DiagnosticsSection(props: PluginDetailProps & {
    t: Translator;
    api: RuntimeRemote;
    plugins?: PluginInstaller;
}): import("react/jsx-runtime").JSX.Element | null;
