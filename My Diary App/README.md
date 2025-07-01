# MemoryNest - Your Digital Diary

## Table of Contents

- [About MemoryNest](#about-memorynest)
- [Features](#features)
- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [API Configuration](#api-configuration)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
---

## About MemoryNest

MemoryNest is your private digital diary, designed to help you capture and cherish life's moments. Easily record your thoughts, experiences, and reflections in a secure and personal space. It's more than just a diary; it's a growing collection of your memories, always accessible, helping you build a rich, personal history.

## Features

* **User Authentication:** Secure login functionality to protect your personal diary entries.
* **Effortless Browse:** View all your diary entries in a clean, organized library.
* **Seamless Creation:** A dedicated page for writing new diary entries with a focus on content.
* **Quick Edits:** An intuitive modal interface for fast in-place editing of existing entries.
* **Simple Deletion:** Delete entries with a confirmation step to prevent accidental loss.
* **Smart Search & Filter:** Easily find specific memories using keywords and the sort by date option.
* **Detailed View:** A dedicated page to view individual entries in full detail.
* **Calm & Beautiful UI:** A minimalist design with a soothing color palette for an optimal journaling environment.

## Live Demo

You can access a live version of the MemoryNest application here:
[https://chisom-diaryapp.netlify.app)

## Technologies Used

MemoryNest is built using a modern frontend stack with a focus on simplicity and performance:

* **HTML5:** For structuring the web content.
* **CSS3:** For styling and ensuring a responsive, aesthetically pleasing user interface.
* **JavaScript (Vanilla JS):** For all client-side logic, API interactions, and dynamic content manipulation without reliance on heavy frameworks.
* **Google Fonts:**
    * **Playfair Display:** For headings and titles, providing an elegant, classic feel.
    * **Inter:** For body text and UI elements, ensuring readability and a modern look.

## API Configuration

MemoryNest interacts with an external backend API to store and retrieve diary entries.

* **API Endpoint:**
    All API requests are directed to the following base URL:
    `https://tunga-diary-api.onrender.com`

* **Authentication:**
    User authentication is handled via **Bearer Tokens**. Upon successful login, an `authToken` is received from the API and stored in the browser's `localStorage`. This token is then included in the `Authorization` header of subsequent API requests to protected routes (e.g., fetching, creating, updating, or deleting diary entries).

* **No Client-Side API Key Configuration Required:**
    For this application, the API endpoint is directly embedded in the JavaScript code (e.g., in `home.js`, `create.js`, `view.js`, `login.js`). There are no environment variables or separate configuration files required on the client-side for API keys. If you were to develop a more complex application, you might use environment variables for API endpoints or keys, but for this project, direct embedding is sufficient.

## Setup Instructions

Follow these steps to get MemoryNest up and running on your local machine for development and testing purposes.

### Prerequisites

* A modern web browser (e.g., Chrome, Firefox, Edge, Safari).
* A code editor (e.g., VS Code, Sublime Text).
* (Optional but Recommended) Git installed on your system.

### Local Setup

1.  **Clone the Repository (if using Git):**
    ```bash
    https://github.com/ChisomMbagwu/Diary-App.git
    ```
    If not using Git, you can simply download the project ZIP file and extract it.

2.  **Navigate to the Project Directory:**
    ```bash
    cd ChisomMbagwu/Diary-App
    ```

3.  **Open in Browser:**
    Locate the `index.html` file in the root of your project directory.
    * **Option A (Simplest):** Double-click the `index.html` file. Your browser will open the application directly.
    * **Option B (Recommended for development):** If you have a local web server setup (like VS Code's Live Server extension, Python's `http.server`, or Node.js `serve`), start the server in the project's root directory and then navigate to `http://localhost:PORT` in your browser. This is generally better for handling pathing and API requests consistently.

    Your MemoryNest application should now be running locally in your browser!


## Project Structure

```
my diary app/
├── landing.html          <-- The main landing page
├── index.html            <-- The main diary library page (Home)
├── login.html            <-- User login page
├── create.html           <-- Page for adding new diary entries
├── view.html             <-- Page for viewing a single diary entry
├── css/
│   └── style.css         <-- All application styles
└── js/
    ├── common.js         <-- Shared utility functions (e.g., showToast, formatDate)
    ├── landing.js        <-- Script for landing page interactions
    ├── login.js          <-- Script for login page functionality
    ├── home.js           <-- Script for diary library (fetching, deleting, sorting, filtering, edit modal)
    ├── create.js         <-- Script for creating new entries
    └── view.js           <-- Script for viewing a single entry in detail
```
