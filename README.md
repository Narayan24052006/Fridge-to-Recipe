# Fridge to Recipe (AI-powered React App)

## Problem Statement
Calling an AI model is easy, but building reliable interfaces on top of unpredictable LLM output is hard. The goal of this assignment is to build a small React application that turns free-form text into an interactive tool—specifically, not just a chatbot. It requires requesting structured JSON data from an LLM, rigorously parsing and validating the output before it hits the UI, and handling all realistic failure modes (malformed JSON, rate limits, wrong shapes, or slow responses) without crashing the application.

## What is being achieved
This project successfully implements a **Fridge-to-Recipe** generator:
- **Structured Data UI:** Takes free-form ingredient lists from the user and turns them into a strict JSON schema via the Gemini API.
- **Defensive Parsing:** Uses Zod to parse and validate the AI's response before rendering. If the model hallucinates or returns malformed data, it routes to a safe Error State.
- **Interactive Experience:** Renders the data not as plain text, but as an interactive UI featuring scalable servings and checkable instruction steps.
- **Robust Error Handling:** Features dedicated UI components for loading states and error boundaries, completely eliminating blank screens or silent failures.
- **Backend Proxy:** Keeps the Gemini API key out of the browser by routing requests through a lightweight local Express server.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Rename the `.env.example` file to `.env` (or create a new `.env` file in the root directory) and add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 3. Run the Backend Proxy Server
The backend server securely holds the API key and forwards requests to Gemini.
Open a terminal and run:
```bash
node server/generate.mjs
```

### 4. Run the Frontend Development Server
Open a second terminal window and start Vite:
```bash
npm run dev
```

### 5. Open the App
Visit the URL provided by Vite in your browser (usually `http://localhost:5173`).

## Known Limitations

- **Backend Architecture:** The Express backend proxy is designed specifically for this local development environment to keep the API key safe. In a production environment, this would ideally be deployed as a serverless function (e.g., a Next.js API route or Vercel Function).
- **Strict Error Fallback:** If the LLM generates wildly unstructured text that bypasses the strict JSON prompt instructions, the app values reliability over fragile rendering. It will fall back to an error state rather than attempting to guess how to render the broken data.
- **Rate Limiting:** If using a free-tier Gemini API key, spikes in demand or exceeding request quotas will result in temporary `503` or `429` errors. The application handles this gracefully by displaying an error state with a "Try Again" button.
- **Ingredient Scaling:** The scaling logic for servings uses simple math on the base amounts. Certain ingredients might result in awkward fractions when scaled (e.g., 1.5 of an egg).

## AI Usage Note
AI was utilized in scaffolding the boilerplate code, implementing specific Tailwind CSS styling combinations, and generating the prompt instructions. The core React architecture, Zod validation logic, and defensive state management (including race condition prevention) were carefully refined by hand to ensure a robust user experience capable of handling unpredictable LLM behavior.

## Time Spent
- UI/UX Design & Components: ~1 hour
- LLM Integration & Schema parsing: ~1 hour
- Error handling & edge cases: ~30 mins
- Total: ~2.5 hours
