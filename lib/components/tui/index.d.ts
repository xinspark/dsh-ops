/** Optional read-only panel. Missing tuiPanels leaves only this component pending. */
import type { Context } from '../../adapter/dsh/types.js';
import type { AttentionLevel } from '../../tui/attention.js';
import { resolveActivityConfig } from '../../tui/activity.js';
import { createOpsPanel } from '../../tui/panel.js';
export { Config } from '../../settings/tui-config.js';
export declare const name = "dsh-ops-tui";
export declare const inject: string[];
export { resolveActivityConfig as resolveTuiConfig };
/** Narrow injected API-v1 surface, independent of a host TUI/React installation. */
export interface TuiPanels {
    register(descriptor: {
        apiVersion: 1;
        id: string;
        title: string;
        minColumns: number;
        component: ReturnType<typeof createOpsPanel>;
    }): unknown;
    list(): readonly {
        id: string;
    }[];
    badge(id: string, value: {
        level: AttentionLevel | undefined;
        unread: number;
    } | null): void;
}
export declare function apply(ctx: Context, rawConfig?: unknown): void;
