// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);  // Ensure this is called first

// Initialize Firestore
const db = getFirestore(app);

document.getElementById("show_books").addEventListener("click", async () => {
    const booksList = document.getElementById("books");
    booksList.innerHTML = ""; // Clear previous results

    try {
        // Fetching books from Firestore (Firebase)
        const booksRef = collection(db, "books");
        const snapshot = await getDocs(booksRef);

        if (snapshot.empty) {
            booksList.innerHTML = "<li>No books found in Firestore</li>";
        } else {
            snapshot.forEach(doc => {
                const book = doc.data();
                const bookName = book.bookName || "No name available";
                const author1 = book.author1 || "Unknown author";
                const author2 = book.author2 ? `, ${book.author2}` : "";

                const listItem = document.createElement("li");
                listItem.textContent = `${bookName} by ${author1}${author2}`;
                booksList.appendChild(listItem);
            });
        }

        // Get the search query from the input field
        const query = document.getElementById("book-search-bar").value.trim();

        // Only fetch from Open Library API if query is not empty
        if (query.length > 0) {
            // Fetching books from the Open Library API
            const apiResponse = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=10`);

            if (!apiResponse.ok) {
                throw new Error(`API request failed with status: ${apiResponse.status}`);
            }

            const apiData = await apiResponse.json();
            const apiBooks = apiData.docs;

            // Displaying API books
            if (apiBooks.length > 0) {
                apiBooks.forEach(book => {
                    const listItem = document.createElement("li");
                    listItem.textContent = book.title; // Display book title from API
                    booksList.appendChild(listItem);
                });
            } else {
                booksList.innerHTML += "<li>No books found in API</li>";
            }
        }

    } catch (error) {
        console.error("Error fetching books: ", error);
        booksList.innerHTML += `<li>Error: ${error.message}</li>`; // Display error message
    }
});
