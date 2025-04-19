import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface PulseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'pulse';
  content: string;
  timestamp: string;
}

// Static Header Avatar Component
const HeaderAvatar = () => (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
    <span className="text-lg text-primary-600 dark:text-primary-300">✨</span>
  </div>
);

// Animated Message Avatar Component
const MessageAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8">
    <div className="relative flex items-center justify-center">
      <span className="absolute text-lg text-primary-600/50 dark:text-primary-300/50 animate-ping">✨</span>
      <span className="relative text-lg text-primary-600 dark:text-primary-300">✨</span>
    </div>
  </div>
);

const mockPulseResponse = (query: string): string => {
  if (query.toLowerCase().includes('check-in time')) {
    return 'Based on current data, the average check-in time is 12 minutes. Downtown location is experiencing longer times (15 minutes) due to system delays, while Midtown is performing better at 8 minutes. We\'ve noticed peak delays during weekend check-ins.';
  } else if (query.toLowerCase().includes('guest satisfaction')) {
    return 'Overall guest satisfaction is at 4.3/5, with recent improvements in room service ratings (+8%). However, we\'ve noticed concerns about WiFi connectivity (Downtown) and breakfast service quality (Northside). TripAdvisor ratings have improved by 0.4 points this month.';
  } else if (query.toLowerCase().includes('getting worse')) {
    return 'Based on the past month\'s data, here are the areas showing negative trends:\n\n' +
           '1. WiFi Connectivity:\n' +
           '   • Downtown: Peak hour disruptions (+45% complaints)\n' +
           '   • Midtown: Connection speed issues (+20% complaints)\n\n' +
           '2. Breakfast Service:\n' +
           '   • Wait times increased by 25%\n' +
           '   • Food temperature complaints (+30%)\n' +
           '   • Staff response time (+15%)\n\n' +
           '3. Room Turnover:\n' +
           '   • Delayed check-ins (+10%)\n' +
           '   • Deep cleaning backlogs (+15%)\n\n' +
           'Would you like a detailed action plan for any of these areas?';
  } else if (query.toLowerCase().includes('compare')) {
    return 'I can help you compare hotel locations. Would you like to analyze specific metrics like:\n' +
           '• Guest satisfaction ratings\n' +
           '• Average daily rates\n' +
           '• Occupancy rates\n' +
           '• RevPAR performance\n' +
           '• Service quality metrics\n\n' +
           'You can also use our detailed comparison tool in the Performance Comparison section.';
  } else if (query.toLowerCase().includes('complaining')) {
    return 'This week\'s top guest concerns across locations are:\n\n' +
           '1. WiFi Connectivity (45% of complaints)\n' +
           '   • Most reported at Downtown location\n' +
           '   • Peak issues during evening hours\n\n' +
           '2. Breakfast Service (30%)\n' +
           '   • Temperature of food items\n' +
           '   • Wait times during peak hours\n\n' +
           '3. Room Cleanliness (15%)\n' +
           '   • Bathroom maintenance\n' +
           '   • Deep cleaning scheduling\n\n' +
           '4. Check-in Delays (10%)\n' +
           '   • System processing issues\n' +
           '   • Staff response time\n\n' +
           'Would you like to see location-specific breakdowns?';
  } else {
    return 'I\'d be happy to help analyze that. Could you provide more specific details about what you\'d like to know about our hotel operations?';
  }
};

const PulseDrawer: React.FC<PulseDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    };

    // Generate Pulse response
    const pulseResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'pulse',
      content: mockPulseResponse(query),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, pulseResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date().toLocaleTimeString()
    };

    const pulseResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'pulse',
      content: mockPulseResponse(suggestion),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, pulseResponse]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 bottom-0 w-96 bg-white dark:bg-gray-800 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeaderAvatar />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pulse</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start space-x-3 animate-fade-in">
          <MessageAvatar />
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
            <p className="text-gray-900 dark:text-white">
              Hi! I'm Pulse, your hotel insights assistant. How can I help you today?
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => handleSuggestionClick("What's the current average check-in time?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What's the current average check-in time?
              </button>
              <button
                onClick={() => handleSuggestionClick("How's our guest satisfaction trending?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                How's our guest satisfaction trending?
              </button>
              <button
                onClick={() => handleSuggestionClick("What are the top things that are getting worse over the past month?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What are the top things that are getting worse over the past month?
              </button>
              <button
                onClick={() => handleSuggestionClick("Compare performance between hotel locations")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Compare performance between hotel locations
              </button>
              <button
                onClick={() => handleSuggestionClick("What are guests complaining about this week?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What are guests complaining about this week?
              </button>
            </div>
          </div>
        </div>

        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            } animate-fade-in`}
          >
            {message.type === 'pulse' && <MessageAvatar />}
            <div
              className={`rounded-lg p-4 max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`mt-1 text-xs ${
                  message.type === 'user'
                    ? 'text-primary-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PulseDrawer; 