const { GoogleGenAI } = require('@google/genai');
const Faq = require('../models/faq');
const ChatSession = require('../models/chatsession');
const ChatMessage = require('../models/chatmessage');
const mongoose = require('mongoose');
const Chatbot = require('../models/chatbot'); // Import the Chatbot model
const chatbotConfig = require('../config/chatbotConfig'); // Import the chatbot config

const apiKey = "AIzaSyCclBNwb3cwzhhZdJlOUDM3-cCUm-0tsA8";

let embedder = null; // Store the embedding pipeline
let faqEmbeddings = {}; // Store FAQ embeddings

async function initializeFAQEmbeddings() {
    console.log("Initializing FAQ embeddings...");
    try {
        const { pipeline } = await import('@xenova/transformers'); // Dynamic import
        embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

        const faqs = await Faq.find({});
        for (const faq of faqs) {
            const output = await embedder(faq.question, { pooling: 'mean', normalize: true });
            faqEmbeddings[faq._id] = Array.from(output.data); // Store as array
        }
        console.log("FAQ embeddings initialized.");
    } catch (error) {
        console.error("Error initializing FAQ embeddings:", error);
    }
}

// Call this function when your server starts
initializeFAQEmbeddings();

// Cosine Similarity function
function cosineSimilarity(a, b) {
    if (!a || !b || a.length === 0 || b.length === 0) {
        return 0; // Handle empty vectors
    }
    const dotProduct = a.reduce((sum, a_i, i) => sum + a_i * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, a_i) => sum + a_i * a_i, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, b_i) => sum + b_i * b_i, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

// Function to generate chat response
exports.generateChatResponse = async (req, res) => {
  console.log("generateChatResponse called");
  const userMessage = req.body.message;
  const chatSessionId = req.body.chatSessionId; // Get chatSessionId from request body
  console.log("User message:", userMessage);
  console.log("Chat Session ID:", chatSessionId);

  // Check if userMessage is provided
  if (!userMessage) {
    console.log("Missing message in request");
    return res.status(400).json({ error: "Missing 'message' in request" });
  }

  try {
    //Finding FAQ
    console.log("Trying to find FAQ");
    let bestFaq = null;
    let maxSimilarity = 0;
    const similarityThreshold = 0.75; // Adjust this threshold

    if (embedder) {
      const userMessageOutput = await embedder(userMessage, { pooling: 'mean', normalize: true });
      const userMessageEmbedding = Array.from(userMessageOutput.data);

      for (const faqId in faqEmbeddings) {
        const similarity = cosineSimilarity(userMessageEmbedding, faqEmbeddings[faqId]);
        if (similarity > maxSimilarity) {
          maxSimilarity = similarity;
          bestFaq = await Faq.findById(faqId);
        }
      }
    }
    
    if (bestFaq && maxSimilarity > similarityThreshold) {
      console.log(`FAQ found with similarity ${maxSimilarity}, returning answer: ${bestFaq.answer}`);
      result = bestFaq.answer;
      // return res.json({ response: bestFaq.answer, source: 'faq' });
    } else {
      // If no FAQ found, call Gemini API
    const genAI = new GoogleGenAI({ apiKey: apiKey });
    const config = {responseMimeType: 'text/html',};
    const model = 'gemini-1.5-flash';
    //FAQ Not Found, call Gemini API
    console.log("No FAQ found, calling Gemini API");
    let result ='';
    try{
        const response = await genAI.models.generateContent({
            model,
            contents: [{
                role: 'user',
                parts: [{
                    text: userMessage,
                },],
            },],
        }, config);
        console.log(response);
        result = response.text;
        }catch (error) {
            console.error("Error communicating with backend:", error);
            return res.status(500).json({ response: "Sorry, I can't answer to that question. Do you want to send the message to the lecturer ?", source: 'error' }); // Return as JSON
    }
    console.log("Gemini API result:", result);
    }
    
    console.log("Trying to find chatbot");
    const chatbot = await Chatbot.findOne({});
    console.log("Chatbot result:", chatbot);
    // Check if chatbot exists
    if (!chatbot) {
      console.log("Chatbot not found");
      return res.status(500).json({ error: "Chatbot not found" });
    }
    
    //Create chat session and messages
    let chatSession;
    if (!chatSessionId) {
      // Create new chat session
      console.log("Creating new chat session");
      chatSession = new ChatSession({
        title: userMessage,
        type: 'chatbot',
        status: 'active',
        uid: req.user.userId,
        lid: [],
      });
      await chatSession.save();
      req.session.chatSessionId = chatSession._id;
      console.log("New chat session created with ID:", chatSession._id);
    } else {
      // Use existing chat session
      console.log("Using existing chat session");
      chatSession = await ChatSession.findById(chatSessionId);
      if (!chatSession) {
        return res.status(404).json({ error: "Chat session not found" });
      }
    }
    console.log("Chat session:", chatSession);

    //Create user messages
    console.log("Creating user chat message: ", userMessage);
    const userChatMessage = new ChatMessage({
      chatsid: chatSession._id,
      sender_type: 'user',
      senderid: req.user.userId,
      content: userMessage,
      status: 'sent',
    });
    await userChatMessage.save();
    console.log("User chat message created");

    // Update chat session with user message
    chatSession.messages.push(userChatMessage._id);
    await chatSession.save();
    console.log("Chat session updated with user message: ", userChatMessage.content);

    //Create chatbot messages
    console.log("Creating chatbot chat message: ", result);
    const chatbotChatMessage = new ChatMessage({
      chatsid: chatSession._id,
      sender_type: 'chatbot',
      senderid: chatbot._id,
      content: result,
      status: 'received',
    });
    await chatbotChatMessage.save();
    console.log("Chatbot chat message created: ", chatbotChatMessage.content);

    // Update chat session with chatbot message
    chatSession.messages.push(chatbotChatMessage._id);
    await chatSession.save();
    console.log("Chat session updated with chatbot message: ");

    try {
        const chatsession = await ChatSession.findById(chatSession._id);
        console.log("Chat session found:", chatsession);

    if (!chatsession) {
      console.log("Chat session unfound");
      return res.status(404).send();
    }

    // Populate the messages array
    await chatsession.populate({
      path: 'messages',
      model: 'chatMessage',
      options: { sort: { timestamp: 1 } }
    });
         res.json({ response: result, source: 'chatbot', chatSession: chatsession }); // Send back chatSession
      } catch (error) {
        console.error("Error getting chat session by ID:", error);
        res.status(500).send(error);
      }

  } catch (error) {
    console.error("Error in generateChatResponse:", error);
    res.status(500).json({ error: error.message });
  }
};