const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const doSignUp = (payload) =>
    fetch (`${api}/signup/doSignUp`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("Error: "+error);
        return error;
    });

export const doLogin = (payload) =>
    fetch(`${api}/login/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getSession = () =>
    fetch(`${api}/login/getSession`, {
        method: 'GET',
        credentials:'include'
    }).then(res => {
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const doLogout = (payload) =>
    fetch(`${api}/login/doLogout`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const getSkillSets = () =>
    fetch(`${api}/users/getskillsets`,{
        method:'GET',
        /*headers: {
            ...headers,
            'Content-Type': 'application/json'
        },*/
        credentials:'include'
        // body: JSON.stringify(payload)
    }).then(res => {return res;})
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const addIssue = (payload) =>
    fetch(`${api}/users/addissue`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(payload),
        credentials:'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;

    });


export const getUserIssues = () =>
    fetch(`${api}/users/getUserIssues`,{
        method:'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include'
        // body: JSON.stringify(payload)
    }).then(res => {return res;})
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const comments = (payload) =>
    fetch (`${api}/resolveissue/comments`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const addcomments = (payload) =>
    fetch (`${api}/resolveissue/addcomments`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const currentissuelist = (payload) =>
    fetch (`${api}/openissues/currentissuelist`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const resolveissue = (payload) =>
    fetch (`${api}/resolveissue/resolveissue`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res.json();
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const changeProfile = (payload) =>
    fetch (`${api}/users/changeProfile`,
        {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const getprofile = () =>
    fetch (`${api}/users/getprofile`, {
        method: 'GET',
        credentials:'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getActivityData = () =>
    fetch (`${api}/users/getActivityData`,
        {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

export const resolveIssue= () =>
    fetch (`${api}/users/resolveIssue`,
        {
            method: 'POST',
            credentials: 'include'
        }).then(res => {
        return res;
    }).catch(error => {
        console.log("Error: " + error);
        return error;
    });

