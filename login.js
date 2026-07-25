import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC5v4ISeRqcRXdQZucfW8D53h_zMq2pDFU",
    authDomain: "szn-tix.firebaseapp.com",
    projectId: "szn-tix",
    storageBucket: "szn-tix.firebasestorage.app",
    messagingSenderId: "641010472234",
    appId: "1:641010472234:web:dfe8c79f042e64187a7a53",
    measurementId: "G-SNLD5GNRRX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const form = document.getElementById("authForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const isRegister =
        document.getElementById("authTitle").innerText === "Create Account";

    try {

        if (isRegister) {

            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Account created successfully!");

        } else {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            alert("Login successful!");
        }

        window.location.href = "index.html";

    } catch (error) {
        alert(error.message);
    }
});