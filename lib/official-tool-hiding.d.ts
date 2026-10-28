/** Per-tool replacement through the host's scoped restriction and guard APIs.
 * Only explicit reviewed selections are masked. Missing selected counterparts
 * block the affected scope and restore its official tools until readiness returns.
 */
import type { Context } from './adapter/dsh/types.js';
export { resolveHidingConfig } from './config.js';
export declare const name = "dsh-ops-hide-official";
export declare function apply(root: Context, raw?: unknown): void;
