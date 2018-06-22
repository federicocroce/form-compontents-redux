import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";

import { reducerReduxForm as reduxForm } from './reducerReduxForm';
import { reducerTest as test } from './reducerTest';


const allReducers = {
    reduxForm,
    test,
    router: routerReducer
}

// const rootReducer = combineForms(allReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer;
