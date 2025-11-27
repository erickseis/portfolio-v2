import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ExternalLink } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy la IA de Erick Seis. ¿En qué puedo ayudarte? Pregúntame sobre su experiencia, proyectos o habilidades.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const invitingMessages = [
    "¿Buscas un desarrollador Full Stack?",
    "Hablemos sobre tu próximo proyecto",
    "¿Quieres ver mi experiencia?",
    "Pregúntame lo que sea sobre mí"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleMessage((prev) => (prev + 1) % invitingMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_MOONSHOT_API_KEY;
      
      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'Para activar mi inteligencia completa, por favor configura la API Key de Moonshot en el archivo .env. Por ahora, estoy en modo demostración.' 
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const systemPrompt = `
        Eres el asistente virtual oficial del portafolio de Erick Seis. Tu única función es responder preguntas sobre el perfil profesional de Erick e invitar a contactarlo.
        
        INFORMACIÓN DE ERICK SEIS:
        - Título: Desarrollador Full Stack (3 años de experiencia).
        - Ubicación: Arica, Chile.
        - Contacto: +56984994011, erickseislaboral@gmail.com.
        - Experiencia Actual: Freelancer (Nov 2023 - Presente). Desarrollo web a medida, dashboards financieros, automatización con IA (React, Node.js, PostgreSQL).
        - Experiencia Anterior: Asunción Digital (Oct 2022 - Nov 2023). Desarrollo interfaces React/Redux, backend Node.js/Express.
        - Habilidades: React, JavaScript, TypeScript, Node.js, Python, PostgreSQL, HTML/CSS, Git, Scrum, Liderazgo Técnico.
        - Educación: Analista Programador (INACAP, en curso), Desarrollador Full Stack MERN (Academlo, 2022).
        - Logros: Plataforma 4DX, Dashboard Financiero Real-Time, Optimización de rendimiento web (30% más rápido).

        REGLAS DE COMPORTAMIENTO:
        1. SOLO responde preguntas sobre Erick, su experiencia, habilidades o proyectos.
        2. Si te preguntan sobre otros temas (clima, noticias, chistes, otros programadores), responde amablemente que solo puedes hablar sobre Erick Seis.
        3. SIEMPRE que el usuario muestre interés en contratar o contactar, sugiere WhatsApp y añade el token '[SHOW_WHATSAPP]' al final.
        4. Sé profesional, persuasivo y amable. Vende a Erick como la mejor opción para proyectos de desarrollo y automatización.
        5. Responde siempre en Español.
      `;

      const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "moonshot-v1-8k",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content.replace('[SHOW_WHATSAPP]', '') })),
            { role: "user", content: input }
          ],
          temperature: 0.3
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      } else {
        throw new Error('Invalid response from API');
      }

    } catch (error) {
      console.error('Error calling Moonshot API:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, tuve un problema al procesar tu solicitud. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const showWhatsapp = content.includes('[SHOW_WHATSAPP]');
    const cleanContent = content.replace('[SHOW_WHATSAPP]', '');

    return (
      <div className="flex flex-col gap-3">
        <p className="whitespace-pre-wrap">{cleanContent}</p>
        {showWhatsapp && (
          <a 
            href="https://wa.me/56984994011" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl hover:bg-[#25D366]/20 transition-all group cursor-pointer"
          >
            <div className="p-2 bg-[#25D366] rounded-full text-white">
              <MessageSquare size={16} fill="currentColor" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#25D366] font-bold">WhatsApp</p>
              <p className="text-sm text-white font-mono">+56 9 8499 4011</p>
            </div>
            <ExternalLink size={14} className="text-[#25D366] opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Proactive Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 max-w-[200px]"
          >
            <div className="bg-white text-black text-sm p-3 rounded-xl rounded-br-none shadow-lg relative border border-neon-cyan/50">
              <p className="font-medium">{invitingMessages[bubbleMessage]}</p>
              {/* Triangle */}
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-neon-cyan/50 transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all duration-300 group ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'bg-gradient-to-r from-neon-cyan to-neon-purple text-black'
        }`}
      >
        <div className="relative">
          <Bot size={28} className="animate-bounce-slow" />
          <Sparkles size={16} className="absolute -top-2 -right-2 text-white animate-pulse" />
        </div>
        
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full border-2 border-neon-cyan opacity-0 group-hover:animate-ping"></span>
        
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] h-[500px] bg-dark-card/95 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon-cyan/20 rounded-lg">
                  <Bot size={20} className="text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Erick Seis AI</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-neon-cyan text-black rounded-tr-none'
                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.role === 'assistant' ? renderMessageContent(msg.content) : msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-neon-cyan" />
                    <span className="text-xs text-gray-400">Pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neon-cyan text-black rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-500">
                <Sparkles size={10} />
                <span>Powered by Moonshot AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
