import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI GPT-3.5 client (free tier)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// GPT endpoint with debug logs
app.post("/api/gpt", async (req, res) => {
  console.log("🚀 Received a request to /api/gpt");
  const { prompt } = req.body;
  console.log("📝 Prompt received:", prompt);

  if (!prompt) {
    console.log("⚠️ No prompt provided!");
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    console.log("⏳ Sending request to GPT-3.5...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // <-- free version
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    });

    const text = response.choices?.[0]?.message?.content;
    console.log("✅ GPT-3.5 response received:", text);

    if (!text) {
      console.log("⚠️ GPT-3.5 returned no content");
      return res.status(500).json({ error: "No response from GPT-3.5" });
    }

    res.json({ text });
  } catch (err) {
    console.error("❌ GPT request error:", err);
    res.status(500).json({ error: "GPT request failed", details: err.message });
  }
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
