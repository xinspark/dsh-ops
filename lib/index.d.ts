/** dsh-ops host half. Own registrations only; no @deepseek-ai value imports. */
import type { Context } from './adapter/dsh/types.js';
export { Config } from './settings/merged.js';
export declare const name = "dsh-ops";
type Component = 'shell' | 'file';
export declare function applyComponent(root: Context, rawConfig: unknown, component: Component): void;
export declare function apply(root: Context, rawConfig: unknown): Promise<void>;
