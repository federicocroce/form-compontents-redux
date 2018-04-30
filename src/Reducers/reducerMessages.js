// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";
import React from 'react';

const data = {
    list: []
}



const reducerMessages = (state = data, action) => {
    // console.error("ENTRA");


    console.log();
    switch (action.type) {
        case 'SET_MEASSAGES':

            // const newlistMessages = action.payload != undefined ? state.list.concat(action.payload) : state.list;

            // setTimeout(() => {
            //     const lastIndex = newlistMessages.length - 1;
            //     // newlistMessages.filter((item, index) => {
            //     newlistMessages.slice(lastIndex);
            //     return {
            //         ...state,
            //         list: newlistMessages
            //     };
            //     // })
            // }, 3000);

            return {
                ...state,
                list: state.list.concat(action.payload)
            };
        // case 'FETCH_TEXTO':
        //     return {
        //         ...state,
        //         loginState: action.payload
        //     };
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