import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

export const getAIResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Or "gpt-3.5-turbo" if you want a cheaper alternative
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error: Unable to fetch response from AI.";
  }
};