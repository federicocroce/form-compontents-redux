// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    values: {},
    selected: {
        state: 'new',
        id: null
    },
    invalid: false,
    submite: false,
    clear: true,
    inputDetails: {}
}
// const initialData = {
//     values: {},
//     invalid: false,
//     submite: false,
//     inputDetails: {}
// }

// const initialData = Object.assign({}, data);



const reducerReduxForm = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'SET_VALUES':
            return {
                ...state,
                values: { ...state.values, ...action.payload.value },
                clear: action.payload.clear
            };
        case 'CLEAR_FORM':
            return data;
        case 'SET_SUBMITE':
            return {
                ...state,
                submite: action.payload
            };
        case 'SET_SELECTED':
            return {
                ...state,
                selected: action.payload
            };
        case 'SET_INVALID':
            return {
                ...state,
                invalid: action.state
            };
        case 'SET_INPUT_DETAILS':
            const setInvalid = () => {
                let inputDetails = state.inputDetails;
                let result = false;
                Object.keys(state.inputDetails).forEach(key => {
                    if (inputDetails[key].invalid) {
                        result = true;
                        return;
                    }
                });

                return result;
            }
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