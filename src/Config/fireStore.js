import React, { config } from 'react';
import * as firebase from 'firebase';
// var Firestore = require('@google-cloud/firestore');
require("firebase/firestore");


const fireStoreApp = {};

// var firestore = new Firestore();


// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyDINSbmIwTdqRE7yDhkow46fs3JxW5y8KM",
//   authDomain: "test-74eeb.firebaseapp.com",
//   databaseURL: "https://federicocrocecv.firebaseapp.com/",
//   projectId: "test-74eeb",
//   storageBucket: "test-74eeb.appspot.com",
//   messagingSenderId: "984496005171"
// };
const firebaseConfig = {
  apiKey: "AIzaSyCs7FRRIVakhY4sMVWP3rlJYhRYnZLKAI8",
  authDomain: "form-compontents-react-redux.firebaseapp.com",
  databaseURL: "https://form-compontents-react-redux.firebaseio.com",
  projectId: "form-compontents-react-redux",
  storageBucket: "form-compontents-react-redux.appspot.com",
  messagingSenderId: "359556241403"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


const db = firebase.firestore();
db.settings({timestampsInSnapshots: true});
// const dispatch = config.storeHistory.dispatch;


fireStoreApp.getStorageUrlImg = function (path) {

  const pathReference = storage.ref(path);

  pathReference.getDownloadURL().then(function (url) {
    return url;
  }).catch(function (error) {

    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/object_not_found':
        // File doesn't exist
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
    }
  });
}


// firestore.getCollections().then(collections => {
//   for (let collection of collections) {
//     console.log(`Found collection with id: ${collection.id}`);
//   }
// });


fireStoreApp.fetchObjects = (collection, action) => {
  React.actions.actionsLoading.setLoading(true);
  db.collection(collection).onSnapshot(snapshot => {
    // snapshot.docChanges.forEach(function (change) {

    let array = [];
    snapshot.forEach((doc) => {
      array.push({
        data: doc.data(),
        id: doc.id
      });
    });

    config.storeHistory.dispatch({
      type: action,
      payload: array
      // payload: array.length > 1 ? array : array[0]
    });
    React.actions.actionsLoading.setLoading(false);
  });
};



fireStoreApp.createAutoID = (collection, document) => {
  return new Promise((resolve, reject) => {
    React.actions.actionsLoading.setLoading(true);
    db.collection(collection).add(document)
      .then(function (docRef) {
        React.actions.actionsToast.setToast("Se agregó correctamente.", 'successfully');
        React.actions.actionsLoading.setLoading(false);
        resolve(docRef);
      })
      .catch(function (error) {
        React.actions.actionsToast.setToast(errorMaps[error.code], 'error');
        React.actions.actionsLoading.setLoading(false);
        reject(error);
        // console.error("Error adding document: ", error);
      })
      .finally(() =>{
        React.actions.actionsLoading.setLoading(false);
      })
  })
}


fireStoreApp.removeItem = (collection, id) => {
  return new Promise((resolve, reject) => {
    React.actions.actionsLoading.setLoading(true);
    db.collection(collection).doc(id).delete().then(() => {
      React.actions.actionsToast.setToast("Se eliminó correctamente.", 'successfully');
      resolve();
    }).catch(error =>{
      React.actions.actionsToast.setToast(errorMaps[error.code], 'error');
      reject();
    })
    .finally(() =>{
      React.actions.actionsLoading.setLoading(false);
    })
  })
}

fireStoreApp.updateItem = (collection, id, document) => {
  return new Promise((resolve, reject) => {
    React.actions.actionsLoading.setLoading(true);
    db.collection(collection).doc(id).update(document).then(() => {
      React.actions.actionsToast.setToast("Se actualizó correctamente.", 'successfully');
      resolve();
    }).catch(error => {
      React.actions.actionsToast.setToast(errorMaps[error.code], 'error');
      reject(error);
    })
    .finally(() =>{
      React.actions.actionsLoading.setLoading(false);
    })
  })
}


fireStoreApp.hadleAuth = (action) => {
  React.actions.actionsLoading.setLoading(true);
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const login = {
      user: result.user,
      loginState: true
    }
    config.storeHistory.dispatch({
      type: action,
      payload: login
    });
    React.actions.actionsLoading.setLoading(false);
    React.actions.actionsToast.setToast("Bienvenido " + result.user.displayName);
    // var token = result.credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // ...
  }).catch(function (error) {
    React.actions.actionsLoading.setLoading(false);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    React.actions.actionsToast.setToast(errorMessage, "error");
    // ...
  });
}


fireStoreApp.onAuthStateChanged = (action) => {
  firebase.auth().onAuthStateChanged(user => {
    const login = {
      user: {},
      loginState: true
    }
    if (user) {
      login.user = user;
      config.storeHistory.dispatch({
        type: action,
        payload: login
      });
    }
    else {
      login.loginState = false;
      config.storeHistory.dispatch({
        type: action,
        payload: login
      });
    }

  });
};

fireStoreApp.signOut = (action) => {
  firebase.auth().signOut().then(() => {
    const login = {
      user: {},
      loginState: false
    }
    config.storeHistory.dispatch({
      type: action,
      payload: login
    });
    React.actions.actionsToast.setToast("Desloageado");
  }).catch(function (error) {
    React.actions.actionsToast.setToast(error.message, "error");
  });
}

const errorMaps = {
  "permission-denied": "Acceso denegado"
}


export default fireStoreApp;
