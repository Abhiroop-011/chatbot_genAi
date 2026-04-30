# Scaler AI Mentor - Persona-Based Chatbot

A full-stack, persona-based AI chatbot featuring three distinct Scaler/InterviewBit personalities: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. Built as part of the Prompt Engineering curriculum.

**Live Frontend Demo:** [https://abhiroop-chatbot.netlify.app](https://abhiroop-chatbot.netlify.app)

## Tech Stack
*   **Frontend:** React.js, Vite, CSS (Deployed on Netlify)
*   **Backend:** Node.js, Express.js (Deployed on Render)
*   **AI Model:** Google Gemini 1.5 Flash API
*   **Prompt Engineering:** Few-shot prompting, Chain-of-Thought (CoT), strict behavioral constraints.

## Features
*   **Distinct AI Personas:** Three uniquely engineered system prompts that alter the AI's background, tone, and teaching methodology.
*   **Seamless Context Switching:** Changing the active persona dynamically updates the UI state and clears the previous conversation history.
*   **Premium UI/UX:** Features a dark-mode dashboard, dynamic suggestion chips tailored to each persona, and a typing indicator during API resolution.
*   **Secure API Handling:** API calls are routed through a dedicated backend server to protect keys from client-side exposure.

## Local Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <your-github-repo-link>
cd persona-chatbot
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`
*   Create a `.env` file in the `backend/` directory.
*   Add your Gemini API Key: `GEMINI_API_KEY=your_actual_key_here`
*   Start the server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
\`\`\`
*   *(Note: Ensure the fetch URL in `App.jsx` points to `http://localhost:8080/api/chat` for local testing).*
*   Start the React app:
\`\`\`bash
npm run dev
\`\`\`

## Documentation
*   `prompts.md`: Contains the complete system prompts, few-shot examples, and architectural reasoning for the AI behavior.
*   `reflection.md`: A 300+ word reflection on the prompt engineering process and the GIGO principle.