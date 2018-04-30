import React from 'react';

const actions = {};

let id = 1;

const defaultOptions = {
    color: "#6796e6"
};


const createToast = (type, text, id) => {
    return {
        type,
        text,
        id
    }
}


const removeToast = (dispatch, currentId) => {
    setTimeout(() => {
        dispatch({
            type: 'REMOVE_TOAST',
            payload: currentId
        });
    }, 3000);
}

actions.setToast = (dispatch, text ,type='') => {
    id++;

    dispatch({
        type: 'SET_MEASSAGES',
        payload: createToast(type, text, id)
    });

    removeToast(dispatch, id);

}


// actions.create = post =>  React.config.firebaseApp.create(dbRef, post);
// actions.remove = (key) => React.config.firebaseApp.remove(dbRef, key);
// actions.update = (post, key) => React.config.firebaseApp.update(dbRef, post, key);
// actions.fetchObject = (dispatch) => React.config.firebaseApp.fetchObject(dbRefText, dispatch, 'USERS');

// actions.setSelected = (selected) => {
//     return {
//         type: 'SET_SELECTED',
//         selected
//     }
// }

export default actions;
