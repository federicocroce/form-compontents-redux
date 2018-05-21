import React, { config } from 'react';

const functionsAction = {};
// let dispatch = {};

// setDispatch()
// let dispatch = config.storeHistory.store.dispatch;

// (function (){
// 	let dispatch = config.storeHistory.store.dispatch;
// })();

// const actions = (dispatch, action, value) => {
//     functionsAction[action](dispatch, value);
// };

const setDispatch = (type, payload) =>{
    config.storeHistory.dispatch({
        type,
        payload
    });
}

functionsAction.getForm = () => config.storeHistory.store.getState().reduxForm;

functionsAction.setValues = (input) =>{
    // console.log(config.storeHistory.store.getState());
    setDispatch('SET_VALUES', input);
};

functionsAction.setInputDetails = (details) =>{
    config.storeHistory.dispatch({
        type: 'SET_INPUT_DETAILS',
        payload: details
    });
};

functionsAction.setSubmite = (submite) =>{
    config.storeHistory.dispatch({
        type: 'SET_SUBMITE',
        payload: submite
    });
};

// functionsAction.setInvalid = (state) =>{
//     config.storeHistory.dispatch({
//         type: 'SET_INVALID',
//         payload: state
//     });
// };


export default functionsAction;
