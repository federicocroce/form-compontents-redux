// a reducer takes in two things
// import { store } from '../Store.js'
// import { postsResponse } from "../Data/data";

const data = {
    list: [],
    selected: {},
    text: 'ALGO',
    firebasePosts: {}
}


const user = (state = data, action) => {
    // console.error("ENTRA");
    switch (action.type) {
        case 'FETCH_USERS':
            return {
                ...state,
                list : action.payload
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

export { user };