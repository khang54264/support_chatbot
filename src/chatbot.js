import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const sendMessage = async () => {
        try {
            const result = await axios.post('http://localhost:5000/chat', { message }); // Thay đổi URL nếu backend của bạn khác
            setResponse(result.data.response);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setResponse('Có lỗi xảy ra khi giao tiếp với chatbot.');
        }
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div>
            <h1>My Custom Chatbot</h1>
            <div>
                <textarea
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn của bạn..."
                    rows={4}
                    cols={50}
                />
            </div>
            <button onClick={sendMessage}>Gửi</button>
            {response && (
                <div>
                    <h3>Chatbot:</h3>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}

export default Chatbot;