
import {combineReducers} from 'redux';
import Openissues from './openissues-reducer';
import Resolveissue from './resolveisseues - reducer'
import Comment from './comment-reducer';
import UpdateComment from './UpdateComment- Reducer'

const allReducers = combineReducers({

    //insert reducer name here to combine
    openissues :Openissues,
    resolveissue:Resolveissue,
    comment:Comment,
    updatecomment:UpdateComment

});

export default allReducers;