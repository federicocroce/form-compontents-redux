import React from 'react';
import * as firebase from 'firebase';

const dbRef = firebase.database().ref('/').child('users');

const actions = {};

actions.fetchObjects = dispatch => React.config.firebaseApp.fetchObjects(dbRef, dispatch, 'FETCH_USERS');
actions.create = post =>  React.config.firebaseApp.create(dbRef, post);
actions.remove = (key) => React.config.firebaseApp.remove(dbRef, key);
actions.update = (post, key) => React.config.firebaseApp.update(dbRef, post, key);
// actions.fetchObject = (dispatch) => React.config.firebaseApp.fetchObject(dbRefText, dispatch, 'USERS');

actions.setSelected = (selected) => {
    return {
        type: 'SET_SELECTED',
        selected
    }
}

export default actions;