import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";

import { reducerReduxForm as reduxForm } from './reducerReduxForm';
import { reducerTest as test } from './reducerTest';

import { reducerMessages as messages } from './reducerMessages';
import { reducerLoading as loading } from './reducerLoading';


const allReducers = {
    reduxForm,
    test,
    messages,
    loading,
    router: routerReducer
}

// const rootReducer = combineForms(allReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer;
