// Load environment variables at the very top.
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { Configuration, OpenAIApi } = require('openai');

app.use(express.json()); // for parsing application/json

// Configure OpenAI using the API key stored in your .env file.
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api/generateQuestion', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    const responseText = completion.data.choices[0].text.trim();

    // Try parsing the response as JSON.
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      // Fallback: if the response isn’t valid JSON, send a default message.
      result = {
        question: "Sorry, the question could not be generated.",
        answer: ""
      };
    }
    res.json(result);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Error generating question" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
