import {useEffect, useState} from 'react';
import {Header} from '../components/ChatbotSection/chatControls/Header.jsx';
import {MessageList} from '../components/ChatbotSection/chatControls/MessageList.jsx';
import {MessageBox} from '../components/ChatbotSection/chatControls/MessageBox.jsx';
import VideoControls from "../components/ChatbotSection/videoControls/VideoControls.jsx";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";


const api = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default function Chatbot() {

    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load the chat history for the user
    const loadChatHistory = async (userId) => {
        try {
            const response = await api.get(`/api/v1/chat/user/${userId}`);
            const chatHistory = response.data;

            const formattedChatHistory = chatHistory.toReversed().flatMap(chat => [
                {
                    id: `${chat.id}-user`,
                    role: 'user',
                    content: chat.message,
                },
                {
                    id: `${chat.id}-assistant`,
                    role: 'assistant',
                    content: chat.response,
                }
            ]);

            setMessages(formattedChatHistory)
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    const handleSend = async () => {
        if (!input.trim() || !user || loading) return;

        const userMessage = input.trim();
        const tempUserMessage = {
            id: `temp-user-${Date.now()}`,
            role: 'user',
            content: userMessage,
        };

        // Add all the user messages
        setMessages((prevMessages) => [...prevMessages, tempUserMessage]);
        setInput('');
        setLoading(true);

        try {
            // Add the user message to the backend
            const response = await api.post('http://localhost:8080/api/v1/chat/receive-message', {
                userId: user.id,
                message: userMessage,
            });

            // Add the AI response message
            const aiMessage = {
                id: `${response.data.id}-assistant`,
                role: 'assistant',
                content: response.data.response,
            };

            // Update the messages state with the AI message
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);

            // Add error message
            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setLoading(false);
        }
    }

    // Get the user and their messages from navigation state or local storage
    useEffect(() => {
        if (location.state?.user) {
            const user = location.state.user;
            setUser(user);
            loadChatHistory(location.state.user.id).then();
            console.log(user.username);
        } else {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                loadChatHistory(parsedUser.id).then();
            } else {
                navigate('/login');
            }
        }
    }, [location, navigate]);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <VideoControls/>
            <Header user={user}/>
            <MessageList messages={messages} loading={loading}/>
            <MessageBox
                input={input}
                setInput={setInput}
                onSend={handleSend}
                loading={loading}
            />
        </div>
    );
}



