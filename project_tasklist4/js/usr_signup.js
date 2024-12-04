document.getElementById("register_new").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("usr_name").value.trim();
    const email = document.getElementById("usr_email").value.trim();
    const password = document.getElementById("usr_pass").value.trim();

    if (!name || !email || !password) {
        alert("All fields are required.");
        return;
    }

    try {
        // Create a new user in Firebase Authentication
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save user details in Firestore
        await db.collection("users").doc(user.uid).set({
            name: name,
            email: email,
            password: password,
            createdAt: new Date(),
        });

        alert("Signup successful! You can now log in.");
        window.location.href = "usr_login.html"; // Redirect to login page
    } catch (error) {
        alert(`Signup failed: ${error.message}`);
        console.error("Error during signup:", error);
    }
});
