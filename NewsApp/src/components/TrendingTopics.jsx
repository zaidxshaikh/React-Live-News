import React, { useMemo } from "react";

const STOP_WORDS = new Set([
  "the", "a", "an", "in", "on", "at", "to", "for", "of", "and", "or", "is",
  "are", "was", "were", "be", "been", "has", "have", "had", "do", "does",
  "did", "will", "would", "could", "should", "may", "might", "can", "this",
  "that", "it", "its", "with", "from", "by", "as", "but", "not", "no", "if",
  "so", "up", "out", "about", "into", "over", "after", "new", "says", "said",
  "how", "what", "when", "where", "who", "why", "all", "more", "than", "than",
  "just", "also", "now", "first", "us", "get", "set", "one", "two", "three",
]);

const TrendingTopics = ({ articles, onTopicClick }) => {
  const topics = useMemo(() => {
    const wordCount = {};

    articles.forEach((article) => {
      const text = `${article.title || ""} ${article.description || ""}`;
      const words = text
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !STOP_WORDS.has(w));

      words.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    });

    return Object.entries(wordCount)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({ word, count }));
  }, [articles]);

  if (topics.length === 0) return null;

  return (
    <div className="trending">
      <div className="trending__header">
        <span className="trending__icon">{"\u{1F525}"}</span>
        <h3 className="trending__title">Trending Topics</h3>
      </div>
      <div className="trending__tags">
        {topics.map((topic) => (
          <button
            key={topic.word}
            className="trending__tag"
            onClick={() => onTopicClick(topic.word)}
          >
            <span className="trending__tag-text">{topic.word}</span>
            <span className="trending__tag-count">{topic.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
