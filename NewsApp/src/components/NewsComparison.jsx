import React, { useState, useMemo } from "react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80";

const NewsComparison = ({ articles }) => {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm) return articles.slice(0, 20);
    return articles
      .filter((a) =>
        `${a.title || ""} ${a.description || ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .slice(0, 20);
  }, [articles, searchTerm]);

  const toggleSelect = (article) => {
    setSelectedArticles((prev) => {
      const exists = prev.find((a) => a.url === article.url);
      if (exists) return prev.filter((a) => a.url !== article.url);
      if (prev.length >= 3) return prev;
      return [...prev, article];
    });
  };

  const isSelected = (url) => selectedArticles.some((a) => a.url === url);

  const getSentiment = (text) => {
    const t = text.toLowerCase();
    if (t.match(/crisis|war|kill|die|crash|fail|threat/))
      return { label: "Critical", color: "#f43f5e", icon: "\uD83D\uDD34" };
    if (t.match(/success|win|record|breakthrough|grow|rise/))
      return { label: "Positive", color: "#10b981", icon: "\uD83D\uDFE2" };
    return { label: "Neutral", color: "#6366f1", icon: "\uD83D\uDD35" };
  };

  return (
    <div className="container">
      <div className="page-header">
        <span className="page-header__tag">
          <span className="page-header__tag-dot"></span>Compare
        </span>
        <h1 className="page-header__title">
          {"\u2696\uFE0F"} News Comparison
        </h1>
        <p className="page-header__subtitle">
          Compare articles side by side (select up to 3)
        </p>
      </div>

      {selectedArticles.length > 0 && (
        <div className="comparison-panel">
          <div
            className="comparison-grid"
            style={{
              gridTemplateColumns: `repeat(${selectedArticles.length}, 1fr)`,
            }}
          >
            {selectedArticles.map((article) => {
              const sentiment = getSentiment(
                `${article.title || ""} ${article.description || ""}`
              );
              const wordCount = `${article.title || ""} ${article.description || ""}`
                .split(/\s+/).length;
              return (
                <div key={article.url} className="comparison-card">
                  <button
                    className="comparison-card__remove"
                    onClick={() => toggleSelect(article)}
                  >
                    {"\u2715"}
                  </button>
                  <img
                    className="comparison-card__image"
                    src={article.urlToImage || DEFAULT_IMAGE}
                    alt=""
                    onError={(e) => {
                      e.target.src = DEFAULT_IMAGE;
                    }}
                  />
                  <div className="comparison-card__body">
                    <span className="comparison-card__source">
                      {article.source?.name}
                    </span>
                    <h3 className="comparison-card__title">{article.title}</h3>
                    <p className="comparison-card__desc">
                      {article.description}
                    </p>
                    <div className="comparison-card__stats">
                      <span style={{ color: sentiment.color }}>
                        {sentiment.icon} {sentiment.label}
                      </span>
                      <span>{wordCount} words</span>
                      <span>{article.author || "Unknown"}</span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comparison-card__link"
                    >
                      Read Full Article {"\u2192"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="comparison-search">
        <input
          type="text"
          placeholder="Search articles to compare..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="comparison-search__input"
        />
      </div>

      <div className="comparison-list">
        {filtered.map((article, i) => (
          <button
            key={article.url + i}
            className={`comparison-list__item ${isSelected(article.url) ? "selected" : ""}`}
            onClick={() => toggleSelect(article)}
          >
            <img
              src={article.urlToImage || DEFAULT_IMAGE}
              alt=""
              className="comparison-list__img"
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE;
              }}
            />
            <div className="comparison-list__content">
              <h4>{article.title}</h4>
              <span>{article.source?.name}</span>
            </div>
            <div className="comparison-list__check">
              {isSelected(article.url) ? "\u2713" : "\u002B"}
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="no-results">
            <div className="no-results__icon">{"\uD83D\uDD0D"}</div>
            <h3 className="no-results__title">No articles found</h3>
            <p className="no-results__text">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsComparison;
