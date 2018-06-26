// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    list: []
}



const reducerMessages = (state = data, action) => {

    console.log();
    switch (action.type) {
        case 'SET_MEASSAGES':
            return {
                ...state,
                list: state.list.concat(action.payload)
            };
        case 'REMOVE_TOAST':
            const newList = []
            state.list.findIndex(data => {
                if (data.id != action.payload) {
                    newList.push(data);
                }
            });

            return {
                ...state,
                list: newList
            };
        default:
            return state
    }
}

export { reducerMessages };