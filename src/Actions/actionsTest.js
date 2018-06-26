import React from 'react';
import * as firebase from 'firebase';

const collection = 'test';

const actions = {};

// const document = {
//     details:{
//         id: 0,
//         beginDate: "2018",
//         endDate: "actualmente",
//         content:[
//             'asd',
//             'mas asd'
//         ],
//         img:[],
//         institution: 'Sarasa',
//         title: 'nuevo develop',
//         link: 'www.google.com'
//     }
// }

actions.fetchObjects = () => React.config.fireStoreApp.fetchObjects(collection, 'FETCH_TEST');

actions.createAutoID = (document) => {
    return new Promise((resolve, reject) => {
        React.config.fireStoreApp.createAutoID(collection, document)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

actions.removeItem = (id) => {
    return new Promise((resolve, reject) => {
        React.config.fireStoreApp.removeItem(collection, id)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

actions.updateItem = (id, document) => {
    return new Promise((resolve, reject) => {
        React.config.fireStoreApp.updateItem(collection, id, document)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

// actions.createAutoID = document => React.config.fireStoreApp.createAutoID(collection, document);
// actions.removeItem = id => React.config.fireStoreApp.removeItem(collection, id);
// actions.updateItem = (id, document) => React.config.fireStoreApp.updateItem(collection, id, document);

export default actions;
