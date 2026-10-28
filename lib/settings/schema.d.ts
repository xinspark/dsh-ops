/** Public settings descriptors beside the existing strict Standard Schema validators.
 * Settings reads meta.volatile to select editable fields. Keep our own vendor:
 * the loader must remount these components instead of assuming Schemastery refs.
 */
export type Field = {
    type: 'string' | 'boolean' | 'number' | 'array' | 'object';
    meta?: {
        volatile?: boolean;
        description?: string;
    };
    inner?: Field;
    dict?: Record<string, Field>;
};
export interface Descriptor extends Field {
    meta: NonNullable<Field['meta']>;
    inner?: Descriptor;
    dict?: Record<string, Descriptor>;
    toJSON(): Field;
}
export declare const editable: (type: Field["type"], description: string, inner?: Field) => Field;
export declare function settingsConfig<T>(normalize: (value: unknown) => T, fields: Record<string, Field>): Descriptor & {
    '~standard': {
        version: 1;
        vendor: string;
        validate(value: unknown): {
            value: T;
        } | {
            issues: {
                message: string;
            }[];
        };
    };
};
export declare function configObject(value: unknown): Record<string, unknown>;
