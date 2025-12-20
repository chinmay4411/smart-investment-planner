import React, { useState } from "react";
import "./ChatBotBox.css";

const ChatBotBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! How can I help you with your investments today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    // Simple demo response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "💡 That's an interesting query! Let's analyze it further." },
      ]);
    }, 800);
  };

  return (
    <div className="chatbot-box">
      <h3 className="chat-title">💬 SmartBot Assistant</h3>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBotBox;
