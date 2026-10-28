import type { DiscoverableName } from './config.js';
export interface DiscoveryRequest {
    query: string;
    maxResults: number;
}
export declare function parseRequest(raw: unknown): DiscoveryRequest | string;
export declare function search(query: string, pool: readonly DiscoverableName[], maximum: number): DiscoverableName[];
