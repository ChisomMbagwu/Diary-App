// js/create.js

document.addEventListener('DOMContentLoaded', () => {
   
    const logoutBtn = document.getElementById('logout-btn');
    const entryForm = document.getElementById('entry-form');
    const entryTitleInput = document.getElementById('entry-title');
    const entryMoodSelect = document.getElementById('entry-mood');
    const entryContentTextarea = document.getElementById('entry-content');
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');

  
    async function createEntry(entryData) {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 1300);
            return;
        }
    
        try {
            const response = await fetch('https://tunga-diary-api.onrender.com/api/fullstack/diary/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entryData),
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.status === 201) {
                showToast('Diary entry created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirect to home page
                }, 200);
            } else {
                showToast(responseData.message || 'Failed to create diary entry.', 'error');
            }
        } catch (error) {
            showToast('An error occurred while creating the diary entry. Please try again later.', 'error');
        }
    }
    
    // --- Event Listeners ---
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEntry = {
            title: entryTitleInput.value,
            content: entryContentTextarea.value,
        };
        createEntry(newEntry); // Call the API to create the entry
    });
    
    cancelEntryBtn.addEventListener('click', () => {
        window.location.href = 'home.html'; // Go back to home page
    });

    // --- Event Listeners ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});