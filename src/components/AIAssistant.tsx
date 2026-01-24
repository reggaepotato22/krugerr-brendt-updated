import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean; isAction?: boolean }[]>([
    { text: "Hello! Welcome to Krugerr Brendt. I'm your luxury real estate assistant. How can I help you find your dream property today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Agent's WhatsApp number
  const WHATSAPP_NUMBER = "254757700391";

  // Control visibility delay
  useEffect(() => {
    // Hide immediately on navigation
    setIsOpen(false);

    // If on contact page, do not open
    if (location.pathname === '/contact') return;

    // Set timer to open after 50 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 50000); // 50 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const notifyAgent = (msg: string) => {
    // Construct the WhatsApp URL
    // We append the message to the text query parameter
    const text = encodeURIComponent(`*New Website Inquiry*\n\nUser Message: ${msg}`);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    
    // Open in a new tab
    window.open(url, '_blank');

    // Also notify via backend (cPanel email)
    notifyBackend(msg);
  };

  const notifyBackend = async (msg: string) => {
    try {
      // Use the unified API to save to DB and send email via SMTP
      await api.sendInquiry({
        customer_name: "AI Assistant Guest",
        email: "ai-guest@krugerrbrendt.com", // Placeholder since we don't capture email in chat yet
        message: msg,
        subject: "AI Assistant Conversation",
        property_id: null
      });
      // We don't alert the user on success/failure to avoid interrupting the UX
      // The WhatsApp action is the primary feedback
    } catch (error) {
      console.error('Failed to send backend notification:', error);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const lowerMsg = userMsg.toLowerCase();
      let responseText = "";
      let isAction = false;

      // Check for keywords indicating urgency or desire to contact
      if (lowerMsg.includes("contact") || lowerMsg.includes("agent") || lowerMsg.includes("call") || lowerMsg.includes("whatsapp") || lowerMsg.includes("talk") || lowerMsg.includes("human")) {
        responseText = "I can connect you directly to our senior agent on WhatsApp for immediate assistance. Click the button below to start the chat.";
        isAction = true;
        // Immediately notify backend (email) when intent is detected, even before they click the button
        notifyBackend(userMsg);
      } else {
        const responses = [
          "I can certainly help with that. Our portfolio includes some of the most exclusive properties in Kenya.",
          "Would you like to schedule a private viewing for one of our listings?",
          "Excellent choice. That area is known for its high appreciation value.",
          "I'll have one of our senior agents contact you with more details shortly.",
          "Is there a specific price range or location you are interested in?"
        ];
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }

      setMessages(prev => [...prev, { text: responseText, isBot: true, isAction }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-white rounded-lg shadow-2xl border border-primary/20 w-80 sm:w-96 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-secondary p-4 flex justify-between items-center border-b border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-serif text-sm tracking-wide">KB Assistant</h3>
                  <p className="text-gray-400 text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Header WhatsApp Button */}
                <button 
                  onClick={() => notifyAgent("I would like to speak to an agent.")}
                  className="text-primary hover:text-white transition-colors p-1"
                  title="Connect on WhatsApp"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'
                        : 'bg-primary text-accent font-medium rounded-tr-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {/* Action Button for WhatsApp */}
                  {msg.isAction && (
                    <button
                      onClick={() => notifyAgent(messages[idx-1]?.text || "Inquiry from AI Assistant")}
                      className="mt-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors shadow-sm self-start"
                    >
                      <Phone className="w-3 h-3" />
                      Chat on WhatsApp
                    </button>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-accent placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-secondary hover:bg-primary text-white p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg transition-colors group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </motion.button>
      )}
    </div>
  );
};

export default AIAssistant;