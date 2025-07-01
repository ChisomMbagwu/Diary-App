// js/create.js

document.addEventListener('DOMContentLoaded', () => {

    const logoutBtn = document.getElementById('logout-btn');
    const entryForm = document.getElementById('entry-form');
    const entryTitleInput = document.getElementById('entry-title');
    const entryMoodSelect = document.getElementById('entry-mood');
    const entryContentTextarea = document.getElementById('entry-content');
    const cancelEntryBtn = document.getElementById('cancel-entry-btn');
    const createEntryBtn = document.getElementById('create-entry-btn');

    let isSubmitting = false; // New flag to prevent double submission

    async function createEntry(entryData) {
        if (isSubmitting) {
            console.log("Already submitting, preventing duplicate call.");
            return;
        }

        const token = localStorage.getItem('authToken');

        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1300);
            return;
        }

        isSubmitting = true;
        if (createEntryBtn) {
            createEntryBtn.disabled = true;
            createEntryBtn.textContent = 'Creating...';
        }
        entryTitleInput.disabled = true;
        entryMoodSelect.disabled = true;
        entryContentTextarea.disabled = true;


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
                    window.location.href = 'home.html';
                }, 200);
            } else {
                showToast(responseData.message || 'Failed to create diary entry.', 'error');
            }
        } catch (error) {
            showToast('An error occurred while creating the diary entry. Please try again later.', 'error');
        } finally {
            isSubmitting = false;
            if (createEntryBtn) {
                createEntryBtn.disabled = false;
                createEntryBtn.textContent = 'Create Entry';
            }
            entryTitleInput.disabled = false;
            entryMoodSelect.disabled = false;
            entryContentTextarea.disabled = false;
        }
    }

    // --- Event Listeners ---
    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEntry = {
            title: entryTitleInput.value,
            content: entryContentTextarea.value,
            
        };
        createEntry(newEntry);
    });

    cancelEntryBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});
