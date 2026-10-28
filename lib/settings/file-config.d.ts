export declare const Config: import("./schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: {
                promptPolicy: boolean;
                required: boolean;
                denyCredentialReads: boolean;
            };
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
