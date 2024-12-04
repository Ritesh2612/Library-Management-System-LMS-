document.getElementById("submit_data").addEventListener("click", function() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    // Clear any previous error messages
    usernameError.style.display = "none";
    passwordError.style.display = "none";

    // Check if fields are empty
    let hasError = false;

    if (username.value.trim() === "") {
        usernameError.style.display = "inline";
        hasError = true;
    }

    if (password.value.trim() === "") {
        passwordError.style.display = "inline";
        hasError = true;
    }

    // Stop the login process if there are errors
    if (hasError) {
        return;
    }

    // Continue with login if validation passes
    console.log("Username and password entered. Proceed with login.");
});

// Show error when field is empty on blur (when user leaves the field)
document.getElementById("username").addEventListener("blur", function() {
    if (this.value.trim() === "") {
        document.getElementById("usernameError").style.display = "inline";
    }
});

document.getElementById("password").addEventListener("blur", function() {
    if (this.value.trim() === "") {
        document.getElementById("passwordError").style.display = "inline";
    }
});

// Hide error message on focus (when user clicks on the field)
document.getElementById("username").addEventListener("focus", function() {
    document.getElementById("usernameError").style.display = "none";
});

document.getElementById("password").addEventListener("focus", function() {
    document.getElementById("passwordError").style.display = "none";
});
