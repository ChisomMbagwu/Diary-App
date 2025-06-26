// js/view.js

document.addEventListener('DOMContentLoaded', () => {
   
    const logoutBtn = document.getElementById('logout-btn');
    const singleEntryContent = document.getElementById('single-entry-content');
    const editEntryBtn = document.getElementById('edit-entry-btn');
    const deleteEntryDetailBtn = document.getElementById('delete-entry-detail-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const entryId = urlParams.get('id');
    let currentEntryData = null; // To hold the fetched entry data

    if (!entryId) {
        showToast('No entry ID provided.', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
        return;
    }

    async function fetchSingleEntry(id) {
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
                currentEntryData = entry; // Store entry data
                renderSingleEntry(entry); // Render the entry on the page
            } else {
                showToast(responseData.message || 'Failed to fetch the diary entry.', 'error');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirect to the list page if not found
                }, 1000);
            }
        } catch (error) {
            showToast('An error occurred while fetching the diary entry. Please try again later.', 'error');
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to the list page on error
            }, 1000);
        }
    }

    async function deleteEntry(entryId) {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    
        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 1000);
            return;
        }
    
        try {
            const response = await fetch(`https://tunga-diary-api.onrender.com/api/fullstack/diary/delete/${entryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            const responseData = await response.json();
    
            if (response.ok && responseData.status === 200) {
                showToast('Diary entry deleted successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirect to home page after deletion
                }, 500);
            } else {
                showToast(responseData.message || 'Failed to delete the diary entry.', 'error');
            }
        } catch (error) {
            showToast('An error occurred while deleting the diary entry. Please try again later.', 'error');
        }
    }

    // --- Rendering Function ---
    function renderSingleEntry(entry) {
        singleEntryContent.innerHTML = `
            <h2>${entry.title}</h2>
            <p>${entry.content}</p>
        `;
    }

    // --- Event Listeners ---
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    });

    editEntryBtn.addEventListener('click', () => {
        if (entryId) {
            window.location.href = `edit.html?id=${entryId}`;
        }
    });

    deleteEntryDetailBtn.addEventListener('click', () => {
        deleteModal.style.display = 'flex'; // Show modal
    });

    backToHomeBtn.addEventListener('click', () => {
        window.location.href = 'home.html';
    });

    // Delete Confirmation Modal
    confirmDeleteBtn.addEventListener('click', () => {
        if (entryId) {
            deleteEntry(entryId);
            deleteModal.style.display = 'none'; // Hide modal
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none'; // Hide modal
    });

    // Initial load
    fetchSingleEntry(entryId);
});