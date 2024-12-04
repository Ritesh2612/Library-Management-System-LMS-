// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_AUBKqF5veR8nqvKg-EiK1a7Ri_dBEdc",
    authDomain: "library-management-syste-38850.firebaseapp.com",
    projectId: "library-management-syste-38850",
    storageBucket: "library-management-syste-38850.appspot.com",
    messagingSenderId: "93618186399",
    appId: "1:93618186399:web:25397115a717e65c675aaa",
    measurementId: "G-0ZEHP1XY6G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
