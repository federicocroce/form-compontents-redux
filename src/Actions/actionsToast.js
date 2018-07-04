import React, { config } from 'react';

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


const removeToast = (currentId) => {
    setTimeout(() => {
        config.storeHistory.dispatch({
            type: 'REMOVE_TOAST',
            payload: currentId
        });
    }, 3000);
}

actions.setToast = (text ,type='') => {
    id++;

    config.storeHistory.dispatch({
        type: 'SET_MEASSAGES',
        payload: createToast(type, text, id)
    });

    removeToast(id);

}

export default actions;
