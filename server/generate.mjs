import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in environment variables.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

app.post('/api/generate', async (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: "Valid text input is required." });
  }

  const prompt = `
You are a culinary AI assistant. The user provides ingredients currently available.
Create an achievable, cohesive recipe using mostly these items (standard pantry staples like oil, salt, pepper, or water are permitted).

Output MUST be strictly valid JSON matching this schema:
{
  "title": "Recipe Name",
  "description": "A concise 1-2 sentence description",
  "baseServings": 2,
  "ingredients": [
    { "item": "Ingredient Name", "amount": 100, "unit": "g" }
  ],
  "steps": [
    "Step 1 description",
    "Step 2 description"
  ],
  "swaps": [
    { "original": "Ingredient name", "alternative": "Substitute suggestion" }
  ]
}

Available ingredients: ${input}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      return res.status(502).json({ error: "Empty model output received." });
    }

    res.json({ data: responseText });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to generate recipe from provider." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend proxy running on http://localhost:${PORT}`);
});