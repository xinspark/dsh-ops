/** Search external metadata only; selecting never calls availability or authorization actions. */
import type { Provider } from './providers.js';
export declare function searchProviders(query: string, pool: Provider[], maximum: number): Provider[];
