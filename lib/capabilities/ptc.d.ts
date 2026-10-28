/** Batch and PTC result schemas; the same result capability also owns a Native projection. */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
export declare const PARAMETERS: {
    batch: ParameterSchema;
    result: ParameterSchema;
};
export declare const OUTPUT: JsonSchemaNode;
export declare const DESCRIPTIONS: {
    batch: string;
    result: string;
};
