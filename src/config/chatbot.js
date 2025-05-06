// See https://developers.google.com/apps-script/guides/properties
// for instructions on how to set the API key.
const {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require('@google/generative-ai');
const MODEL_NAME = 'gemini-2.5-flash';
const API_KEY = process.env.CHATBOT_API_KEY;

async function runChat(input) {
    const genAI = new GoogleGenerativeAI({apiKey: API_KEY});
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    const generationConfig = {
        temperature: 0.9,
        maxOutputTokens: 2048,
        topP: 1,
        topK: 1,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUAL_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },

    ]

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [

        ],
    });

    const result = await chat.sendMessage(input);
    const response = result.response;
    console.log(response.text());
}

export default runChat;