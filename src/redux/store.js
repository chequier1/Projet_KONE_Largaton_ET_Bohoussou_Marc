import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tacheReducer from './reducers';

const rootReducer = combineReducers({ tacheReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));