
export const COMMENT_ISSUES='COMMENT_ISSUES';

export function comment(data) {
    return {
        type: 'COMMENT_ISSUES',
        data,
    };
}