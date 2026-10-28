/** One enhanced built-in preset. The row publishes OPS only for sessions of that preset. */
import type { Context } from '../../adapter/dsh/types.js';
export declare const name = "dsh-ops-mode-ptc";
export declare const Config: import("../../settings/schema.js").Descriptor & {
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
export declare function apply(ctx: Context, config: unknown): void;
