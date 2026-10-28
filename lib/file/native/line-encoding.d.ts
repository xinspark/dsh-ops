/** One physical source line, with reversible JSON escapes for backslashes and controls.
 * Quotes stay literal because the line is not enclosed in a JSON string. */
export declare function encodeSourceLine(value: string): string;
