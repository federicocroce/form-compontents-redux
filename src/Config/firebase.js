// import * as firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyADVg_Ig39yxHhlMUdoQFAYtmG5_XN79rg",
//   authDomain: "inmuebles-9567a.firebaseapp.com",
//   databaseURL: "https://inmuebles-9567a.firebaseio.com",
//   projectId: "inmuebles-9567a",
//   storageBucket: "inmuebles-9567a.appspot.com",
//   messagingSenderId: "598700817825"
// };


// firebase.initializeApp(config);

// const snapshotToArray = snapshot => {
//   let returnArr = [];

//   snapshot.forEach(childSnapshot => {
//     let item = { [childSnapshot.key]: childSnapshot.val() }
//     returnArr.push(item);
//   });
//   return returnArr;
// };


// const firebaseApp = {};
// // const setFirebase = () => {

//   firebaseApp.fetchObjects = (dbRef, dispatch, action) => {
//     dbRef.on('value', snapshot => {
//       dispatch({
//         type: action,
//         payload: snapshotToArray(snapshot)
//       });
//     });
//   }

//   firebaseApp.create = (dbRef, post) => {
//     return dbRef.push().set(post);
//   }

//   firebaseApp.remove = (dbRef, key) => {
//     return dbRef.child(key).remove();
//   }

//   firebaseApp.update = (dbRef, post, key) => {
//     return dbRef.child(key).update(post);
//   }


//   firebaseApp.fetchObject = (dbRef, dispatch, action) => {
//     dbRef.on('value', snapshot => {
//       dispatch({
//         type: action,
//         payload: snapshot.val()
//       });
//     });
//   }

// // }

// export default firebaseApp;
