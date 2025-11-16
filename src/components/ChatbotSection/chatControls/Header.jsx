import { useNavigate } from 'react-router-dom';

export const Header = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-800">Chat Assistant</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                    Welcome, {user.username}
                </span>
                <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};