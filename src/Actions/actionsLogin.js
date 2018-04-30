import React from 'react';

const actions = {};

actions.hadleAuth = (dispatch) => React.config.fireStoreApp.hadleAuth(dispatch,'HANDLE-AUTH');
actions.onAuthStateChanged = (dispatch) => React.config.fireStoreApp.onAuthStateChanged(dispatch,'HANDLE-AUTH');
actions.signOut = (dispatch) => React.config.fireStoreApp.signOut(dispatch,'HANDLE-AUTH');
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
