const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const systemPrompts = require('./prompts');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, persona } = req.body;

        if (!message || !persona) {
            return res.status(400).json({ error: "Message and persona are required." });
        }

        const systemInstruction = systemPrompts[persona];

        if (!systemInstruction) {
            return res.status(400).json({ error: "Invalid persona selected." });
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent(message);
        const responseText = result.response.text();

        res.status(200).json({ response: responseText });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to communicate with the AI model." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});