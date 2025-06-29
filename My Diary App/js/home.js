// js/home.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if logged in, redirect to login if not
    

    const logoutBtn = document.getElementById('logout-btn');
    const diaryEntriesContainer = document.getElementById('diary-entries-container');
    const addEntryFab = document.getElementById('add-entry-fab');
    const searchBar = document.getElementById('search-bar');
    const sortByDate = document.getElementById('sort-by-date');
    const filterByMood = document.getElementById('filter-by-mood');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    let entryToDeleteId = null; // Store ID of entry to be deleted

    async function fetchAndRenderEntries() {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
        
        if (!token) {
            showToast('You are not logged in. Please log in again.', 'error');
            setTimeout(() => {
                window.location.href = 'login.html'; // Redirect to login page
            }, 4000);
            return;
        }

        try {
            const response = await fetch('https://tunga-diary-api.onrender.com/api/fullstack/diary/entries', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            console.log(responseData); 

            if (response.ok && responseData.status === 200) {
                const entries = responseData.data; // Extract diary entries from the response

                const sortByDate = document.getElementById('sort-by-date').value; // Get selected sort option

                let filteredEntries = entries;

                // Sort by date if a sort option is selected
                if (sortByDate === 'newest') {
                    filteredEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortByDate === 'oldest') {
                    filteredEntries.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                }

                renderDiaryEntries(filteredEntries); // Render the filtered and sorted entries on the page
            } else {
                showToast(responseData.message || 'Failed to fetch diary entries.', 'error');
            }
        } catch (error) {
            showToast('An error occurred while fetching diary entries. Please try again later.', 'error');
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
    // Log the response for debugging
    
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

    // --- Rendering Functions ---
    function renderDiaryEntries(entries) {
        diaryEntriesContainer.innerHTML = ''; // Clear previous entries
        if (entries.length === 0) {
            diaryEntriesContainer.innerHTML = '<p style="text-align: center; color: var(--accent-color);">No diary entries found. Start by adding one!</p>';
            return;
        }

        entries.forEach(entry => {
            const diaryCard = document.createElement('div');
            diaryCard.classList.add('diary-card');
            diaryCard.innerHTML = `
                <h3>${entry.title}</h3>
                <p>${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}</p>
                <div class="meta">
                    <span>${formatDate(entry.createdAt)}</span>
                   
                </div>
                <div class="actions">
                    <button class="button cta-button view-btn" data-id="${entry.id}">View</button>
                    <button class="button accent-button edit-btn" data-id="${entry.id}">Edit</button>
                    <button class="button delete-button delete-btn" data-id="${entry.id}">Delete</button>
                </div>
            `;
            diaryEntriesContainer.appendChild(diaryCard);
        });

        // Add event listeners to newly rendered buttons
        document.querySelectorAll('.view-btn').forEach(button => {
            button.onclick = (e) => {
                window.location.href = `view.html?id=${e.target.dataset.id}`;
            };
        });
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.onclick = (e) => {
                window.location.href = `edit.html?id=${e.target.dataset.id}`;
            };
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = (e) => {
                entryToDeleteId = e.target.dataset.id;
                deleteModal.style.display = 'flex'; // Show modal
            };
        });
    }

    // --- Event Listeners ---

    // Logout
    logoutBtn.addEventListener('click', () => {
        // In a real app, invalidate session/token
        localStorage.removeItem('loggedIn');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1300);
    });

    // Add Entry FAB
    addEntryFab.addEventListener('click', () => {
        window.location.href = 'create.html';
    });

    // Delete Confirmation Modal
    confirmDeleteBtn.addEventListener('click', () => {
        if (entryToDeleteId) {
            deleteEntry(entryToDeleteId);
            deleteModal.style.display = 'none'; // Hide modal
            entryToDeleteId = null; // Clear ID
        }
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none'; // Hide modal
    });

    function convertToPureNumbers(dateString) {
        const date = new Date(dateString);
    
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    
    async function applyFiltersAndSort() {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                showToast('You are not logged in. Please log in again.', 'error');
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirect to login page
                }, 4000);
                return;
            }
    
            // Fetch entries from the API
            const response = await fetch('https://tunga-diary-api.onrender.com/api/fullstack/diary/entries', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            let entries = await response.json();
    
            const query = searchBar.value.toLowerCase();
            const sortBy = sortByDate.value;
    
            // Filter entries based on search query
            let filteredEntries = entries.data.filter(entry =>
                entry.title.toLowerCase().includes(query) || entry.content.toLowerCase().includes(query)
            );
    
            // Sort entries using convertToPureNumbers
            if (sortBy === 'newest') {
                filteredEntries.sort((a, b) => convertToPureNumbers(b.createdAt) - convertToPureNumbers(a.createdAt));
            } else if (sortBy === 'oldest') {
                filteredEntries.sort((a, b) => convertToPureNumbers(a.createdAt) - convertToPureNumbers(b.createdAt));
            }
    
            // Render the filtered and sorted entries
            renderDiaryEntries(
                filteredEntries.map(entry => ({
                    ...entry,
                    formattedDate: formatDate(entry.createdAt), // Format the date for display
                }))
            );
        } catch (error) {
            console.error('Error fetching diary entries:', error);
            showToast('An error occurred while fetching diary entries.', 'error');
        }
    }
    
    // Event listeners
    searchBar.addEventListener('input', applyFiltersAndSort);
    sortByDate.addEventListener('change', applyFiltersAndSort);
    

    
    // Initial load
    fetchAndRenderEntries();
});