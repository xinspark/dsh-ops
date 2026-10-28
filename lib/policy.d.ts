export { FILE_TOOLS, FILE_MUTATIONS, IN_PROCESS_TOOLS } from './capabilities/registry.js';
/** Model-facing routing, kept in one section. No shared registry mutation. */
export declare const TOOLING_SECTION = "dsh-ops:repository-tooling";
export declare const HOST_SHELL_SECTION = "dsh-ops:host-shell-policy";
export declare const SECTION_ORDERS: Readonly<{
    "dsh-ops:repository-tooling": 3250;
}>;
/** Prompt-section suffix and order for one enhanced preset row. */
export declare const MODE_SECTION_ORDERS: Readonly<Record<string, number>>;
/**
 * The prompt section one mode row publishes.
 * @param suffix - the mode section suffix, for example `mode-standard`.
 * @returns the section name.
 */
export declare function modeSectionName(suffix: string): string;
export declare const TOOL_PREFIX = "ops_";
export declare function publicToolName(rawName: string): string;
export declare const BASH_TOOL: string;
/** Resolve the actual command capability, not the presence of a shell executable. */
export declare function ladderLevels({ published, pwsh }: {
    published: Iterable<string>;
    pwsh?: boolean;
}): {
    files: boolean;
    bash: boolean;
    pwsh: boolean;
};
interface ToolingPolicyOptions {
    published?: Iterable<string>;
    mounted?: boolean;
    levels?: {
        files?: boolean;
        bash?: boolean;
        pwsh?: boolean;
    };
    shellComponent?: boolean;
    extraGuidance?: string;
}
/** A single compact table; absent tools never get advertised. */
export declare function renderToolingPolicy({ published, mounted, levels, shellComponent, extraGuidance }: ToolingPolicyOptions): string;
/** Legacy API: no second prompt section. */
export declare function renderHostShellPolicy(): string;
/** Explicit deny policy applies even without an ops command capability. */
export declare function hostShellEnforcement({ shellPolicy }: {
    shellPolicy?: string;
}): {
    hide: boolean;
    reason: undefined;
};
export declare function hostShellRefusal({ toolName, denied }: {
    toolName: string;
    denied: ReadonlySet<string>;
}): {
    kind: string;
    reason: string;
} | undefined;
