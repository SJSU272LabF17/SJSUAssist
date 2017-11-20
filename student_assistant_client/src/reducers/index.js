
import {combineReducers} from 'redux';
import Openissues from './openissues-reducer';

const allReducers = combineReducers({

    //insert reducer name here to combine
    openissues :Openissues

});

export default allReducers;