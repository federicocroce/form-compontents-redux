import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
// import { reducer as reduxFormReducer } from 'redux-form';
// import { combineForms } from 'react-redux-form';

import { posts } from './postsReducer';
import { maps } from './gMapsReducer';
// import { user } from './userReducer';
// import { user } from './usersReducer';
import { reducerEstudies as estudies } from './reducerEstudies';
import { reducerExperiences as experiences } from './reducerExperiences';
import { reducerPersonalData as personalData } from './reducerPersonalData';
import { reducerFooter as footer } from './reducerFooter';
import { reducerLogin as login } from './reducerLogin';
import { reducerMessages as messages } from './reducerMessages';
import { reducerLoading as loading } from './reducerLoading';


const allReducers = {
    experiences,
    estudies,
    personalData,
    footer,
    login,
    messages,
    loading,
    router: routerReducer
}

// const rootReducer = combineForms(allReducers);
const rootReducer = combineReducers(allReducers);

export default rootReducer;
