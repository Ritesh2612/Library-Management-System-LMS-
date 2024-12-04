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
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit");

    if (submitButton) {
        submitButton.addEventListener("click", async (event) => {
            event.preventDefault();

            const bookCode = document.getElementById("book_code").value;
            const bookName = document.getElementById("book_name").value;
            const author1 = document.getElementById("author1").value;
            const author2 = document.getElementById("author2").value;
            const subject = document.getElementById("Subject").value;
            const tags = document.getElementById("tags").value;

            try {
                await db.collection("books").add({
                    bookCode: bookCode,
                    bookName: bookName,
                    author1: author1,
                    author2: author2,
                    subject: subject,
                    tags: tags
                });
                alert("Book added successfully!");
            } catch (error) {
                console.error("Error adding book: ", error);
                alert("Failed to add book.");
            }
        });
    } else {
        console.error("Submit button not found");
    }
});
