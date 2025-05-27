// filepath: d:\DATN\supportchatbot\frontenduser\src\context\context.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [resultData, setResultData] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [selectedChatSession, setSelectedChatSession] = useState(null);
    const [reloadChatSessions, setReloadChatSessions] = useState(false);

    const onSent = async (prompt) => {
        const userPrompt = prompt || input;
        if (!userPrompt) return;

        setShowResult(true);
        setLoading(true);
        setRecentPrompt(userPrompt);
        setInput('');

        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.post('https://support-chatbot-5vca.onrender.com/chat', {
                message: userPrompt,
                chatSessionId: selectedChatSession ? selectedChatSession._id : null // Send chatSessionId if it exists
            }, {
                headers: {
                    Authorization: token,
                },
            });
            setResultData(response.data.response);
            setPrevPrompt(prev => [...prev, userPrompt]);
            setChatMessages(prev => [...prev, { sender_type: 'user', content: userPrompt, timestamp: new Date() }, { sender_type: 'chatbot', content: response.data.response, timestamp: new Date() }]); // Add user and bot messages to chat
            if (!selectedChatSession) {
                setSelectedChatSession({ _id: response.data.chatSession }); // Set selectedChatSession after creating a new chat
            }
            setReloadChatSessions(prev => !prev);
        } catch (error) {
            console.error("Error during chatbot interaction:", error);
            setResultData("Sorry, there was an error processing your request.");
        } finally {
            setLoading(false);
        }
    };

    const newChat = () => {
        setShowResult(false);
        setResultData('');
        setRecentPrompt('');
        setChatMessages([]); // Clear chat messages
        setSelectedChatSession(null); // Reset selected chat session
    };

    const contextValue = {
        input,
        setInput,
        onSent,
        recentPrompt,
        setRecentPrompt,
        resultData,
        showResult,
        loading,
        prevPrompt,
        newChat,
        chatMessages, // Add chatMessages to context
        setChatMessages, // Add setChatMessages to context
        selectedChatSession,
        setSelectedChatSession,
        reloadChatSessions,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;