import React, { useState, useEffect } from "react";

const VoiceSearch = ({ onResult }) => {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window
    );
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    recognition.start();
  };

  if (!supported) return null;

  return (
    <button
      className={`voice-search-btn ${listening ? "voice-search-btn--active" : ""}`}
      onClick={startListening}
      title={listening ? "Listening..." : "Voice search"}
    >
      {listening ? (
        <span className="voice-search-pulse">{"\uD83C\uDF99\uFE0F"}</span>
      ) : (
        "\uD83C\uDF99\uFE0F"
      )}
    </button>
  );
};

export default VoiceSearch;
