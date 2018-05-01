// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    values: {}
}



const reducerReduxForm = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'SET_VALUES':
                      
            return {
                ...state,
                values: Object.assign(state.values,  action.payload )
            };
        case 'FETCH_TEXTO':
            return {
                ...state,
                text: action.payload
            };
        case 'SET_SELECTED':
            return {
                ...state,
                selected: action.selected
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