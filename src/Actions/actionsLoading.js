import React from 'react';

const actions = {};

actions.setLoading = (dispatch, isLoading) => {
    dispatch({
        type: 'SET_LOADING',
        payload: isLoading
    });
}

export default actions;
