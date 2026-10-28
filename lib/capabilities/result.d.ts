/** Shared stored-reference wire metadata and the Native projection of the result capability. */
import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
export declare const STORAGE_REFERENCE: JsonSchemaNode;
export declare const RESULT_PAGE_PARAMETERS: {
    root: {
        description: string;
        type?: import("../adapter/dsh/types.js").JsonSchemaType;
        oneOf?: JsonSchemaNode[];
        properties?: Record<string, JsonSchemaNode>;
        required?: string[];
        additionalProperties?: boolean;
        items?: JsonSchemaNode;
        enum?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar[];
        const?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar;
        title?: string;
        default?: import("@deepseek-ai/dsh-util-values").JsonValue;
        examples?: import("@deepseek-ai/dsh-util-values").JsonValue;
    };
    id: {
        description: string;
        type?: import("../adapter/dsh/types.js").JsonSchemaType;
        oneOf?: JsonSchemaNode[];
        properties?: Record<string, JsonSchemaNode>;
        required?: string[];
        additionalProperties?: boolean;
        items?: JsonSchemaNode;
        enum?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar[];
        const?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar;
        title?: string;
        default?: import("@deepseek-ai/dsh-util-values").JsonValue;
        examples?: import("@deepseek-ai/dsh-util-values").JsonValue;
    };
    offset: {
        description: string;
        type?: import("../adapter/dsh/types.js").JsonSchemaType;
        oneOf?: JsonSchemaNode[];
        properties?: Record<string, JsonSchemaNode>;
        required?: string[];
        additionalProperties?: boolean;
        items?: JsonSchemaNode;
        enum?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar[];
        const?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar;
        title?: string;
        default?: import("@deepseek-ai/dsh-util-values").JsonValue;
        examples?: import("@deepseek-ai/dsh-util-values").JsonValue;
    };
    limit: {
        description: string;
        type?: import("../adapter/dsh/types.js").JsonSchemaType;
        oneOf?: JsonSchemaNode[];
        properties?: Record<string, JsonSchemaNode>;
        required?: string[];
        additionalProperties?: boolean;
        items?: JsonSchemaNode;
        enum?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar[];
        const?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar;
        title?: string;
        default?: import("@deepseek-ai/dsh-util-values").JsonValue;
        examples?: import("@deepseek-ai/dsh-util-values").JsonValue;
    };
    maxBytes: {
        description: string;
        type?: import("../adapter/dsh/types.js").JsonSchemaType;
        oneOf?: JsonSchemaNode[];
        properties?: Record<string, JsonSchemaNode>;
        required?: string[];
        additionalProperties?: boolean;
        items?: JsonSchemaNode;
        enum?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar[];
        const?: import("@deepseek-ai/dsh-tools").JsonSchemaScalar;
        title?: string;
        default?: import("@deepseek-ai/dsh-util-values").JsonValue;
        examples?: import("@deepseek-ai/dsh-util-values").JsonValue;
    };
    fields: {
        type: "array";
        description: string;
        items: JsonSchemaNode;
    };
    equals: {
        type: "object";
        description: string;
    };
};
export declare const NATIVE_RESULT_PARAMETERS: ParameterSchema;
export declare const NATIVE_RESULT_DESCRIPTION = "Page or release an owned ref:// snapshot. No put, audit IDs, or business writes. root defaults to current session cwd; pass the returned root after cwd changes. Page defaults offset=0, limit=64, maxBytes=16384. Follow nextOffset only when all page rows are displayed; page complete never proves the source operation complete. equals filters before fields projection; offsets count filtered stored rows, including chunks. Tagged item-json-chunk rows are JSON text fragments: join text in byteOffset order for one index, then parse only after complete=true. References expire with the session or ttlMs and require current authority and producer visibility. Release removes only cached observations. Failures are returned error values.";
