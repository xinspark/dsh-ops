/** Scoped Native file publication. Callers supply policy; this controller owns lifecycle. */
import type { Context } from '../adapter/dsh/types.js';
import { NativeFileTools } from '../file/runtime.js';
import type { ResolvedConfig } from '../config.js';
import type { PublicationGate } from './types.js';
type ResidentName = Parameters<NativeFileTools['definition']>[0];
/** The names, guidance and eligibility supplied by one composition. */
export interface NativePublication {
    id: string;
    tools: readonly ResidentName[];
    section: string | null;
    gate: PublicationGate;
}
export declare function mountNative(root: Context, config: ResolvedConfig, publication: NativePublication): void;
export {};
