
export const SETOPENISSUES = 'SETOPENISSUES';
export const SETRESOLVEDISSUES = 'SETRESOLVEDISSUES';
export const ADDOPENISSUES = 'ADDOPENISSUES';
export const ADDRESOLVEDISSUES = 'ADDRESOLVEDISSUES';


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

export function addOpenIssues(data) {
    return {
        type: ADDOPENISSUES,
        data,
    };
}

export function addResolvedIssues(data) {
    return {
        type: ADDRESOLVEDISSUES,
        data,
    };
}