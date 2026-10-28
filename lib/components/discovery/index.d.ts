export { name, apply } from '../../discovery/index.js';
export declare const Config: import("../../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: import("../../discovery/config.js").DiscoveryConfig;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
