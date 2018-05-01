import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";

import { reducerReduxForm as reduxForm } from './reducerReduxForm';


const allReducers = {
    reduxForm,
    router: routerReducer
}

// const rootReducer = combineForms(allReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer;
