import React, { config } from 'react';

const actions = {};

actions.setLoading = (isLoading) => {
    config.storeHistory.dispatch({
        type: 'SET_LOADING',
        payload: isLoading
    });
}

export default actions;
