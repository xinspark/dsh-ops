/** Strict PE import redirection, never patch executable instructions or original package bytes. */
export declare function patchMsys(bytes: Uint8Array): {
    bytes: Buffer<ArrayBuffer>;
    exports: Record<string, string[]>;
};
export declare function proxyDefinition(names: readonly string[], dll: string): string;
