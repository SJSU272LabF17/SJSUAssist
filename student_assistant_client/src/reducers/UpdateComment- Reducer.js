import {UPDATE_COMMENT_ISSUES} from '../action/UpdateComment';

const issues ={};

const comment=(state=issues,action)=>
{
    switch (action.type) {
        case UPDATE_COMMENT_ISSUES :
            state = action.data;
            return state;


        default :
            return state;
    }

}

export default comment;