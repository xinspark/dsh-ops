import type { Context } from '../../adapter/dsh/types.js';
export declare const name = "dsh-ops-ptc";
export declare const Config: import("../../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: import("../../ptc/config.js").PtcConfig;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
export declare function apply(ctx: Context, config: unknown): void;
