# Gemini AI Integration Plan

This document outlines the plan to integrate Gemini AI into the Lesson Plan Generator application.

## High-Level Plan

The goal is to enable users to generate lesson plan content based on a subject and a user-provided topic. To maintain the existing structure and avoid breaking changes, a new, separate "AI Lesson Plan Generator" page will be created.

## Detailed Steps

1.  **API Key Management:**
    *   Add a section to the main page (`index.html`) for the user to enter and save their Gemini API key.
    *   The API key will be stored in the browser's `localStorage` for persistence.

2.  **New AI-Powered Subject:**
    *   Create a new subject page named "AI Lesson Plan Generator" by duplicating the `pages/new_template` directory.
    *   A new button will be added to the main page to navigate to this new section.

3.  **UI Enhancements for AI Interaction:**
    *   On the new "AI Lesson Plan Generator" page (`pages/ai_generator/ai_generator.html`), add an input field for the lesson's "Topic" and a "Generate with AI" button.

4.  **Implement AI Generation Logic:**
    *   In `pages/ai_generator/ai_generatorformlogic.js`, write the necessary JavaScript to:
        *   Construct a prompt for the Gemini API using the selected subject and the provided topic.
        *   Call the Gemini API using the user's saved API key.
        *   Parse the AI's response.
        *   Automatically populate the lesson plan form fields with the generated content.

5.  **Content Handling:**
    *   The existing form handling mechanism (`ai_generatorformhandle.html` and `ai_generatorformhandler.js`) will be used to display the AI-generated and user-edited content in a printable format.
