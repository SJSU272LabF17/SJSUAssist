
import {combineReducers} from 'redux';
import Openissues from './openissues-reducer';
import Resolveissue from './resolveisseues - reducer'
import skillset from './setskills_reducer';
import handleUserIssues from './userissues_reducer';
import Comment from './comment-reducer'

const allReducers = combineReducers({

    //insert reducer name here to combine
    openissues : Openissues,
    resolveissue : Resolveissue,
    skillset : skillset,
    userIssues : handleUserIssues,
    comment:Comment
});

export default allReducers;