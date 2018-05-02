// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    values: {},
    invalid: false,
    submite: false
}



const reducerReduxForm = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'SET_VALUES':
                      
            return {
                ...state,
                values: Object.assign(state.values,  action.payload )
            };
        case 'SET_SUBMITE':
            return {
                ...state,
                submite: action.payload
            };
        case 'SET_INVALID':
            return {
                ...state,
                invalid: action.state
            };
        case 'CLEAR_POST':
            return {
                ...state,
                selected: {}
            };
        default:
            return state
    }
}

export { reducerReduxForm };