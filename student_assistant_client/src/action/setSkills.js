
export const SETSKILLSET = 'SETSKILLSET';

export function setSkills(data) {
    return {
        type: 'SETSKILLSET',
        data,
    };
}