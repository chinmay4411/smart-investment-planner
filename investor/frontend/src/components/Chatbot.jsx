import React, { useState, useRef } from "react";
import axios from "axios";
import "./Chatbot.css";

const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:5500";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  // 🎤 Initialize Voice Recognition
  const initVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input is not supported on this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) initVoice();
    recognitionRef.current.start();
  };

  // 📨 Send message to backend
  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");

    try {
      const res = await axios.post(`${API_BASE}/predict`, {
        income: 50000,
        expenses: 20000,
        age: 21,
        risk: 3,
        query: msg,
      });

      const reply = res.data.advice || "I couldn't get financial advice right now.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Server error. Please try again later." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          <div className="chat-header">
            <h3>SmartInvest AI</h3>
            <button className="close-btn" onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`}>
                {m.text}
              </div>
            ))}

            {listening && <div className="listening">🎤 Listening...</div>}
          </div>

          <div className="chat-input-area">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about investing..."
            />

            <button className="voice-btn" onClick={handleVoiceInput}>🎤</button>

            <button className="send-btn" onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
