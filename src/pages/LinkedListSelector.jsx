import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export const LinkedListSelector = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const LinkedListTypes = [
        {
            id: "singly-linked-list",
            title: "Singly Linked List",
            description: "The simplest type of linked list in which every node contains some data and a pointer to the next node of the same data type.",
            color: 'from-blue-600 to-blue-800',
        },
        {
            id: "doubly-linked-list",
            title: "Doubly Linked List",
            description: "A two-way linked list is a more complex type of linked list that contains a pointer to the next as well as the previous node in sequence.",
            color: 'from-blue-600 to-blue-800',
        },
        {
            id: "circular-linked-list",
            title: "Circular Linked List",
            description: "A type of linked list in which the last node's next pointer points back to the first node of the list, creating a circular structure. This design allows for continuous traversal of the list, as there is no null to end the list.",
            color: 'from-blue-600 to-blue-800',
        },
        {
            id: "doubly-circular-linked-list",
            title: "Doubly Circular Linked List",
            description: "A complex type of linked list that contains a pointer to the next as well as the previous node in the sequence.",
            color: 'from-blue-600 to-blue-800',
        },
    ]


    const handleItemClick = (type, id) => {
        navigate(`/dsa/data-structure/linked-list/${id}`);
    };

    const LinkedListCard = ({item, type}) => (
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
            <div
                className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
            <div
                className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6"></div>

            <div className="relative z-10">

                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm leading-relaxed">{item.description}</p>

                <div className="mt-4 flex items-center text-white/80">
                    <span className="text-sm font-medium">Explore →</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen px-6 py-10 bg-black">
            <div className="max-w-7xl mx-auto py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4 h-[8rem] sm:h-[4rem]">
                        Linked Lists
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
                        {LinkedListTypes.map((item) => (
                            <LinkedListCard key={item.id} item={item} type="data-structure"/>
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
}