export declare const Config: import("./schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: Readonly<import("../tui/activity.js").ActivityConfig>;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
