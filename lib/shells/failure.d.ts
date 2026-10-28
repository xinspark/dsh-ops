/** Add retry/effect facts without changing the host Bash string error contract. */
import type { OpsErrorPayload } from '../kernel/outcome.js';
import type { ShellResult } from './types.js';
export declare function bashFailure(value: ShellResult, effectState: 'none' | 'unknown'): OpsErrorPayload;
