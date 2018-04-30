// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    list: [],
    generic: {}
}


const reducerEstudies = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'FETCH_ESTUDIES':
            const list = [];
            let generic = state.generic;

            action.payload.map((data, index) => {
                if (data.type != "generic") {
                    list.push(data);
                }
                else {
                    generic = data;
                }
            });

            list.sort((a, b) => b.details.id - a.details.id);
          
            return {
                ...state,
                list,
                generic
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

export { reducerEstudies };