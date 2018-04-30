// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    list: [],
    mainData: {},
    skills:{}
}


const reducerPersonalData = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'FETCH_PERSONAL_DATA':  
   
        action.payload.personalData.sort((a, b) => a.index - b.index);  
            return {
                ...state,
                list: action.payload.personalData,
                mainData: action.payload.mainData,
                skills: action.payload.skills
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

export { reducerPersonalData };