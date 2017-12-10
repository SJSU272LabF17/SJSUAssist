import {UPDATE_ISSUES} from '../action/openissuelist';

const issues =[];

const getissues=(state=issues,action)=>
{
    switch (action.type) {
        case UPDATE_ISSUES :
            state = action.data;
            return state;


        default :
            return state;
    }

}

export default getissues;