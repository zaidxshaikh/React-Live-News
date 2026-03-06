import React, { useMemo } from "react";

const getTimeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const PeopleAlsoRead = ({ articles, currentIndex }) => {
  const recommendations = useMemo(() => {
    if (!articles.length || currentIndex === undefined) return [];

    const current = articles[currentIndex];
    if (!current) return [];

    const currentWords = new Set(
      (current.title || "")
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );

    const scored = articles
      .map((article, idx) => {
        if (idx === currentIndex) return null;
        const words = (article.title || "")
          .toLowerCase()
          .replace(/[^a-z\s]/g, "")
          .split(/\s+/)
          .filter((w) => w.length > 3);
        const overlap = words.filter((w) => currentWords.has(w)).length;
        return { article, score: overlap, idx };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    return scored.map((s) => s.article);
  }, [articles, currentIndex]);

  if (recommendations.length === 0) return null;

  return (
    <div className="also-read">
      <div className="also-read__header">
        <span className="also-read__icon">{"\u{1F465}"}</span>
        <h3 className="also-read__title">People Also Read</h3>
      </div>
      <div className="also-read__list">
        {recommendations.map((article, i) => (
          <a
            key={article.url + i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="also-read__item"
          >
            <div className="also-read__item-img">
              <img
                src={
                  article.urlToImage ||
                  "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=200&q=60"
                }
                alt=""
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=200&q=60";
                }}
              />
            </div>
            <div className="also-read__item-content">
              <h4 className="also-read__item-title">{article.title}</h4>
              <div className="also-read__item-meta">
                <span>{article.source?.name}</span>
                <span>{getTimeAgo(article.publishedAt)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoRead;
