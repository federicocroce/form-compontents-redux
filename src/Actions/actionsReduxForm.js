import React from 'react';


const actions = (dispatch, action, value) => {
    functionsAction[action](dispatch, value);
};

const setValues = (dispatch, value) =>{
    dispatch({
        type: 'SET_VALUES',
        payload: value
    });
};

const functionsAction = {
    setValues:setValues
}



// actions.removeItem = (dispatch, id) => React.config.fireStoreApp.removeItem(dispatch, collection, id);

export default actions;
