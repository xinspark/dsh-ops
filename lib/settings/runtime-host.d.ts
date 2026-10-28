import type { Context } from '../adapter/dsh/types.js';
import type { SubprocessRuntime } from '../adapter/dsh/types.js';
import { RuntimeActions } from './runtime-actions.js';
import type { RuntimeProcessRunner } from './runtime-actions.js';
declare module '@deepseek-ai/cordis' {
    interface Context {
        opsSettings: RuntimeActions;
    }
}
export declare function runtimeProcessRunner(subprocess: Pick<SubprocessRuntime, 'spawn'>, env?: NodeJS.ProcessEnv): RuntimeProcessRunner;
export declare function mountRuntimeSettings(root: Context): void;
