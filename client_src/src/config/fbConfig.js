import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB-QviwWTcvLCNMvlPxsadAvuZk4yA7-Fc",
  authDomain: "foodish-6c12d.firebaseapp.com",
  databaseURL: "https://foodish-6c12d.firebaseio.com",
  projectId: "foodish-6c12d",
  storageBucket: "foodish-6c12d.appspot.com",
  messagingSenderId: "645047075860"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
