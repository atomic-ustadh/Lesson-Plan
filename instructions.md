This guide has been updated for **Netlify**.

### Step-by-Step Guide: Securely Integrating Gemini AI with Netlify

---

#### **Part 1: Prerequisites**

Before you begin, make sure you have the following:

1.  **Node.js and npm:** You need these to initialize a project and manage packages. You can get them from [nodejs.org](https://nodejs.org/).
2.  **A Netlify Account:** Sign up for a free account at [netlify.com](https://netlify.com). It's easiest to sign up using your GitHub, GitLab, or Bitbucket account.
3.  **A Gemini API Key:** Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
4.  **Netlify CLI (Optional but Recommended):** For easy local testing. Install it globally: `npm install -g netlify-cli`.

---

#### **Part 2: Setting Up Your Project Locally**

Let's create the project structure and install the necessary tools for Netlify.

1.  **Create a Project Folder:**
    Open your terminal or command prompt and create a new folder for your project.
    ```bash
    mkdir gemini-netlify-app
    cd gemini-netlify-app
    ```

2.  **Initialize a Node.js Project:**
    This creates a `package.json` file to track your project's dependencies.
    ```bash
    npm init -y
    ```

3.  **Install the Google AI SDK:**
    This package will be used by our serverless function to communicate with the Gemini API.
    ```bash
    npm install @google/generative-ai
    ```

4.  **Create the Serverless Function:**
    Netlify's convention is to place functions in a `netlify/functions` directory.
    - Create a folder named `netlify`.
    - Inside `netlify`, create another folder named `functions`.
    - Inside `netlify/functions`, create a file named `generate.js`.

    Your folder structure should now look like this:
    ```
    gemini-netlify-app/
    ├── netlify/
    │   └── functions/
    │       └── generate.js
    └── package.json
    ```

5.  **Write the Code for the Netlify Function (`netlify/functions/generate.js`):**
    This is the secure proxy. The syntax is slightly different from Vercel's. It uses an `exports.handler` with an `event` object.

    ```javascript
    // File: netlify/functions/generate.js

    // 1. Import the Google AI SDK
    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // 2. Access your API key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // 3. Define the main function handler for Netlify
    exports.handler = async function (event, context) {
      // 4. Ensure the request is a POST request
      if (event.httpMethod !== 'POST') {
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' }),
        };
      }

      try {
        // 5. Get the user's prompt from the event body
        // The body is a string, so it needs to be parsed
        const { prompt } = JSON.parse(event.body);

        if (!prompt) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Prompt is required' }),
          };
        }

        // 6. Select the Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // 7. Send the prompt to the model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // 8. Send the generated text back to the frontend
        // The body must be a stringified JSON object
        return {
          statusCode: 200,
          body: JSON.stringify({ text }),
        };

      } catch (error) {
        // 9. Handle any errors
        console.error("Error calling Gemini API:", error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to generate content' }),
        };
      }
    };
    ```

---

#### **Part 3: Building the Frontend**

The frontend code is almost identical, but we need to change the `fetch` URL to point to the correct Netlify function endpoint.

1.  **Create `index.html` and `script.js`:**
    Follow the same steps as before to create your `index.html` and `script.js` files in the root of your project. The HTML code does not need to change.

2.  **Update the Frontend Logic (`script.js`):**
    Change the `fetch` path to `/.netlify/functions/generate`.

    ```javascript
    // File: script.js

    // ... (get references to HTML elements, same as before)
    const generateBtn = document.getElementById('generate-button');
    const promptInput = document.getElementById('prompt-input');
    const resultDiv = document.getElementById('result-output');
    const loadingDiv = document.getElementById('loading-indicator');


    generateBtn.addEventListener('click', async () => {
      const prompt = promptInput.value;
      if (!prompt) {
        alert("Please enter a prompt.");
        return;
      }

      loadingDiv.style.display = 'block';
      generateBtn.disabled = true;
      resultDiv.textContent = '';

      try {
        // 4. Make the API call to our Netlify serverless function
        // The path is '/.netlify/functions/generate'
        const response = await fetch('/.netlify/functions/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        resultDiv.textContent = data.text;

      } catch (error) {
        console.error("Error:", error);
        resultDiv.textContent = 'Failed to get a response. Please check the console and try again.';
      } finally {
        loadingDiv.style.display = 'none';
        generateBtn.disabled = false;
      }
    });
    ```

---

#### **Part 4: Deployment and Final Configuration**

Now we'll push our code to GitHub and deploy it with Netlify.

1.  **Push to GitHub:**
    - Create a new repository on GitHub.
    - Follow the instructions on GitHub to push your `gemini-netlify-app` folder to the new repository.

2.  **Deploy on Netlify:**
    - Log in to your Netlify dashboard.
    - Click "Add new site" -> "Import an existing project".
    - Connect to your Git provider and select the repository you just created.
    - Netlify will automatically detect that you have a simple static site. The build settings can be left as default. Click **"Deploy site"**.

3.  **Set the Environment Variable (Crucial Step):**
    - After the site is created, go to the site's dashboard in Netlify.
    - Go to **Site settings** -> **Build & deploy** -> **Environment**.
    - Click **"Edit variables"**.
    - Add a new variable:
        - **Key:** `GEMINI_API_KEY`
        - **Value:** Paste your secret Gemini API key here.
    - Click **"Save"**.

4.  **Trigger a Redeploy:**
    - To make sure the environment variable is active, go to the **Deploys** tab for your site.
    - Find the top deployment, click the "Retry deploy" dropdown, and select **"Deploy site"**.

5.  **Test Your Live Application:**
    - Once the deployment is finished, Netlify will provide you with a public URL (e.g., `your-app-name.netlify.app`).
    - Open the URL, enter a prompt, and click "Generate". It should now work securely!

#### **Local Testing (Optional)**
If you installed the Netlify CLI, you can test everything locally by running:
`netlify dev`
This command will start a local server and run your functions, just like on the live site.