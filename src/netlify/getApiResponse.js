const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Access from server environment
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.choices[0].message.content),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching response from OpenAI",
    };
  }
};