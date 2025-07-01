// js/common.js

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        console.warn("Toast container not found. Create a div with id='toast-container' in your HTML.");
        return;
    }
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 7000);
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
       
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Attach the event listener for the dark mode toggle button
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);

    }
    const homeButton = document.getElementById('home');
if (homeButton) {
    homeButton.addEventListener('click', () => {
        window.location.href = 'home.html';
    });
}

const landingButton = document.getElementById('landing-page');
if (landingButton) {
    landingButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
});
// Add event listener to navigate to home.html when the element with id 'home' is clicked
