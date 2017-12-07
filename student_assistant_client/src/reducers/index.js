
import {combineReducers} from 'redux';
import Openissues from './openissues-reducer';
import Resolveissue from './resolveisseues - reducer'
import Comment from './comment-reducer'

const allReducers = combineReducers({

    //insert reducer name here to combine
    openissues :Openissues,
    resolveissue:Resolveissue,
    comment:Comment

});

export default allReducers;