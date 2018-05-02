import React, { config } from 'react';

// let dispatch = {};

// setDispatch()
// let dispatch = config.storeHistory.store.dispatch;

// (function (){
// 	let dispatch = config.storeHistory.store.dispatch;
// })();

// const actions = (dispatch, action, value) => {
//     functionsAction[action](dispatch, value);
// };

const setValues = (value) =>{
    config.storeHistory.dispatch({
        type: 'SET_VALUES',
        payload: value
    });
};

const setSubmite = (submite) =>{
    config.storeHistory.dispatch({
        type: 'SET_SUBMITE',
        payload: submite
    });
};

const setInvalid = (state) =>{
    config.storeHistory.dispatch({
        type: 'SET_INVALID',
        payload: state
    });
};

const functionsAction = {
    setValues,
    setSubmite,
    setInvalid
}



// actions.removeItem = (dispatch, id) => React.config.fireStoreApp.removeItem(dispatch, collection, id);

export default functionsAction;
