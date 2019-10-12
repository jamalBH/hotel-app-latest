// index.js

import { combineReducers } from 'redux';
import nuits from './nuitReducer';
import hotels from './hotelReducer';

export default combineReducers({
    hotels: hotels,
    nuits: nuits
});