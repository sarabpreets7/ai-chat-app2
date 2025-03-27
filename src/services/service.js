import { OpenAI } from 'openai';
// Move sensitive logic to a secure serverless function
export const getAIResponse = async (message) => {
  try {
    const response = await fetch('../netlify/getAIResponse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.content; // Assuming serverless function returns { content: "..." }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error: Unable to fetch response from AI.";
  }
};