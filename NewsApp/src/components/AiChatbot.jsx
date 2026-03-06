import React, { useState, useRef, useEffect } from "react";

const generateResponse = (query, articles) => {
  const q = query.toLowerCase().trim();

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hey! I'm PulseAI, your news assistant. Ask me about today's headlines, trending topics, or any news category. Try: \"What's trending?\" or \"Summarize the top story\"";
  }

  if (q.includes("trending") || q.includes("popular") || q.includes("hot")) {
    const sources = [...new Set(articles.map((a) => a.source?.name).filter(Boolean))];
    const topArticles = articles.slice(0, 3);
    let response = `Here's what's trending right now:\n\n`;
    topArticles.forEach((a, i) => {
      response += `${i + 1}. ${a.title}\n`;
    });
    if (sources.length > 0) {
      response += `\nCovered by ${sources.slice(0, 4).join(", ")} and others.`;
    }
    return response;
  }

  if (q.includes("summarize") || q.includes("summary") || q.includes("top story") || q.includes("latest")) {
    if (articles.length === 0) return "No articles loaded yet. Switch to a category to load news.";
    const top = articles[0];
    return `Top Story: "${top.title}"\n\n${top.description || "No description available."}\n\nSource: ${top.source?.name || "Unknown"} | By: ${top.author || "Unknown"}`;
  }

  if (q.includes("how many") || q.includes("count") || q.includes("total")) {
    const sources = [...new Set(articles.map((a) => a.source?.name).filter(Boolean))];
    return `Currently showing ${articles.length} articles from ${sources.length} different sources including ${sources.slice(0, 3).join(", ")}.`;
  }

  if (q.includes("source") || q.includes("where")) {
    const sources = [...new Set(articles.map((a) => a.source?.name).filter(Boolean))];
    return `News sources in current feed:\n${sources.map((s) => `- ${s}`).join("\n")}`;
  }

  if (q.includes("help") || q.includes("what can")) {
    return "I can help you with:\n\n- \"What's trending?\" - See top stories\n- \"Summarize the top story\" - Get a quick summary\n- \"How many articles?\" - Article stats\n- \"Show sources\" - List news sources\n- Search for any keyword to find related articles\n- Ask about any topic in the news!";
  }

  // Keyword search in articles
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const matches = articles.filter((a) => {
    const text = `${a.title || ""} ${a.description || ""}`.toLowerCase();
    return words.some((w) => text.includes(w));
  });

  if (matches.length > 0) {
    const top = matches.slice(0, 3);
    let response = `Found ${matches.length} article${matches.length > 1 ? "s" : ""} related to "${query}":\n\n`;
    top.forEach((a, i) => {
      response += `${i + 1}. ${a.title}\n   ${a.source?.name || ""}\n\n`;
    });
    if (matches.length > 3) {
      response += `...and ${matches.length - 3} more.`;
    }
    return response;
  }

  return `I couldn't find any articles about "${query}" in the current feed. Try browsing a different category or ask me:\n- "What's trending?"\n- "Summarize the top story"\n- "Show sources"`;
};

const AiChatbot = ({ articles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm PulseAI, your smart news assistant. Ask me about headlines, trends, or any topic in the news!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(trimmed, articles);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`chatbot-fab ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="AI News Assistant"
      >
        {isOpen ? "\u2715" : "\u{1F916}"}
      </button>

      {isOpen && (
        <div className="chatbot">
          <div className="chatbot__header">
            <div className="chatbot__header-info">
              <div className="chatbot__avatar">{"\u{1F916}"}</div>
              <div>
                <h4 className="chatbot__name">PulseAI</h4>
                <span className="chatbot__status">
                  <span className="chatbot__status-dot"></span>
                  Online
                </span>
              </div>
            </div>
            <button className="chatbot__close" onClick={() => setIsOpen(false)}>
              {"\u2715"}
            </button>
          </div>

          <div className="chatbot__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${msg.role}`}>
                {msg.role === "ai" && (
                  <span className="chatbot__msg-avatar">{"\u{1F916}"}</span>
                )}
                <div className="chatbot__msg-bubble">
                  <pre className="chatbot__msg-text">{msg.text}</pre>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot__msg chatbot__msg--ai">
                <span className="chatbot__msg-avatar">{"\u{1F916}"}</span>
                <div className="chatbot__msg-bubble">
                  <div className="chatbot__typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot__suggestions">
            {["What's trending?", "Top story", "Show sources"].map((s) => (
              <button
                key={s}
                className="chatbot__suggestion"
                onClick={() => {
                  setInput(s);
                  setTimeout(() => {
                    setMessages((prev) => [...prev, { role: "user", text: s }]);
                    setIsTyping(true);
                    setTimeout(() => {
                      const response = generateResponse(s, articles);
                      setMessages((prev) => [...prev, { role: "ai", text: response }]);
                      setIsTyping(false);
                    }, 600 + Math.random() * 800);
                    setInput("");
                  }, 100);
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="chatbot__input-area">
            <input
              ref={inputRef}
              className="chatbot__input"
              type="text"
              placeholder="Ask about the news..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="chatbot__send"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              {"\u2191"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatbot;
