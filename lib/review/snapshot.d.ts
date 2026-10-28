import { type Runner } from './process.js';
export interface SnapshotInput {
    repo: string;
    prs: number[];
    base?: string;
    workflow?: string;
    checkout?: string;
}
export declare function validateSnapshot(input: SnapshotInput): SnapshotInput & {
    base: string;
    workflow: string;
};
/** Every request is fresh; memoization only shares identical reads within this invocation. */
export declare function reviewSnapshot(input: SnapshotInput, run?: Runner): Promise<{
    version: number;
    status: string;
    repo: string;
    workflow: string;
    observedAt: string;
    base: {
        ci: {
            status: string;
            reason: string;
            conclusion?: undefined;
            event?: undefined;
            headSha?: undefined;
            name?: undefined;
            url?: undefined;
            attempt?: undefined;
            coverage?: undefined;
            jobsTruncated?: undefined;
            jobs?: undefined;
        } | {
            status: string;
            conclusion: string | null;
            event: "push" | "pull_request";
            headSha: string;
            name: string;
            url: string;
            attempt: unknown;
            coverage: string;
            jobsTruncated: boolean;
            jobs: {
                name: string;
                status: string;
                conclusion: string | null;
            }[];
            reason?: undefined;
        };
        error?: string | undefined;
        ref: string;
        sha: string;
    };
    prs: ({
        number: number;
        title: string;
        url: string;
        author: string;
        state: string;
        draft: boolean;
        reviewDecision: string;
        headSha: string;
        prBaseSha: string;
        prBaseRef: string;
        headRepo: string;
        maintainerCanModify: boolean;
        additions: unknown;
        deletions: unknown;
        changedFiles: unknown;
        files: string[];
        filesTruncated: boolean;
        risks: (string | false)[];
        issues: {
            number: unknown;
            url: string;
            assignees: string[];
            claimStatus: string;
            coverage: string;
            truncated: boolean;
            claims: {
                author: string;
                url: string;
                excerpt: string;
            }[];
        }[];
        issuesTruncated: boolean;
        ci: {
            status: string;
            reason: string;
            conclusion?: undefined;
            event?: undefined;
            headSha?: undefined;
            name?: undefined;
            url?: undefined;
            attempt?: undefined;
            coverage?: undefined;
            jobsTruncated?: undefined;
            jobs?: undefined;
        } | {
            status: string;
            conclusion: string | null;
            event: "push" | "pull_request";
            headSha: string;
            name: string;
            url: string;
            attempt: unknown;
            coverage: string;
            jobsTruncated: boolean;
            jobs: {
                name: string;
                status: string;
                conclusion: string | null;
            }[];
            reason?: undefined;
        };
        merge: import("./merge.js").MergeProbe;
        status?: undefined;
        reason?: undefined;
    } | {
        number: number;
        status: string;
        reason: string;
        title?: undefined;
        url?: undefined;
        author?: undefined;
        state?: undefined;
        draft?: undefined;
        reviewDecision?: undefined;
        headSha?: undefined;
        prBaseSha?: undefined;
        prBaseRef?: undefined;
        headRepo?: undefined;
        maintainerCanModify?: undefined;
        additions?: undefined;
        deletions?: undefined;
        changedFiles?: undefined;
        files?: undefined;
        filesTruncated?: undefined;
        risks?: undefined;
        issues?: undefined;
        issuesTruncated?: undefined;
        ci?: undefined;
        merge?: undefined;
    })[];
    limits: {
        prs: number;
        filesPerPr: number;
        closingIssuesPerPr: number;
        commentsPerIssue: number;
        jobsPerRun: number;
    };
    scope: string;
}>;
export declare function renderSnapshot(value: Awaited<ReturnType<typeof reviewSnapshot>>): string;
