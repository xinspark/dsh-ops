/** Scoped replacement controller. Missing counterparts always leave official tools available. */
import type { Context } from '../adapter/dsh/types.js';
import type { PublicationGate } from './types.js';
/** Product-independent mapping; publication and replacement remain separate choices. */
export interface ReplacementPublication {
    id: string;
    targets: ReadonlyMap<string, string>;
    gate: PublicationGate;
    keepOfficial(): boolean;
}
/** Hide only ready replacements. All registrations and guards follow the row lifetime. */
export declare function mountReplacements(root: Context, publication: ReplacementPublication): void;
