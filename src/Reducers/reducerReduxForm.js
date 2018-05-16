// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    values: {},
    initialValues: {},
    invalid: false,
    submite: false,
    inputDetails: {}
}



const reducerReduxForm = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'SET_VALUES':
            const setInvalid = () => {
                let inputDetails = state.inputDetails;
                let result = false;
                Object.keys(state.inputDetails).forEach( key => {
                    if (inputDetails[key].invalid) {
                        result = true;
                        return;
                    }
                });

                return result;
            }
            return {
                ...state,
                values: Object.assign(state.values, action.payload.value),
                inputDetails: Object.assign(state.inputDetails, action.payload.inputDetails),
                invalid: setInvalid()
                // values: action.payload
            };
        case 'SET_INITIAL_VALUES':
            return {
                ...state,
                initialValues: Object.assign(state.initialValues, action.payload.value)
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
        case 'SET_INPUT_DETAILS':
            
            return {
                ...state,
                inputDetails: Object.assign(state.inputDetails, action.payload),
                invalid: setInvalid()
            };
        default:
            return state
    }
}

export { reducerReduxForm };