      // On page load, check if user is logged in and update navbar accordingly
      window.onload = function() {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            showUserLoggedIn(currentUser);
        }
    };

    function openSignupPopup() {
        document.getElementById("signupPopup").style.display = "flex";
    }

    function closeSignupPopup() {
        document.getElementById("signupPopup").style.display = "none";
    }

    function openLoginPopup() {
        document.getElementById("loginPopup").style.display = "flex";
    }

    function closeLoginPopup() {
        document.getElementById("loginPopup").style.display = "none";
    }

    // Signup Success Handler
    function signupSuccess(event) {
        event.preventDefault(); // Prevent form from submitting

        var firstName = document.getElementById("first-name").value;
        var lastName = document.getElementById("last-name").value;
        var username = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var retypePassword = document.getElementById("retype-password").value;

        if (!firstName || !lastName || !username || !email || !password || !retypePassword) {
            showAlert("All fields are required.", "red");
            return;
        }

        if (password !== retypePassword) {
            showAlert("Passwords do not match.", "red");
            return;
        }

        // Store data in localStorage
        const userData = {
            firstName,
            lastName,
            username,
            email,
            password
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        // Show success message and close popup
        showAlert("Signup Successful!", "#28a745");
        closeSignupPopup();

        // Reset form fields
        document.getElementById("signupForm").reset();  // Reset the signup form
    }

    // Login Success Handler
    function loginSuccess(event) {
        event.preventDefault(); // Prevent form from submitting

        var username = document.getElementById("login-username").value;
        var password = document.getElementById("login-password").value;

        // Retrieve data from localStorage
        var storedData = JSON.parse(localStorage.getItem("userData"));

        if (!storedData) {
            showAlert("No user data found. Please sign up first.", "red");
            return;
        }

        if (storedData.username === username && storedData.password === password) {
            showAlert("Login Successful!", "#28a745");
            closeLoginPopup();

            // Reset login form fields
            document.getElementById("loginForm").reset();  // Reset the login form

            // Update navbar to show logged in state
            showUserLoggedIn(username);

            localStorage.setItem("currentUser", username);
        } else {
            showAlert("Invalid username or password.", "red");
        }
    }

    // Function to show alert messages
    function showAlert(message, color) {
        var alertMessage = document.createElement("div");
        alertMessage.classList.add("alert-message");
        alertMessage.textContent = message;
        alertMessage.style.backgroundColor = color;
        alertMessage.style.color = "white";
        document.body.appendChild(alertMessage);

        setTimeout(function() {
            alertMessage.remove();
        }, 3000);
    }

    // Show user logged in: hide signup link, show username and logout button
    function showUserLoggedIn(username) {
        const signupLink = document.getElementById("signup-link");
        const userNameDisplay = document.getElementById("user-name-display");
        const logoutButton = document.getElementById("logoutButton");

        if (signupLink) signupLink.style.display = "none";
        if (userNameDisplay) {
            userNameDisplay.textContent = username;
            userNameDisplay.style.display = "inline";
        }
        if (logoutButton) logoutButton.style.display = "inline-block";
    }

    // Logout function: clear user data and reset navbar
    function logout() {
        localStorage.removeItem("currentUser");

        const signupLink = document.getElementById("signup-link");
        const userNameDisplay = document.getElementById("user-name-display");
        const logoutButton = document.getElementById("logoutButton");

        if (signupLink) signupLink.style.display = "inline";
        if (userNameDisplay) {
            userNameDisplay.textContent = "";
            userNameDisplay.style.display = "none";
        }
        if (logoutButton) logoutButton.style.display = "none";

        showAlert("Logged out successfully.", "#28a745");
    }