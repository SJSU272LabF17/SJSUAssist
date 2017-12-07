import {COMMENT_ISSUES} from '../action/Comment';

const issues ={};

const comment=(state=issues,action)=>
{
    switch (action.type) {
        case COMMENT_ISSUES :
            state = action.data;
            return state;


        default :
            return state;
    }

}

export default comment;