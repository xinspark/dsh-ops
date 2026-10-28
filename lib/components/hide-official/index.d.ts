import { apply } from '../../official-tool-hiding.js';
export declare const name = "dsh-ops-hide-official";
export { apply };
export declare const Config: import("../../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: import("../../official-tool-config.js").HidingConfig;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
