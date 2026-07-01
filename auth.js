// ===============================
// Show / Hide Password
// ===============================

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (togglePassword && passwordInput) {

    togglePassword.onclick = function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "👁";

        }

    };

}


// ===============================
// LOGIN
// ===============================

function login() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("No account found. Please create one first.");
        return;

    }

    if (email === user.email && password === user.password) {

        localStorage.setItem("isLoggedIn", "true");

        document.querySelector(".container").style.opacity = "0";
        document.querySelector(".container").style.transform = "scale(.8)";

        setTimeout(function () {

            window.location.href = "index.html";

        }, 800);

    } else {

        alert("Invalid Email or Password!");

    }

}


// ===============================
// SIGNUP
// ===============================

function signup() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert("Please fill all fields!");
        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match!");
        return;

    }

    let user = {

        name: name,
        email: email,
        password: password

    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("🎉 Account Created Successfully!");

    showLogin();

}


// ===============================
// SWITCH FORMS
// ===============================

function showSignup() {

    document.getElementById("container").classList.add("active");

}

function showLogin() {

    document.getElementById("container").classList.remove("active");

}