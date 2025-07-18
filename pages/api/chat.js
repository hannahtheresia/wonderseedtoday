import { generatePrompt } from "../../lib/prompt";



import { OpenAI } from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Handle POST requests to this route
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  //const { prompt } = req.body;

  const { userInput } = req.body;  // z.B. roher Input von der Webseite
const prompt = generatePrompt(userInput);  // hier baust du den kompletten Prompt





  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4", // You can change this to "gpt-3.5-turbo" if needed
      messages: [{ role: "user", content: prompt }]
    });

    res.status(200).json({
      result: chatResponse.choices[0].message.content
    });
  } catch (error) {
    console.error('Error contacting OpenAI:', error);
    res.status(500).json({ message: 'Error communicating with OpenAI' });
  }
}

