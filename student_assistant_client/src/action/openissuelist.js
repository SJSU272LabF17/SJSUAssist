
export const UPDATE_ISSUES='UPDATE_ISSUES';

export function getIssue(data) {
    return {
        type: 'UPDATE_ISSUES',
        data,
    };
}