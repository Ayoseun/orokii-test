 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCKl38SOOLcLZC4tLplCDRUotXPa5EYo9Y",
    authDomain: "osupa-f56dd.firebaseapp.com",
    databaseURL: "https://osupa-f56dd.firebaseio.com",
    projectId: "osupa-f56dd",
    storageBucket: "osupa-f56dd.appspot.com",
    messagingSenderId: "730399970440",
    appId: "1:730399970440:web:1638e3c7c36ae005233b3d",
    measurementId: "G-D4SJHH4EZJ"
  };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);