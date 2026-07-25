// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5v4ISeRqcRXdQZucfW8D53h_zMq2pDFU",
    authDomain: "szn-tix.firebaseapp.com",
    projectId: "szn-tix",
    storageBucket: "szn-tix.firebasestorage.app",
    messagingSenderId: "641010472234",
    appId: "1:641010472234:web:dfe8c79f042e64187a7a53",
    measurementId: "G-SNLD5GNRRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//submit button 

const email = document.getElementById('submit').value;
submit.addEventListener("click", function (event) {
    event.preventDefault();

    //inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            alert('creating account...')
            //...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

})