import React from 'react';
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
var config = {
  apiKey: "AIzaSyDINSbmIwTdqRE7yDhkow46fs3JxW5y8KM",
  authDomain: "test-74eeb.firebaseapp.com",
  databaseURL: "https://test-74eeb.firebaseio.com",
  projectId: "test-74eeb",
  storageBucket: "test-74eeb.appspot.com",
  messagingSenderId: "984496005171"
};

firebase.initializeApp(config);
const storage = firebase.storage();


const db = firebase.firestore();


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


fireStoreApp.fetchObjects = (collection, dispatch, action) => {
  React.actions.actionsLoading.setLoading(dispatch, true);
  db.collection(collection).onSnapshot(function (snapshot) {
    // snapshot.docChanges.forEach(function (change) {

    const array = [];
    snapshot.forEach((doc) => {

      const newDoc = doc.data();
      newDoc.id = doc.id;
      array.push(newDoc);

    });
    dispatch({
      type: action,
      payload: array.length > 1 ? array : array[0]
    });
    React.actions.actionsLoading.setLoading(dispatch, false);
  });
};


fireStoreApp.createAutoID = (dispatch, collection, document) => {
  React.actions.actionsLoading.setLoading(dispatch, true);
  db.collection(collection).add(document)
    .then(function (docRef) {
      React.actions.actionsToast.setToast(dispatch, "Se agregó correctamente.", 'successfully');
      React.actions.actionsLoading.setLoading(dispatch, false);
      // console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      React.actions.actionsToast.setToast(dispatch, errorMaps[error.code], 'error');
      React.actions.actionsLoading.setLoading(dispatch, false);
      // console.error("Error adding document: ", error);
    });
}


fireStoreApp.removeItem = (dispatch, collection, id) => {
  db.collection(collection).doc(id).delete().then(function () {
    React.actions.actionsToast.setToast(dispatch, "Se eliminó correctamente.", 'successfully');
  }).catch(function (error) {
    React.actions.actionsToast.setToast(dispatch, errorMaps[error.code], 'error');
  });
}


fireStoreApp.hadleAuth = (dispatch, action) => {
  React.actions.actionsLoading.setLoading(dispatch, true);
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const login = {
      user: result.user,
      loginState: true
    }
    dispatch({
      type: action,
      payload: login
    });
    React.actions.actionsLoading.setLoading(dispatch, false);
    React.actions.actionsToast.setToast(dispatch, "Bienvenido " + result.user.displayName);
    // var token = result.credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    // ...
  }).catch(function (error) {
    React.actions.actionsLoading.setLoading(dispatch, false);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    React.actions.actionsToast.setToast(dispatch, errorMessage, "error");
    // ...
  });
}


fireStoreApp.onAuthStateChanged = (dispatch, action) => {
  firebase.auth().onAuthStateChanged(user => {
    const login = {
      user: {},
      loginState: true
    }
    if (user) {
      login.user = user;
      dispatch({
        type: action,
        payload: login
      });
    }
    else {
      login.loginState = false;
      dispatch({
        type: action,
        payload: login
      });
    }

  });
};

fireStoreApp.signOut = (dispatch, action) => {
  firebase.auth().signOut().then(() => {
    const login = {
      user: {},
      loginState: false
    }
    dispatch({
      type: action,
      payload: login
    });
    React.actions.actionsToast.setToast(dispatch, "Desloageado");
  }).catch(function (error) {
    React.actions.actionsToast.setToast(dispatch, error.message, "error");
  });
}

const errorMaps = {
  "permission-denied": "Acceso denegado"
}


export default fireStoreApp;
