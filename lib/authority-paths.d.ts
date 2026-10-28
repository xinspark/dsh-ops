/** Resolve only host-owned anchors; caller-selected descendants retain native no-follow checks. */
import type { SandboxExecutionPolicy } from './adapter/dsh/types.js';
export declare function inside(root: string, target: string): boolean;
export declare function canonicalAnchor(root: string): string;
/** Never realpath a model-selected parent or leaf, even if it already exists. */
export declare function anchoredPath(target: string, anchors: readonly string[]): string;
export declare function sessionAnchors(policy: Pick<SandboxExecutionPolicy, 'workspaceRoot'>, cwd?: string): string[];
