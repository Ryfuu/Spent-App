import React, { useState } from 'react';
import { LuSparkles, LuSend } from 'react-icons/lu';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function AIPanel() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: 'Hi! I am Finn, your AI Financial Advisor. Ask me anything about budgeting, saving, or managing your money!'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const textToSend = inputText;
    
    setMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInputText('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const secretDoctrine = [
        {
          role: "user",
          parts: [{ text: "From now on, you are Finn, a professional AI Financial Advisor. You must ONLY answer questions related to personal finance, budgeting, saving, investing, economics, or money management. If I ask anything else, politely decline. Keep answers short (1-2 paragraphs max)." }]
        },
        {
          role: "model",
          parts: [{ text: "Understood! I am Finn, your AI Financial Advisor. I will only answer finance-related questions and keep my answers concise. How can I help your finances today?" }]
        }
      ];

      const userHistory = messages.slice(1).map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const finalHistory = [...secretDoctrine, ...userHistory];

      const chat = model.startChat({ history: finalHistory });
      
      const result = await chat.sendMessage(textToSend);
      const responseText = result.response.text();

      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
      
    } catch (error) {
      console.error("Detail Error AI:", error);
      setMessages((prev) => [...prev, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[350px] h-[400px] bg-[#151A27] border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-lg shadow-black/20">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
          <LuSparkles size={16} />
        </div>
        <div>
          <h3 className="text-slate-200 font-medium text-sm">Finn</h3>
          <p className="text-slate-500 text-xs">AI Financial Advisor</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : ''}`}>
            {msg.role === 'model' ? (
              <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
                <LuSparkles size={12} />
              </div>
            ) : (
              <img src="/mari.jpg" alt="User" className="w-6 h-6 rounded-full object-cover mt-1" />
            )}
            
            <div className={`p-3 text-sm shadow-md rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-teal-500 text-white rounded-tr-sm shadow-teal-500/10' 
                : 'bg-slate-800 text-slate-300 rounded-tl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-1">
              <LuSparkles size={12} />
            </div>
            <div className="bg-slate-800 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-400 flex gap-1">
              <span className="animate-bounce delay-75">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-[#0B0F19]">
        <div className="relative">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask Finn about budgeting..." 
            className="w-full bg-[#151A27] border border-slate-700 rounded-full py-2 pl-4 pr-10 text-sm text-slate-200 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-400 hover:text-teal-300 p-1 disabled:opacity-50"
          >
            <LuSend size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}