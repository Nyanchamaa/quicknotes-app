# QuickNotes

Your simple note-taking companion. A clean, fast, browser-based app for capturing and organising notes by category — no login, no backend, no fuss.

## Features

- **Add notes** with a category (Personal, Work, Study)
- **Delete individual notes** or clear all at once
- **Search notes** in real time — filters as you type
- **Category colour coding** — teal for Personal, red for Work, blue for Study
- **Note count** — updates live as you add or remove notes
- **Validation** — empty notes and notes over 200 characters are rejected with a clear error message
- **Data persistence** — notes survive a page refresh using localStorage
- **Responsive design** — works on mobile screens (600px and below)

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nyanchama/quicknotes-app.git
   ```
2. Open the project folder
3. Open `index.html` in your browser — or use **Live Server** in VS Code for auto-reload

No build tools, no dependencies, no installation required.

## Project Structure

```
quicknotes-app/
├── index.html      # Main app page
├── about.html      # About page
├── style.css       # All styles including responsive layout
├── script.js       # All JavaScript logic
└── README.md       # This file
```

## What I Learned

- How to manipulate the DOM safely using `createElement` and `textContent` instead of `innerHTML` to prevent XSS vulnerabilities
- How to use `localStorage` with `JSON.stringify` and `JSON.parse` to persist data across page sessions
- How to structure a project with semantic HTML5 elements (`header`, `main`, `section`, `footer`) for accessibility and clarity
- How CSS Flexbox simplifies responsive form layouts and card arrangements
- How to write modular JavaScript with a single `render()` function that rebuilds the UI from the data array — keeping logic and display cleanly separated