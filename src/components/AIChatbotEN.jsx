import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Maximize2, MessageCircle, Bot } from 'lucide-react';

const API_URL = 'https://gilberto-backend.onrender.com/api';

const INIT = {
  en: "Hey brother. I'm MAX — Gilberto's assistant. I'm here to answer any questions about the book \"How to Overcome the Pain of Being Replaced by Someone Else\". What's on your mind?",
  es: "Hola hermano. Soy MAX — el asistente de Gilberto. Estoy aquí para responder cualquier pregunta sobre el libro. ¿Qué tienes en mente?"
};

export default function AIChatbotEN({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, type: 'bot', content: INIT[lang] }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage = { id: Date.now(), type: 'user', content: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    try {
      const endpoint = lang === 'es' ? `${API_URL}/chat-es` : `${API_URL}/chat`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, conversationId, lang })
      });
      const data = await response.json();
      if (!conversationId) setConversationId(data.conversationId);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', content: data.message }]);
    } catch {
      const fallback = lang === 'en'
        ? "Sorry, I'm having technical difficulties. Please try again in a moment."
        : "Lo siento, tengo dificultades técnicas. Por favor intenta de nuevo en un momento.";
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', content: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const placeholder = lang === 'en' ? 'Ask me anything...' : 'Pregúntame lo que quieras...';
  const onlineText = lang === 'en' ? 'Online now' : 'En línea ahora';

  return (
    <>
      <motion.button
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        onClick={() => { setIsOpen(true); setIsMinimized(false); }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: 24, right: 24,
          width: 64, height: 64, borderRadius: 50,
          background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0,196,212,0.5), 0 0 0 0 rgba(0,196,212,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1000
        }}
      >
        <Bot size={28} color="#0D1B3E" />
        <motion.span
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', top: 4, right: 4,
            width: 12, height: 12, borderRadius: 50,
            background: '#00ff88', border: '2px solid #0D1B3E'
          }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'fixed', bottom: 104, right: 24,
              width: 'min(420px, calc(100vw - 48px))',
              height: isMinimized ? 64 : 520,
              background: 'linear-gradient(145deg, #0D1B3E, #152347)',
              borderRadius: 16,
              border: '1px solid rgba(0,196,212,0.35)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,196,212,0.1)',
              display: 'flex', flexDirection: 'column',
              zIndex: 1001, overflow: 'hidden'
            }}
          >
            <div style={{
              padding: '14px 18px',
              background: 'linear-gradient(180deg, rgba(0,196,212,0.12) 0%, transparent 100%)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 50,
                  background: 'linear-gradient(135deg, #00C4D4, #0099A8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20
                }}>💪</div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>MAX</p>
                  <p style={{ fontSize: 11, color: '#00C4D4', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, background: '#00ff88', borderRadius: 50, display: 'inline-block' }} />
                    {onlineText}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setIsMinimized(!isMinimized)} style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6,
                  width: 30, height: 30, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', color: '#8A9BBF'
                }}>
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button onClick={() => setIsOpen(false)} style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6,
                  width: 30, height: 30, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', color: '#8A9BBF'
                }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '82%', padding: '10px 14px', borderRadius: 12, fontSize: 14, lineHeight: 1.55,
                        background: msg.type === 'user' ? 'linear-gradient(135deg, #00C4D4, #0099A8)' : 'rgba(255,255,255,0.07)',
                        color: msg.type === 'user' ? '#0D1B3E' : '#fff',
                        ...(msg.type === 'user' ? { borderBottomRightRadius: 3 } : { borderBottomLeftRadius: 3 })
                      }}>{msg.content}</div>
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ display: 'flex' }}>
                      <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', display: 'flex', gap: 5 }}>
                        {[1,2,3].map(i => (
                          <motion.div key={i}
                            animate={{ opacity: [0.3,1,0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            style={{ width: 7, height: 7, borderRadius: 50, background: '#00C4D4' }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder={placeholder}
                    rows={1}
                    style={{
                      flex: 1, padding: '11px 14px',
                      background: 'rgba(6,12,24,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8, color: '#fff', fontSize: 14,
                      resize: 'none', fontFamily: 'inherit',
                      minHeight: 42, maxHeight: 100, outline: 'none'
                    }}
                  />
                  <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading} style={{
                    background: inputValue.trim() && !isLoading ? 'linear-gradient(135deg, #00C4D4, #0099A8)' : 'rgba(255,255,255,0.08)',
                    border: 'none', borderRadius: 8, width: 42, height: 42,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                    flexShrink: 0
                  }}>
                    <Send size={16} color={inputValue.trim() && !isLoading ? '#0D1B3E' : '#8A9BBF'} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
