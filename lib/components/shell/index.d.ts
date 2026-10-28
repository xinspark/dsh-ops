import type { Context } from '../../adapter/dsh/types.js';
export declare const name = "dsh-ops-bash & host PowerShell";
export declare const NON_EDITABLE_CONFIG_KEYS: readonly ["configUpdateVersion", "binaryPath", "required", "denyCredentialReads", "serverName", "enableShellTools", "toolCallTimeoutMs"];
export declare const Config: import("../../settings/schema.js").Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: {
                publishBashTool: boolean;
            };
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
export declare function apply(ctx: Context, config: unknown): void;
