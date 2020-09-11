import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAowj3R0WR8GhRTlR0jBVycArjAtZBj8ZQ",
  authDomain: "todoapp-f2ee1.firebaseapp.com",
  databaseURL: "https://todoapp-f2ee1.firebaseio.com",
  projectId: "todoapp-f2ee1",
  storageBucket: "todoapp-f2ee1.appspot.com",
  messagingSenderId: "310811805136",
  appId: "1:310811805136:web:68e9e429f3e861d643e5d5"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
