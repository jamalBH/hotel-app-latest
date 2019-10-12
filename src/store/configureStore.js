// configureStore.js

import { createStore } from "redux";
import rootReducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools());
}