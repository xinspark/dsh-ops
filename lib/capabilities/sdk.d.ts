import type { JsonSchemaNode } from '../adapter/dsh/types.js';
import type { ParameterSchema } from './types.js';
export declare const SDK_PARAMETERS: ParameterSchema;
export declare const SDK_OUTPUT: JsonSchemaNode;
export declare const SDK_CAPABILITIES: readonly Readonly<{
    readonly rawName: "load_sdk";
    readonly component: "ptc";
    readonly presentations: readonly ["ptc"];
    readonly availability: "resident";
    readonly ptcAvailability: "resident";
    readonly mutates: false;
    readonly concurrencySafe: false;
    readonly parameters: ParameterSchema;
    readonly output: JsonSchemaNode;
    readonly description: "Load 1-5 named OPS APIs into this agent’s typed SDK on the next model step. The current run_code snapshot cannot call newly requested APIs. No file operation runs here. Native/both presentations do not expose this loader.";
}>[];
