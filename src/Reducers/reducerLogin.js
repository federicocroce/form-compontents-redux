// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    user: {},
    loginState: false
}


const reducerLogin = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'HANDLE-AUTH':           
            return {
                ...state,
                user: action.payload.user,
                loginState: action.payload.loginState
            };
        // case 'FETCH_TEXTO':
        //     return {
        //         ...state,
        //         loginState: action.payload
        //     };
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

export { reducerLogin };