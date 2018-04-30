import React from 'react';
import * as firebase from 'firebase';

const collection = 'experiences';

const actions = {};

const document = {
    details:{
        id: 0,
        beginDate: "2018",
        endDate: "actualmente",
        content:[
            'asd',
            'mas asd'
        ],
        institution: 'Sarasa',
        title: 'nuevo develop',
        link: 'www.google.com'
    }
}

actions.fetchObjects = dispatch => React.config.fireStoreApp.fetchObjects(collection, dispatch, 'FETCH_EXPERIENCES');
actions.createAutoID = dispatch => React.config.fireStoreApp.createAutoID(dispatch, collection, document);
actions.removeItem = (dispatch, id) => React.config.fireStoreApp.removeItem(dispatch, collection, id);

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
