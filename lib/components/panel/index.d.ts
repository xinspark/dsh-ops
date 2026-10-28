/** Opt-in capture. A disabled row registers nothing and starts no filesystem work. */
import type { Context } from '../../adapter/dsh/types.js';
import { resolvePanelConfig } from '../../panel/collect.js';
export declare const name = "dsh-ops-panel";
export { resolvePanelConfig };
export declare const Config: import("../../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: import("../../panel/types.js").PanelConfig;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
export declare function apply(ctx: Context, rawConfig: unknown): void;
