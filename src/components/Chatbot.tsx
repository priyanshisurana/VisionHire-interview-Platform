
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your AI interview assistant. I can help you with questions about the interview process, technical topics, or anything else you need to know!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const botResponses = {
    greeting: [
      "Hello! How can I help you today?",
      "Hi there! What would you like to know about the interview process?",
      "Hey! I'm here to assist you. What questions do you have?"
    ],
    interview: [
      "The interview consists of 10-15 technical questions focused on software engineering concepts including algorithms, data structures, system design, and coding problems.",
      "You can answer questions either by typing or using voice input. The AI will provide follow-up questions based on your responses.",
      "Make sure your camera and microphone are enabled before starting the interview for the best experience."
    ],
    technical: [
      "Common topics include: Data Structures (arrays, linked lists, trees, graphs), Algorithms (sorting, searching, dynamic programming), System Design, Object-Oriented Programming, and Database concepts.",
      "For coding questions, think out loud, explain your approach, discuss time and space complexity, and consider edge cases.",
      "Practice problems on platforms like LeetCode, HackerRank, or CodeSignal to prepare for technical interviews."
    ],
    tips: [
      "Be honest about what you know and don't know. It's better to admit uncertainty than to guess.",
      "Take your time to think through problems. The interviewer wants to see your problem-solving process.",
      "Ask clarifying questions if the problem statement is unclear.",
      "Practice explaining technical concepts in simple terms."
    ],
    default: [
      "I'm here to help with interview preparation! You can ask me about technical topics, interview tips, or the interview process.",
      "Try asking me about specific topics like 'algorithms', 'data structures', 'system design', or 'interview tips'.",
      "I can also help explain concepts or provide study suggestions for your interview preparation."
    ]
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    if (message.includes('interview') || message.includes('process') || message.includes('how many questions')) {
      return botResponses.interview[Math.floor(Math.random() * botResponses.interview.length)];
    }
    
    if (message.includes('algorithm') || message.includes('data structure') || message.includes('coding') || message.includes('technical') || message.includes('programming')) {
      return botResponses.technical[Math.floor(Math.random() * botResponses.technical.length)];
    }
    
    if (message.includes('tip') || message.includes('advice') || message.includes('help') || message.includes('prepare')) {
      return botResponses.tips[Math.floor(Math.random() * botResponses.tips.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg animate-float"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-xl animate-slide-in-right">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5" />
                AI Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.isBot && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      {!message.isBot && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
