import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Array to store cart items
let cart = [];

// Function to fetch books from Firebase
async function fetchBooksFromFirebase() {
    try {
        const firebaseBooks = [];
        const querySnapshot = await getDocs(collection(db, 'books'));

        querySnapshot.forEach((doc) => {
            const bookData = doc.data();
            const title = bookData.bookName !== undefined ? bookData.bookName : "No Title";
            const author = bookData.author1 !== undefined ? bookData.author1 : "Unknown Author";

            firebaseBooks.push({
                id: doc.id,
                title: title,
                author: author
            });
        });
        return firebaseBooks;
    } catch (error) {
        console.error("Error fetching books from Firebase:", error);
        return [];
    }
}

// Fetch books from API
async function fetchBooksFromAPI() {
    try {
        const apiBooks = [];
        const response = await fetch("https://openlibrary.org/search.json?title=harry+potter&limit=10");
        const data = await response.json();
        data.docs.forEach((book) => {
            apiBooks.push({ title: book.title, author: book.author_name ? book.author_name[0] : 'Unknown Author' });
        });
        return apiBooks;
    } catch (error) {
        console.error("Error fetching books from API:", error);
        return [];
    }
}
// Function to handle adding a book to the cart
function addToCart(book) {
    // Get the cart list from the local storage (or create a new one if it doesn't exist)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the selected book to the cart
    cart.push(book);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    displayCart();
}

// Function to display the cart
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart');
    cartList.innerHTML = ''; // Clear existing cart items

    // Loop through each book in the cart and display it
    cart.forEach((book) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${book.title} by ${book.author}`;
        cartList.appendChild(cartItem);
    });
}

// Function to fetch books from Firebase and API, and display them
async function fetchAndDisplayBooks() {
    try {
        const [firebaseBooks, apiBooks] = await Promise.all([fetchBooksFromFirebase(), fetchBooksFromAPI()]);

        const bookList = document.getElementById('book-list');
        bookList.innerHTML = "";  // Clear any existing content

        if (firebaseBooks.length > 0 || apiBooks.length > 0) {
            // Render Firebase books
            firebaseBooks.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';
                bookItem.innerHTML = `<strong>${book.title || 'Untitled (Firebase)'}</strong> by ${book.author || 'Unknown Author'} (Firebase)`;
                
                const selectButton = document.createElement('button');
                selectButton.textContent = 'Select';
                selectButton.onclick = () => addToCart(book); // Call addToCart function on click
                bookItem.appendChild(selectButton);

                bookList.appendChild(bookItem);
            });

            // Render API books
            apiBooks.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';
                bookItem.innerHTML = `<strong>${book.title || 'Untitled (API)'}</strong> by ${book.author || 'Unknown Author'} (API)`;
                
                const selectButton = document.createElement('button');
                selectButton.textContent = 'Select';
                selectButton.onclick = () => addToCart(book); // Call addToCart function on click
                bookItem.appendChild(selectButton);

                bookList.appendChild(bookItem);
            });
        } else {
            bookList.innerHTML = "No books found in Firebase or the API.";
        }
    } catch (error) {
        console.error("Failed to fetch books:", error);
        document.getElementById('book-list').innerHTML = "Error fetching books.";
    }
}



// On page load, fetch and display books
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayBooks();
    displayCart(); // Display cart items on load
});
