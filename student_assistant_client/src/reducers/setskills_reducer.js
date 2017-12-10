import {SETSKILLSET} from '../action/setskills';

const skills = [];

const skillset = (state=skills,action)=>
{
    switch (action.type) {
        case SETSKILLSET :
            state = action.data;
            return state;
        default :
            return state;
    }
};

export default skillset;
