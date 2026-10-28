import type { TypertGatewayBinding } from '../adapter/dsh/types.js';
import type { UpgradeProcessResult } from '../shells/pwsh-upgrade.js';
import type { RuntimeAction, RuntimePlan, RuntimeResult, RuntimeSnapshot, RuntimeSelection, BashSource } from './runtime-contract.js';
export type RuntimeProcessRunner = (argv: readonly string[], signal: AbortSignal) => Promise<UpgradeProcessResult>;
export interface RuntimeActionOptions {
    run: RuntimeProcessRunner;
    env?: NodeJS.ProcessEnv;
    platform?: NodeJS.Platform;
    arch?: string;
    now?: () => number;
}
export declare class RuntimeActions {
    readonly typertRemote: TypertGatewayBinding<this>;
    private readonly options;
    private readonly plans;
    private readonly lifetime;
    private busy;
    private readonly active;
    constructor(options: RuntimeActionOptions);
    snapshot(): RuntimeSnapshot;
    select(source: BashSource): RuntimeSelection;
    private preview;
    plan(action: RuntimeAction): RuntimePlan;
    execute(id: string, signal: AbortSignal): Promise<RuntimeResult>;
    private executePlan;
    dispose(): Promise<void>;
}
