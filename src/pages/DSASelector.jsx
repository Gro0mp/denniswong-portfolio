import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DSASelector = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const dataStructures = [
        {
            id: 'array',
            title: 'Arrays',
            description: 'Dynamic arrays, operations, and algorithms',
            icon: '📊',
            color: 'from-blue-600 to-blue-800',
            difficulty: 'Beginner'
        },
        {
            id: 'linked-list',
            title: 'Linked Lists',
            description: 'Singly, doubly, and circular linked lists',
            icon: '🔗',
            color: 'from-green-600 to-green-800',
            difficulty: 'Beginner'
        },
        {
            id: 'stack',
            title: 'Stacks',
            description: 'LIFO data structure and applications',
            icon: '📚',
            color: 'from-purple-600 to-purple-800',
            difficulty: 'Beginner'
        },
        {
            id: 'queue',
            title: 'Queues',
            description: 'FIFO data structure and variations',
            icon: '🚶‍♂️',
            color: 'from-yellow-600 to-yellow-800',
            difficulty: 'Beginner'
        },
        {
            id: 'tree',
            title: 'Trees',
            description: 'Binary trees, BST, AVL, and more',
            icon: '🌳',
            color: 'from-red-600 to-red-800',
            difficulty: 'Intermediate'
        },
        {
            id: 'graph',
            title: 'Graphs',
            description: 'Directed, undirected, and weighted graphs',
            icon: '🕸️',
            color: 'from-indigo-600 to-indigo-800',
            difficulty: 'Intermediate'
        },
        {
            id: 'hash-table',
            title: 'Hash Tables',
            description: 'Hash maps, collision handling, and hashing',
            icon: '🗂️',
            color: 'from-pink-600 to-pink-800',
            difficulty: 'Intermediate'
        },
        {
            id: 'heap',
            title: 'Heaps',
            description: 'Min heap, max heap, and priority queues',
            icon: '⛰️',
            color: 'from-orange-600 to-orange-800',
            difficulty: 'Intermediate'
        }
    ];

    const algorithms = [
        {
            id: 'sorting',
            title: 'Sorting',
            description: 'Bubble, merge, quick, heap sort and more',
            icon: '🔄',
            color: 'from-cyan-600 to-cyan-800',
            difficulty: 'Beginner'
        },
        {
            id: 'searching',
            title: 'Searching',
            description: 'Linear, binary, and advanced search algorithms',
            icon: '🔍',
            color: 'from-teal-600 to-teal-800',
            difficulty: 'Beginner'
        },
        {
            id: 'dynamic-programming',
            title: 'Dynamic Programming',
            description: 'Memoization, tabulation, and optimization',
            icon: '💡',
            color: 'from-violet-600 to-violet-800',
            difficulty: 'Advanced'
        },
        {
            id: 'greedy',
            title: 'Greedy Algorithms',
            description: 'Local optimization for global solutions',
            icon: '🎯',
            color: 'from-emerald-600 to-emerald-800',
            difficulty: 'Intermediate'
        },
        {
            id: 'divide-conquer',
            title: 'Divide & Conquer',
            description: 'Break problems into smaller subproblems',
            icon: '⚔️',
            color: 'from-rose-600 to-rose-800',
            difficulty: 'Intermediate'
        },
        {
            id: 'backtracking',
            title: 'Backtracking',
            description: 'Systematic solution space exploration',
            icon: '🔙',
            color: 'from-amber-600 to-amber-800',
            difficulty: 'Advanced'
        }
    ];

    const handleItemClick = (type, id) => {
        navigate(`/denniswong-portfolio/dsa/${type}/${id}`);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'text-green-400 bg-green-900/30';
            case 'Intermediate': return 'text-yellow-400 bg-yellow-900/30';
            case 'Advanced': return 'text-red-400 bg-red-900/30';
            default: return 'text-gray-400 bg-gray-900/30';
        }
    };

    const DSACard = ({ item, type }) => (
        <div
            className={`
                relative overflow-hidden rounded-xl bg-gradient-to-br ${item.color} 
                p-6 cursor-pointer transform transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl hover:shadow-black/50
                border border-gray-700/50 hover:border-gray-500/50
                ${hoveredItem === item.id ? 'scale-105 shadow-2xl shadow-black/50' : ''}
            `}
            onClick={() => handleItemClick(type, item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm leading-relaxed">{item.description}</p>

                <div className="mt-4 flex items-center text-white/80">
                    <span className="text-sm font-medium">Explore →</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen px-6 bg-black">
            <div className="max-w-7xl mx-auto py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4">
                        Data Structures & Algorithms
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Master the fundamentals of computer science through interactive visualizations and explanations
                    </p>
                </div>

                {/* Data Structures Section */}
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
                        <h2 className="text-3xl font-bold text-white">Data Structures</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {dataStructures.map((item) => (
                            <DSACard key={item.id} item={item} type="data-structure" />
                        ))}
                    </div>
                </div>

                {/* Algorithms Section */}
                <div className="mb-16">
                    <div className="flex items-center mb-8">
                        <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full mr-4"></div>
                        <h2 className="text-3xl font-bold text-white">Algorithms</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {algorithms.map((item) => (
                            <DSACard key={item.id} item={item} type="algorithm" />
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        Click on any card to explore interactive visualizations and detailed explanations
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DSASelector;