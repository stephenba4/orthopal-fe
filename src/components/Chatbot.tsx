import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue) return;

    const newUserMessage: Message = {
      id: messageId,
      text: inputValue,
      sender: 'user',
    };

    setMessageId(messageId + 1);
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.API_ENDPOINT}`, {
        question: inputValue,
      });
      const answer = response.data.answer;

      const newBotMessage: Message = {
        id: messageId + 1,
        text: answer,
        sender: 'bot',
      };

      setMessageId(messageId + 2);
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error communicating with the API:', error);
    }

    setLoading(false);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="h-64 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.sender === 'user' ? 'text-right' : 'text-left'
              } mb-2`}
            >
              <span
                className={`${
                  message.sender === 'user'
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-300 text-black'
                } inline-block px-3 py-1 rounded-lg text-sm`}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <form onSubmit={handleMessageSubmit} className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-white border border-gray-300 text-gray-400 rounded-lg p-2 mr-2"
            placeholder="Ask SoulGuru a question..."
          />
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
          {loading && (
            <AiOutlineLoading3Quarters
              className="animate-spin ml-2 text-teal-500"
              size={24}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
