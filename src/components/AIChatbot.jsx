import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Minimize2, Maximize2, MessageCircle, Sparkles, Bot } from 'lucide-react'

const API_URL = 'https://gilberto-backend.onrender.com/api'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou a BIA, a assistente do Gilberto de Souza. Estou aqui para tirar todas as suas dúvidas sobre o livro "Como Vencer a Dor de Ser Trocado Por Outro". Como posso te ajudar hoje?'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId
        })
      })

      const data = await response.json()

      if (!conversationId) {
        setConversationId(data.conversationId)
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: data.message
      }])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Desculpe, estou com dificuldades técnicas agora. Tente novamente em alguns instantes.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = async () => {
    try {
      if (conversationId) {
        await fetch(`${API_URL}/chat/clear`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ conversationId })
        })
      }
      setConversationId(null)
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: 'Olá! Sou a BIA, a assistente do Gilberto de Souza. Estou aqui para tirar todas as suas dúvidas sobre o livro "Como Vencer a Dor de Ser Trocado Por Outro". Como posso te ajudar hoje?'
      }])
    } catch (error) {
      console.error('Erro ao resetar chat:', error)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale:0 }} animate={{ scale:1 }}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale:1.05 }}
        whileTap={{ scale:0.95 }}
        style={{
          position:'fixed', bottom:24, right:24,
          width:60, height:60,
          borderRadius:50,
          background:'linear-gradient(135deg, #00C4D4, #0099A8)',
          border:'none',
          boxShadow:'0 8px 32px rgba(0,196,212,0.4), 0 0 60px rgba(0,196,212,0.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', zIndex:1000,
          transition:'all 0.3s'
        }}
      >
        <Bot size={28} color="#0D1B3E" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity:0, scale:0.9, y:20 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.9, y:20 }}
            transition={{ type:'spring', damping:25 }}
            style={{
              position:'fixed', bottom:100, right:24,
              width:'min(400px, calc(100vw - 48px))',
              height: isMinimized ? 60 : 500,
              background:'linear-gradient(145deg, #0D1B3E 0%, #152347 100%)',
              borderRadius:16,
              border:'1px solid rgba(0,196,212,0.3)',
              boxShadow:'0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,196,212,0.15)',
              display:'flex',
              flexDirection:'column',
              zIndex:1001,
              overflow:'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding:'16px 20px',
              background:'linear-gradient(180deg, rgba(0,196,212,0.15) 0%, transparent 100%)',
              borderBottom:'1px solid rgba(255,255,255,0.1)',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{
                  width:40, height:40, borderRadius:50,
                  background:'linear-gradient(135deg, #00C4D4, #0099A8)',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <Sparkles size={20} color="#0D1B3E" />
                </div>
                <div>
                  <h3 style={{
                    fontFamily:"'Playfair Display', serif",
                    fontSize:16, fontWeight:700, color:'#fff', margin:0
                  }}>
                    BIA - Assistente Gilberto
                  </h3>
                  <p style={{
                    fontSize:11, color:'#00C4D4', margin:0,
                    display:'flex', alignItems:'center', gap:4
                  }}>
                    <span style={{ width:6, height:6, background:'#00C4D4', borderRadius:50 }} />
                    Online agora
                  </p>
                </div>
              </div>

              <div style={{ display:'flex', gap:8 }}>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  style={{
                    background:'rgba(255,255,255,0.1)',
                    border:'none', borderRadius:8,
                    width:32, height:32,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', color:'#fff',
                    transition:'all 0.2s'
                  }}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background:'rgba(255,255,255,0.1)',
                    border:'none', borderRadius:8,
                    width:32, height:32,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', color:'#fff',
                    transition:'all 0.2s'
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div style={{
                  flex:1,
                  padding:'20px',
                  overflowY:'auto',
                  display:'flex',
                  flexDirection:'column',
                  gap:16
                }}>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity:0, y:10 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        display:'flex',
                        justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <div style={{
                        maxWidth:'80%',
                        padding:'12px 16px',
                        borderRadius:12,
                        background: msg.type === 'user'
                          ? 'linear-gradient(135deg, #00C4D4, #0099A8)'
                          : 'rgba(255,255,255,0.08)',
                        color: msg.type === 'user' ? '#0D1B3E' : '#fff',
                        fontSize:14,
                        lineHeight:1.5,
                        ...(msg.type === 'user' ? {
                          borderBottomRightRadius:4
                        } : {
                          borderBottomLeftRadius:4
                        })
                      }}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity:0 }}
                      animate={{ opacity:1 }}
                      style={{
                        display:'flex',
                        justifyContent:'flex-start'
                      }}
                    >
                      <div style={{
                        padding:'12px 16px',
                        borderRadius:12,
                        background:'rgba(255,255,255,0.08)',
                        display:'flex', gap:6
                      }}>
                        {[1,2,3].map(i => (
                          <motion.div
                            key={i}
                            animate={{ opacity:[0.3,1,0.3] }}
                            transition={{ duration:1, repeat:Infinity, delay:i*0.2 }}
                            style={{
                              width:8, height:8, borderRadius:50,
                              background:'#00C4D4'
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div style={{
                  padding:'16px',
                  borderTop:'1px solid rgba(255,255,255,0.1)',
                  display:'flex',
                  gap:10,
                  alignItems:'flex-end'
                }}>
                  <button
                    onClick={resetChat}
                    title="Nova conversa"
                    style={{
                      background:'rgba(255,255,255,0.1)',
                      border:'none', borderRadius:8,
                      width:40, height:40,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:'pointer', color:'#8A9BBF',
                      transition:'all 0.2s',
                      flexShrink:0
                    }}
                  >
                    <MessageCircle size={18} />
                  </button>

                  <div style={{
                    flex:1,
                    position:'relative'
                  }}>
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      rows={1}
                      style={{
                        width:'100%',
                        padding:'12px 50px 12px 16px',
                        background:'rgba(6,12,24,0.5)',
                        border:'1px solid rgba(255,255,255,0.1)',
                        borderRadius:8,
                        color:'#fff',
                        fontSize:14,
                        resize:'none',
                        fontFamily:'inherit',
                        minHeight:44,
                        maxHeight:120
                      }}
                    />
                  </div>

                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    style={{
                      background:inputValue.trim() && !isLoading
                        ? 'linear-gradient(135deg, #00C4D4, #0099A8)'
                        : 'rgba(255,255,255,0.1)',
                      border:'none', borderRadius:8,
                      width:40, height:40,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      cursor:inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                      transition:'all 0.2s',
                      flexShrink:0
                    }}
                  >
                    <Send size={18} color={inputValue.trim() && !isLoading ? '#0D1B3E' : '#8A9BBF'} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
