import { type Runner } from './process.js';
export interface MergeProbe {
    status: 'clean' | 'conflicts' | 'unknown';
    tree?: string;
    files?: string[];
    reason?: string;
}
/** Read only the source object store. All generated objects/config live in a disposable bare repo. */
export declare function probeMerge(checkout: string | undefined, base: string, head: string, signal?: AbortSignal, run?: Runner): Promise<MergeProbe>;
