export type { OfficialReplacement } from './capabilities/replacements.js';
export declare const OFFICIAL_REPLACEMENTS: Readonly<Record<"glob" | "grep" | "read", string>>;
export declare function platformSurface(platform?: string): {
    retainedCommand: string;
    shellDefaultEnabled: boolean;
};
