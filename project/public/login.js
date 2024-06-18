
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log("User logged in successfully");
        if (response.ok) {
            console.log("Login successful:", data);
            // Save token to local storage
            console.log("token : ", data.token);
            localStorage.setItem('accessToken', data.token);
            window.location.href = 'index.html'; // Redirect to index.html
        } else {
            console.error("Error logging in:", data.message);
            // Show error message to user
            alert(data.message);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        // Show error message to user
        alert("An error occurred while logging in. Please try again.");
    }
});