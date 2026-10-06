// === ELEMENT SELECTION ===
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

// === NOTES ARRAY — each note: { id, text, category, createdAt } ===
let notes = [];

// === LOAD FROM LOCALSTORAGE ON PAGE LOAD ===
function loadNotes() {
    const stored = localStorage.getItem('quicknotes');
    if (stored) {
        notes = JSON.parse(stored);
    }
    render();
}

// === SAVE TO LOCALSTORAGE ===
function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

// === RENDER FUNCTION — rebuilds the list from the notes array ===
function render() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    // Filter notes based on search
    const filtered = notes.filter(note =>
        note.text.toLowerCase().includes(searchTerm)
    );

    // Clear the list
    notesList.innerHTML = '';

    // Handle empty states
    if (notes.length === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (notes.length === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }

    // Show no results message if searching and nothing found
    if (filtered.length === 0 && searchTerm !== '') {
        const li = document.createElement('li');
        li.className = 'no-results';
        li.textContent = 'No notes match your search.';
        notesList.appendChild(li);
        return;
    }

    // Build note cards using createElement (never innerHTML for user text)
    filtered.forEach(note => {
        const li = document.createElement('li');
        li.className = `category-${note.category.toLowerCase()}`;

        // Note text
        const textP = document.createElement('p');
        textP.className = 'note-text';
        textP.textContent = note.text;

        // Meta row
        const metaDiv = document.createElement('div');
        metaDiv.className = 'note-meta';

        // Category label
        const categorySpan = document.createElement('span');
        categorySpan.className = 'note-category-label';
        categorySpan.textContent = note.category;

        // Date
        const dateSpan = document.createElement('span');
        dateSpan.className = 'note-date';
        dateSpan.textContent = note.createdAt;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteNote(note.id));

        metaDiv.appendChild(categorySpan);
        metaDiv.appendChild(dateSpan);
        metaDiv.appendChild(deleteBtn);

        li.appendChild(textP);
        li.appendChild(metaDiv);

        notesList.appendChild(li);
    });
}

// === ADD NOTE ===
function addNote(e) {
    e.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    // Validation
    if (text === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }

    // Clear error
    errorMessage.textContent = '';

    // Create note object
    const note = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    // Add to array
    notes.unshift(note);

    // Save and re-render
    saveNotes();
    render();

    // Clear input
    noteInput.value = '';
}

// === DELETE NOTE ===
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render();
}

// === CLEAR ALL NOTES ===
function clearAllNotes() {
    if (notes.length === 0) return;
    const confirmed = confirm('Delete all notes?');
    if (confirmed) {
        notes = [];
        saveNotes();
        render();
    }
}

// === SEARCH ===
function handleSearch() {
    render();
}

// === EVENT LISTENERS ===
if (noteForm) {
    noteForm.addEventListener('submit', addNote);
}

if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllNotes);
}

// === INIT ===
loadNotes();