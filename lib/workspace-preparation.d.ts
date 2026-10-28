import type { Context } from './adapter/dsh/types.js';
import type { SandboxExecutionPolicy } from './adapter/dsh/types.js';
import type { SpawnOptionsWithStdioTuple, StdioNull, StdioPipe } from 'node:child_process';
export declare function prepareWorkspace(policy: Pick<SandboxExecutionPolicy, 'mode' | 'workspaceRoot'> | undefined, { platform, run }?: {
    platform?: NodeJS.Platform;
    run?: (root: string) => void | Promise<void>;
}): Promise<void>;
/** Safety net only: the root DACL write no longer scales with workspace size (#43). */
export declare const PREPARATION_TIMEOUT_MS = 120000;
/** Name the cause of a failed preparation run, so a policy, a folder and an executor problem read differently (#66). */
export declare function classifyPreparationFailure(output: string, { root, script: file }?: {
    root?: string;
    script?: string;
}): string | undefined;
/**
 * The environment the preparation interpreter is allowed to inherit.
 *
 * `PSModulePath` is dropped rather than passed through, because the interpreter this module
 * hardcodes is Windows PowerShell 5.1 while a DSH host normally runs under PowerShell 7. Starting
 * up, pwsh 7 publishes its own module directories into the variable — `<ProgramFiles>\PowerShell\7\
 * Modules` among them — and `Microsoft.PowerShell.Security` exists in both trees. 5.1 reads the
 * variable in order, resolves the .NET Core copy first, fails to load it (its extended type data
 * collides with the inbox copy already loaded), and is left with neither `Get-Acl` nor `Set-Acl`.
 * `bin/prepare-workspace.ps1` then dies at its first cmdlet with `CommandNotFoundException`, before
 * it inspects or writes a single ACL, and every shell tool fails behind it. With the variable
 * absent, 5.1 rebuilds its own default path from `$PSHOME\Modules` plus the machine and user values,
 * and the inbox module loads.
 *
 * Only that one variable is removed: PATH, SystemRoot and DSH_HOME are the child's own inputs and
 * stay exactly as the host set them.
 * @param {NodeJS.ProcessEnv} [source] - the environment to derive from.
 * @returns {NodeJS.ProcessEnv} a copy without the inherited module search path.
 */
export declare function preparationEnvironment(source?: NodeJS.ProcessEnv): {
    [key: string]: string | undefined;
};
/**
 * The exact spawn specification the preparation interpreter is launched with.
 *
 * Extracted as a pure function so the **call site** is directly assertable: an assertion on
 * `preparationEnvironment()` alone cannot catch a regression that passes `process.env` straight to
 * `spawn` — verified by mutation, which the earlier suite did not catch (nothing covered the spawn
 * arguments).
 * @param {string} root - the authoritative workspace root.
 * @returns {{executable: string, args: string[], options: object}}
 */
export declare function preparationSpawnSpec(root: string): {
    executable: string;
    args: string[];
    options: SpawnOptionsWithStdioTuple<StdioNull, StdioPipe, StdioPipe>;
};
export declare function runPreparation(root: string, { executable, args, timeoutMs }?: {
    executable?: string;
    args?: string[];
    timeoutMs?: number;
}): Promise<void>;
export declare function mountWorkspacePreparation(root: Context): void;
