import firebase from 'firebase/app';
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCNZW1swgkGPS9KsuNZFI_bDKEzkeZ9P0A",
  authDomain: "workout-log-b0db7.firebaseapp.com",
  databaseURL: "https://workout-log-b0db7.firebaseio.com",
  projectId: "workout-log-b0db7",
  storageBucket: "workout-log-b0db7.appspot.com",
  messagingSenderId: "737018123180"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });

export default firebaseApp.firestore();