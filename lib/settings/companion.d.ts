/**
 * The companion plugin's installed version, or undefined when it is not installed.
 * @param options - platform, environment and clock, injectable for tests.
 * @returns the version string from the package manifest.
 */
export declare function companionVersion(options?: {
    env?: NodeJS.ProcessEnv;
    now?: () => number;
    sweep?: boolean;
}): string | undefined;
