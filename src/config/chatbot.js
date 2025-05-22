// See https://developers.google.com/apps-script/guides/properties
// for instructions on how to set the API key.\
// npm install @google/genai mime
// npm install -D @types/node
import {GoogleGenAI} from '@google/genai';
import faqData from './faqData';

async function runChat(prompt) {
    const ai = new GoogleGenAI({
        apiKey: "AIzaSyCclBNwb3cwzhhZdJlOUDM3-cCUm-0tsA8",
    });
    const config = {
        responseMimeType: 'text/html',
    };
    const model = 'gemini-1.5-flash';
    const faq = faqData.find(faqItem => faqItem.question.toLowerCase() === prompt.toLowerCase());

    if (faq) {
        console.log("FAQ Matched (Frontend):", faq.answer); // Log the FAQ answer
        return faq.answer;
    } else {
        try{
            const response = await ai.models.generateContent({
                model,
                contents: [{
                    role: 'user',
                    parts: [{
                        text: prompt,
                    },],
                },],
            }, config);
            console.log(response);
            return response.text;
        }catch (error) {
            console.error("Error communicating with backend:", error);
            return "Sorry, I don't have an answer for that question. Do you want to send the message to the lecturer ?";
        }
    }
}

export default runChat;

// async function runChat(prompt) {
//     const ai = new GoogleGenAI({
//         apiKey: process.env.CHATBOT_API_KEY,
//     });
//     const config = {
//         responseMimeType: 'text/html',
//     };
//     const model = 'gemini-1.5-flash';

//     try{
//         const response = await ai.models.generateContent({
//             model,
//             contents: [{
//                 role: 'user',
//                 parts: [{
//                     text: prompt,
//                 },],
//             },],
//         }, config);
//     console.log(response);
//     return response.text;
//   }catch (error) {
//     console.error("Error communicating with backend:", error);
//     return "Error: Could not get response from chatbot.";
//   }
   

//     return ""   ;
// }

// export default runChat;