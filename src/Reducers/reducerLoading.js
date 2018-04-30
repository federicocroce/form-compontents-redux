// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    isLoading: true
}

const reducerLoading = (state = data, action) => {
    // console.error("ENTRA");

    switch (action.type) {

        case 'SET_LOADING':
            if (action.payload != state.isLoading) {
                return {
                    ...state,
                    isLoading: action.payload
                };
            }
        default:
            return state
    }
}

export { reducerLoading };