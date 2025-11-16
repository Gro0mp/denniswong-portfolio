import { Message } from './Message.jsx';
import { useEffect, useRef } from 'react';

export const MessageList = ({ messages, loading }) => {
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <p className="text-lg font-medium">Start a conversation</p>
                        <p className="text-sm mt-2">Ask me anything!</p>
                    </div>
                ) : (
                    <>
                        {messages.map(msg => (
                            <Message key={msg.id} message={msg} />
                        ))}
                        {loading && (
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                                    AI
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};