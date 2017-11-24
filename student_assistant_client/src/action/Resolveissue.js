
export const RESOLVE_ISSUES='RESOLVE_ISSUES';

export function resolveIssue(data) {
    return {
        type: 'RESOLVE_ISSUES',
        data,
    };
}