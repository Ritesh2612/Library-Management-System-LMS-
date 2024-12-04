import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("submit_data").addEventListener("click", function() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    // Clear previous error messages
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    // Check if fields are empty
    let hasError = false;
    if (username === "") {
        usernameError.style.display = "inline";
        hasError = true;
    }
    if (password === "") {
        passwordError.style.display = "inline";
        hasError = true;
    }
    if (hasError) return;

    // Fetch JSON file for user validation
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert("Login successful!");
                window.location.href = "admin_portal.html"; // Redirect to the admin portal
            } else {
                // Proceed with Firebase authentication if no match is found in JSON
                signInWithEmailAndPassword(auth, username, password)
                    .then((userCredential) => {
                        alert("Login successfull");
                        window.location.href = "admin_portal.html";
                    })
                    .catch((error) => {
                        alert("Login failed: " + error.message);
                    });
            }
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            alert("Failed to load credentials.");
        });
});
