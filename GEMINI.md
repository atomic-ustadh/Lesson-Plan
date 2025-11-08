# GEMINI Project Analysis: Lesson Plan Generator

## Project Overview

This repository contains a client-side web application for generating lesson plans, primarily for Islamic studies subjects. The application is designed for Arabic-speaking educators, with a right-to-left (RTL) user interface.

**Key Technologies:**
*   **Frontend:** HTML, CSS, vanilla JavaScript
*   **Styling:** Tailwind CSS and a custom stylesheet (`style/styleit.css`)
*   **Architecture:** The application is entirely client-side. There is no backend or database. Data is passed between pages using URL parameters.

**Core Functionality:**
*   Users are prompted for their name, which is displayed on the main page.
*   The main page (`index.html`) displays a list of subjects.
*   Clicking on a subject takes the user to a form to create a lesson plan for that subject.
*   The `new_template` directory provides a starting point for creating new subject pages.
*   Upon form submission, the data is passed to a `formhandle.html` page, which formats the data into a printable lesson plan.

## Building and Running

This is a client-side application with no build process.

**To run the application:**

1.  Clone the repository.
2.  Open the `index.html` file in a web browser.

**To run tests:**

There are no automated tests in this project.

## Development Conventions

### Adding a New Subject

To add a new subject, follow these steps:

1.  Create a new directory for the subject in the `pages` directory (e.g., `pages/new_subject/`).
2.  Copy the contents of the `pages/new_template/` directory into the new subject's directory.
3.  Rename the files in the new directory to match the new subject (e.g., `new_template.html` -> `new_subject.html`).
4.  Update the `action` attribute in the form in `new_subject.html` to point to `new_subjectformhandle.html`.
5.  Update the JavaScript file (`new_subjectformlogic.js`) to ensure it correctly handles the form submission and redirects to `new_subjectformhandle.html`.
6.  Add a new button for the subject in `script/select-sub.js`.

### Code Style

*   The project uses a mix of Tailwind CSS classes and a custom stylesheet.
*   JavaScript is written in a procedural style.
*   File and directory names are in English, while the UI is in Arabic.

### Contribution Guidelines

There are no explicit contribution guidelines. Based on the project structure, contributions should follow the existing pattern of creating a new directory for each subject.
