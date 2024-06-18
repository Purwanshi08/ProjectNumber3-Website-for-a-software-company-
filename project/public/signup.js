document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/v1/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        console.log("User signed up successfully");
        if (response.ok) {
            console.log("Signup successful:", data);
            // Optionally handle successful signup, e.g., show success message
            console.log("Login successful:", data);
            // Save token to local storage
            console.log("token : ", data.token);
            localStorage.setItem('accessToken', data.token);
            window.location.href = 'index.html'; // Redirect to index.html
        } else {
            console.error("Error signing up:", data.message);
            // Show error message to user
            alert(data.message);
        }
    } catch (error) {
        console.error("Error signing up:", error);
        // Show error message to user
        alert("An error occurred while signing up. Please try again.");
    }
});