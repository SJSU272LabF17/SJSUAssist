import {SETOPENISSUES, SETRESOLVEDISSUES, ADDOPENISSUES, ADDRESOLVEDISSUES} from '../action/userissues';

const initial_state = {
    openIssues : [],
    resolvedIssues : []
};

const setOpenIssues = (state, action) => {
    console.log(state);
    console.log(action);
    // state.openIssues.push(action.data);
    // console.log("Open Issues After Adding: ");
    // console.log(state);
    return {
        ...state,
        openIssues : action.data
    }
};

const setResolvedIssues = (state, action) => {
    console.log(state);
    console.log(action);
    // state.resolvedIssues.push(action.data);
    // console.log("Resolved Issues After Adding: ");
    // console.log(state);
    return {
        ...state,
        resolvedIssues : action.data
    }
};

const addOpenIssues = (state, action) => {
    console.log(state);
    console.log(action);
    state.openIssues.push(action.data);
    console.log("Open Issues After Adding: ");
    console.log(state);
    return {
        ...state,
        [action.openIssues]: state.openIssues
    }
};

const addResolvedIssues = (state, action) => {
    console.log(state);
    console.log(action);
    // state.resolvedIssues.push(action.data);
    // console.log("Resolved Issues After Adding: ");
    // console.log(state);
    return {
        ...state,
        resolvedIssues : action.data
    }
};

const handleUserIssues = (state = initial_state, action)=>
{
    switch (action.type) {
        case SETOPENISSUES :
            return setOpenIssues(state, action);
        case SETRESOLVEDISSUES :
            return setResolvedIssues(state, action);
        case ADDOPENISSUES :
            return addOpenIssues(state, action);
        case ADDRESOLVEDISSUES :
            return addResolvedIssues(state, action);
        default :
            return state;
    }
};

export default handleUserIssues;