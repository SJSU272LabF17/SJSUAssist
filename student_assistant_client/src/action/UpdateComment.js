
export const UPDATE_COMMENT_ISSUES='UPDATE_COMMENT_ISSUES';

export function updatecomment(data) {
    return {
        type: 'UPDATE_COMMENT_ISSUES',
        data,
    };
}