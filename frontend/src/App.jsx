import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [activePersona, setActivePersona] = useState('Anshuman');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const suggestionChips = {
    Anshuman: ["How to get into product companies?", "Does my college tier matter?", "How to improve CP rating?"],
    Abhimanyu: ["Node.js vs Spring Boot?", "How to learn system design?", "Resume tips for backend roles"],
    Kshitij: ["How to find a cycle in a linked list?", "Explain Dynamic Programming", "Why am I getting TLE errors?"]
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handlePersonaSwitch = (persona) => {
    setActivePersona(persona);
    setMessages([]); 
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, persona: activePersona })
      });

      if (!response.ok) throw new Error('API failed');

      const data = await response.json();
      setMessages([...newMessages, { sender: 'bot', text: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { sender: 'bot', text: "Oops! The server is currently offline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}     
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Scaler AI</h2>
        </div>
        <div className="persona-list">
          <span className="list-title">Instructors</span>
          {['Anshuman', 'Abhimanyu', 'Kshitij'].map((p) => (
            <button 
              key={p} 
              className={`persona-btn ${activePersona === p ? 'active' : ''}`}
              onClick={() => handlePersonaSwitch(p)}
            >
              <div className="avatar bot-avatar-small">{p.charAt(0)}</div>
              {p}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="main-chat">
        <div className="chat-feed">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-avatar">{activePersona.charAt(0)}</div>
              <h2>How can I help you today?</h2>
              <div className="chips-grid">
                {suggestionChips[activePersona].map((chip, index) => (
                  <div key={index} onClick={() => sendMessage(chip)} className="chip-card">
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message-row ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="avatar bot-avatar">{activePersona.charAt(0)}</div>
                  )}
                  <div className="message-content">
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-row bot">
                  <div className="avatar bot-avatar">{activePersona.charAt(0)}</div>
                  <div className="message-content typing">
                    <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="input-container">
          <div className="input-box">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder={`Message ${activePersona}...`}
            />
            <button 
              className={`send-btn ${input.trim() ? 'active' : ''}`} 
              onClick={() => sendMessage(input)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L12 20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="disclaimer">
            AI generated content. Check for technical accuracy.
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;