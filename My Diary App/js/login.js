document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            try {
                // Send login credentials to API
                const response = await fetch('https://tunga-diary-api.onrender.com/api/fullstack/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const responseData = await response.json();

                if (response.ok && responseData.status === 'success') {
                    const token = responseData.token; // Extract token from the response

                    // Store the token in localStorage
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('isLogin', 'true');
                    console.log("Good")
                    showToast('Login successful!', 'success');
                    setTimeout(() => {
                        window.location.href = 'home.html'; // Redirect to home page
                    }, 1300);
                } else {
                    // Handle login failure
                    const errorMessage = responseData.message || 'Login failed. Please try again.';
                    showToast(errorMessage, 'error');
                }
            } catch (error) {
                // Handle network or other errors
                showToast('An error occurred. Please try again later.', 'error');
            }
        } else {
            showToast('Please enter email and password.', 'error');
        }
    });
});