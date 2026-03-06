import React, { useState } from "react";

const generateSummary = (title, description) => {
  const sentences = [];

  if (title) {
    const cleanTitle = title.replace(/\s*[-|]\s*[^-|]+$/, "").trim();
    sentences.push(cleanTitle);
  }

  if (description) {
    const descSentences = description.match(/[^.!?]+[.!?]+/g) || [description];
    const firstSentence = descSentences[0]?.trim();
    if (firstSentence && firstSentence !== title) {
      sentences.push(firstSentence);
    }
  }

  const keyPoints = [];
  const text = `${title || ""} ${description || ""}`.toLowerCase();

  if (text.includes("announce") || text.includes("reveal") || text.includes("launch"))
    keyPoints.push("New announcement or launch detected");
  if (text.includes("record") || text.includes("milestone") || text.includes("historic"))
    keyPoints.push("Historic milestone or record achievement");
  if (text.includes("study") || text.includes("research") || text.includes("discover"))
    keyPoints.push("Based on new research or study findings");
  if (text.includes("billion") || text.includes("million") || text.includes("trillion"))
    keyPoints.push("Involves significant financial figures");
  if (text.includes("global") || text.includes("world") || text.includes("international"))
    keyPoints.push("Has global or international impact");
  if (text.includes("technology") || text.includes("ai") || text.includes("digital"))
    keyPoints.push("Technology-related development");

  return {
    summary: sentences.join(". ") + (sentences.length ? "." : ""),
    keyPoints: keyPoints.slice(0, 3),
    sentiment:
      text.includes("crisis") || text.includes("war") || text.includes("kill") || text.includes("die")
        ? "negative"
        : text.includes("breakthrough") || text.includes("success") || text.includes("win") || text.includes("record")
        ? "positive"
        : "neutral",
    readTime: Math.max(1, Math.ceil(((title || "").length + (description || "").length) / 200)),
  };
};

const AiSummary = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const analysis = generateSummary(title, description);

  const sentimentConfig = {
    positive: { label: "Positive", color: "#10b981", icon: "\u{1F7E2}" },
    negative: { label: "Critical", color: "#f43f5e", icon: "\u{1F534}" },
    neutral: { label: "Neutral", color: "#6366f1", icon: "\u{1F535}" },
  };

  const sentiment = sentimentConfig[analysis.sentiment];

  return (
    <div className="ai-summary">
      <button
        className={`ai-summary__toggle ${expanded ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        <span className="ai-summary__toggle-icon">{"\u2728"}</span>
        <span>AI Summary</span>
      </button>

      {expanded && (
        <div
          className="ai-summary__content"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <p className="ai-summary__text">{analysis.summary}</p>

          <div className="ai-summary__meta">
            <span className="ai-summary__sentiment" style={{ color: sentiment.color }}>
              {sentiment.icon} {sentiment.label}
            </span>
            <span className="ai-summary__read-time">
              {analysis.readTime} min read
            </span>
          </div>

          {analysis.keyPoints.length > 0 && (
            <div className="ai-summary__points">
              <span className="ai-summary__points-label">Key Insights:</span>
              <ul>
                {analysis.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AiSummary;
