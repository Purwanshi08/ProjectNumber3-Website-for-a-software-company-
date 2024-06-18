document.addEventListener('DOMContentLoaded', function () {
    const authBtnContainer = document.querySelector('.auth-btn-container');
    const loginStatusBtn = document.getElementById('login-status');

    // Check if the user is logged in
    const token = localStorage.getItem('accessToken');

    if (token) {
        // User is logged in
        loginStatusBtn.textContent = 'Logout'; // Change button text to "Logout"

        // Add event listener for logout
        loginStatusBtn.addEventListener('click', function () {
            // Clear the token from local storage
            localStorage.removeItem('accessToken');

            // Redirect to login page
            window.location.href = 'login.html';
        });
    } else {
        // User is not logged in
        loginStatusBtn.textContent = 'SignUp'; // Change button text to "SignUp"
        loginStatusBtn.href = 'signup.html'; // Set href attribute to signup.html
    }
});