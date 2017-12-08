import {RESOLVE_ISSUES} from '../action/Resolveissue';

const issues = [];

const resolveissues=(state=issues,action)=>
{
    switch (action.type) {
        case RESOLVE_ISSUES :
            state = action.data;
            return state;


        default :
            return state;
    }

}

export default resolveissues;