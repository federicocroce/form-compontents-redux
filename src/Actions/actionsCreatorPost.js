// import firebaseApp from '../Config/Firebase';
import React from "react";
import * as firebase from 'firebase';

// const r = React;

// const firebaseApp = React.config.firebaseApp;

const actions = {}

const dbRefText = firebase.database().ref('/').child('texto');
const dbRef = firebase.database().ref('/').child('Posts');


actions.fetchObjects = dispatch => React.config.firebaseApp.fetchObjects(dbRef, dispatch, 'FETCH_POSTS'); 

actions.create = post =>  React.config.firebaseApp.create(dbRef, post);

actions.remove = (key) => React.config.firebaseApp.remove(dbRef, key);

actions.update = (post, key) => React.config.firebaseApp.update(dbRef, post, key);


actions.fetchObject = (dispatch) => React.config.firebaseApp.fetchObject(dbRefText, dispatch, 'FETCH_TEXTO'); 

// const fetchTexo = (index) => {
//     return {
//         type: 'FETCH_TEXTO',
//         payload: "Nuevo Texto"
//     }
// }

// console.error(firebaseApp);

actions.increment = (index) => {
    return {
        type: 'INCREMENT_LIKES',
        index
    }
}

actions.viewPost = (selected) => {
    return {
        type: 'VIEW_POST',
        selected
    }
}


actions.clear = () => {
    return {
        type: 'CLEAR_POST'
    }
}


actions.setCurrentPlace = (currentPlace) => {
    return {
        type: 'SET_LOCATION',
        currentPlace
    }
}




///////////////////////////////

actions.filterPosts = (posts, action) => {
    return {
        type: action,
        posts
    }
}

export default actions;




// "import React from 'react';",
// "import * as firebase from 'firebase';\n",

// "const dbRef${1:name} = firebase.database().ref('/').child('${1:name}');\n",

// "const actions = {};\n",

// "actions.fetch${1:name} = dispatch => React.config.firebaseApp.fetchObjects(dbRef${1:name}, dispatch, 'FETCH_${1:name}');",
// "actions.create = post =>  React.config.firebaseApp.create(dbRef${1:name}, post);",
// "actions.remove = (key) => React.config.firebaseApp.remove(dbRef${1:name}, key);",
// "actions.update = (post, key) => React.config.firebaseApp.update(dbRef${1:name}, post, key);",
// "actions.fetchTexo = (dispatch) => React.config.firebaseApp.fetchObject(dbRefText, dispatch, '${3:action}');\n",

// "export default actions${1:name};"
