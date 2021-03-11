import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCeZX0Cl3UID8GLJsuXcqB4kmNZ-NeXmYc",
    authDomain: "weather-app-7fdc0.firebaseapp.com",
    projectId: "weather-app-7fdc0",
    storageBucket: "weather-app-7fdc0.appspot.com",
    messagingSenderId: "515578022655",
    appId: "1:515578022655:web:ce696f547e04e9d1839aca"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp