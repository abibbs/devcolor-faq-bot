"use client";

import { useEffect, useRef, useState } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const chatWindow = document.querySelector('.chat-window');
    if (chatWindow) {
      setTimeout(() => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 0);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your request.' }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto p-4">
      <div ref={messagesContainerRef} className="chat-window flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-1">
            <div className={`font-bold text-sm ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}>
              {message.role === 'user' ? 'You' : '/dev/color bot'}
            </div>
            <div
              className={`p-4 rounded-lg ${
                message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="space-y-1">
            <div className="font-bold text-sm text-left">/dev/color Bot</div>
            <div className="bg-gray-100 p-4 rounded-lg max-w-[80%]">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mb-4 text-sm">
        <button 
          onClick={() => {
            setInput("How can /dev/color help me develop my career?");
            handleSubmit({ preventDefault: () => {} });
          }}
          className="underline text-black hover:font-bold"
        >
          How can /dev/color help me develop my career?
        </button>
        {" / "}
        <button 
          onClick={() => {
            setInput("How can I contribute to /dev/color?");
            handleSubmit({ preventDefault: () => {} });
          }}
          className="underline text-black hover:font-bold"
        >
          How can I contribute to /dev/color?
        </button>
        {" / "}
        <button 
          onClick={() => {
            setInput("In which cities is /dev/color located?");
            handleSubmit({ preventDefault: () => {} });
          }}
          className="underline text-black hover:font-bold"
        >
          In which cities is /dev/color located?
        </button>
        {" / "}
        <button 
          onClick={() => {
            setInput("What is the mission of /dev/color?");
            handleSubmit({ preventDefault: () => {} });
          }}
          className="underline text-black hover:font-bold"
        >
          What is the mission of /dev/color?
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
} 