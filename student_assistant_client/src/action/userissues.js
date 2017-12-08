
export const SETOPENISSUES = 'SETOPENISSUES';
export const SETRESOLVEDISSUES = 'SETRESOLVEDISSUES';

export function setOpenIssues(data) {
    return {
        type: SETOPENISSUES,
        data,
    };
}

export function setResolvedIssues(data) {
    return {
        type: SETRESOLVEDISSUES,
        data,
    };
}