// nuitReducer.js

import * as actionTypes from '../constants/actionTypes'

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_NUIT:
      return [
        ...state,
        Object.assign({}, action.nuit)
      ];
      case actionTypes.RESET_NUITS:
          return [];
      default:
            return state;
    }
  };