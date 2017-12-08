import {SETOPENISSUES, SETRESOLVEDISSUES} from '../action/userissues';

const initial_state = {
    openIssues : [],
    resolvedIssues : []
};

const setOpenIssues = (state, action) => {
    console.log(state);
    console.log(action);
    state.openIssues.push(action.data);
    console.log("Open Issues After Adding: ");
    console.log(state);
    return {
        ...state,
        openIssues : state.openIssues
    }
};

const setResolvedIssues = (state, action) => {
    console.log(state);
    console.log(action);
    state.resolvedIssues.push(action.data);
    console.log("Resolved Issues After Adding: ");
    console.log(state);
    return {
        ...state,
        resolvedIssues : state.resolvedIssues
    }
};

const handleUserIssues = (state = initial_state, action)=>
{
    switch (action.type) {
        case SETOPENISSUES :
            return setOpenIssues(state, action);
        case SETRESOLVEDISSUES :
            return setResolvedIssues(state, action);
        default :
            return state;
    }
};

export default handleUserIssues;