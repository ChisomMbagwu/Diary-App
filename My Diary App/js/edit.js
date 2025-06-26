// js/edit.js

document.addEventListener('DOMContentLoaded', () => {
    

    const logoutBtn = document.getElementById('logout-btn');
    const entryForm = document.getElementById('entry-form');
    const entryTitleInput = document.getElementById('entry-title');
    const entryContentTextarea = document.getElementById('entry-content');
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get('id');

    if (!entryId) {
        showToast('No entry ID provided for editing.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
        return;
    }

    async function fetchEntryForEdit(id) {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 1000);
            return;
        }
    
        try {
            const response = await fetch(`https://tunga-diary-api.onrender.com/api/fullstack/diary/entry/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.status === 200) {
                const entry = responseData.data; // Extract the entry data from the response
                entryTitleInput.value = entry.title; // Populate the title input
                entryContentTextarea.value = entry.content; // Populate the content textarea
            } else {
                showToast(responseData.message || 'Failed to fetch the diary entry.', 'error');
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirect to home page if entry not found
                }, 1300);
            }
        } catch (error) {
            showToast('An error occurred while fetching the diary entry. Please try again later.', 'error');
            setTimeout(() => {
                window.location.href = 'home.html'; // Redirect to home page on error
            }, 1000);
        }
    }

    async function updateEntry(entryId, updatedData) {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 1000);
            return;
        }
    
        try {
            const response = await fetch(`https://tunga-diary-api.onrender.com/api/fullstack/diary/update/${entryId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.status === 200) {
                showToast('Diary entry updated successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirect to home page after successful update
                }, 500);
            } else {
                showToast(responseData.message || 'Failed to update the diary entry.', 'error');
            }
        } catch (error) {
            showToast('An error occurred while updating the diary entry. Please try again later.', 'error');
        }
    }

    // --- Event Listeners ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    });

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedData = {
            title: entryTitleInput.value,
            content: entryContentTextarea.value,
        };
        updateEntry(entryId, updatedData);
    });

    cancelEntryBtn.addEventListener('click', () => {
        window.location.href = `view.html?id=${entryId}`; // Go back to single entry view
    });

    // Initial load
    fetchEntryForEdit(entryId);
});