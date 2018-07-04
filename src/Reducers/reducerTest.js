// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    list: []
}


const reducerTest = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'FETCH_TEST':
            // const list = [];
            // let generic = state.generic;

            // action.payload.map((data, index) => {
            //     if (data.type != "generic") {
            //         list.push(data);
            //     }
            //     else {
            //         generic = data;
            //     }
            // });

            // list.sort((a, b) => b.details.id - a.details.id);
          
            return {
                ...state,
                list: action.payload
            };
        default:
            return state
    }
}

export { reducerTest };