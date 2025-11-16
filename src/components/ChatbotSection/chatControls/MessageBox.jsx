import { Send } from 'lucide-react';

export const MessageBox = ({ input, setInput, onSend, loading }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="bg-white border-t border-gray-200 p-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message the assistant..."
                            className="w-full px-4 py-3 bg-transparent resize-none focus:outline-none text-sm text-gray-900"
                            rows={1}
                            disabled={loading}  // ← ADD THIS
                        />
                    </div>
                    <button
                        // On click, send the message. Handled by handleSend() method in Chatbot.jsx.
                        onClick={onSend}
                        disabled={!input.trim() || loading}
                        className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                    AI remembers your conversation history
                </p>
            </div>
        </div>
    );
};