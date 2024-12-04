document.getElementById("log_me_in").addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get email and password inputs
    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate email and password inputs
    if (!email || !password) {
        alert("Both email and password are required.");
        return; // Exit early if fields are empty
    }

    try {
        // Authenticate the user with Firebase Authentication
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Verify user data in Firestore
        const userDoc = await db.collection("users").doc(user.uid).get();

        if (userDoc.exists) {
            // Login successful
            alert("Login successful!");
            window.location.href = "user_portal.html"; // Redirect to user portal
        } else {
            // Firestore user record not found
            alert("Login failed: User data not found in Firestore. Please contact support.");
            await auth.signOut();
        }
    } catch (error) {
        // Handle login errors
        if (error.code === "auth/user-not-found") {
            alert("Login failed: No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
            alert("Login failed: Incorrect password.");
        } else {
            alert(`Login failed: ${error.message}`);
        }
        console.error("Error during login:", error);
    }
});
