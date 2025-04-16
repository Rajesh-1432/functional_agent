import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SupplyChain = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [tableData, setTableData] = useState([]);
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await axios.get(
                'https://services.odata.org/v4/northwind/northwind.svc/Orders?$top=10',
                {
                    headers: { Accept: 'application/json' }
                }
            );

            const orders = response.data.value;
            setTableData(orders);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, something went wrong. Please try again later.'
            };
            setMessages(prev => [...prev, errorMessage]);
        }

        setInput('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg max-w-2xl ${msg.sender === 'bot'
                                    ? 'bg-blue-200 text-left'
                                    : 'bg-green-200 self-end text-right ml-auto'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {tableData.length > 0 && (
                            <div className="overflow-auto border rounded-lg">
                                <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
                                    <thead className="bg-blue-900 text-white">
                                        <tr>
                                            {Object.keys(tableData[0]).map((key) => (
                                                <th key={key} className="border px-4 py-2 text-left">
                                                    {key}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, rowIndex) => (
                                            <tr key={rowIndex} className="even:bg-gray-100">
                                                {Object.keys(tableData[0]).map((key) => (
                                                    <td key={key} className="border px-4 py-2">
                                                        {row[key] !== null ? row[key].toString() : '-'}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                </div>

                <div className="border-t p-4 bg-white">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplyChain;
