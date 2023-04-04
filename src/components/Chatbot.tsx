import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import YouTubeCTA from '../components/YouTubeCTA';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      // TO DO: edit the initial message from the bot
      text: 'Hey there, welcome to BabyGenie, your friendly and fun parenting chatbot! 👶 Are you having any baby-related challenges or questions? 😊🍼',
      sender: 'bot',
    },
  ]);
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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/ask`,
        {
          question: inputValue,
        }
      );
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
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="h-64 overflow-y-auto mb-4 rounded-lg">
          {messages.map((message, index) => (
            <div
              key={`${index}-${message.id}`}
              className={`${
                message.sender === 'user' ? 'text-right' : 'text-left'
              } mb-2`}
            >
              <span
                className={`${
                  message.sender === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-200 text-gray-700'
                } inline-block px-3 py-1 rounded-lg text-sm`}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <form onSubmit={handleMessageSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow bg-white border border-pink-300 text-gray-500 rounded-lg p-2 mr-2"
            placeholder="Ask BabyGenie a question..."
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            Send
          </button>
          {loading && (
            <AiOutlineLoading3Quarters
              className="animate-spin ml-2 text-pink-500"
              size={24}
            />
          )}
        </form>
        {/* Uncomment the following line if using the YouTube call-to-action */}
        {/* <YouTubeCTA /> */}
      </div>
    </div>
  );
};

export default Chatbot;
