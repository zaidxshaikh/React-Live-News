import React, { useState, useEffect } from "react";

const STORAGE_KEY = "zaidxshaikh-history";

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const addToHistory = (article) => {
  const history = getHistory();
  const filtered = history.filter((h) => h.url !== article.url);
  filtered.unshift({ ...article, visitedAt: new Date().toISOString() });
  const trimmed = filtered.slice(0, 100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const getTimeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    document.title = "History - zaidxshaikh News";
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const groupByDate = (items) => {
    const groups = {};
    items.forEach((item) => {
      const date = new Date(item.visitedAt);
      const key = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  };

  const grouped = groupByDate(history);

  return (
    <div className="container">
      <div className="page-header">
        <span className="page-header__tag">
          <span className="page-header__tag-dot"></span>
          Reading History
        </span>
        <h1 className="page-header__title">{"\uD83D\uDD53"} History</h1>
        <p className="page-header__subtitle">Articles you've recently read</p>
        {history.length > 0 && (
          <div className="page-header__stats">
            <div className="page-header__stat">
              <div className="page-header__stat-value">{history.length}</div>
              <div className="page-header__stat-label">Read</div>
            </div>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="history-actions">
          <button className="history-clear-btn" onClick={handleClear}>
            Clear History
          </button>
        </div>
      )}

      {history.length === 0 ? (
        <div className="no-results">
          <div className="no-results__icon">{"\uD83D\uDD53"}</div>
          <h3 className="no-results__title">No reading history</h3>
          <p className="no-results__text">Articles you read will appear here</p>
        </div>
      ) : (
        <div className="history-list">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="history-group">
              <h3 className="history-group__date">{date}</h3>
              <div className="history-group__items">
                {items.map((article, i) => (
                  <a
                    key={article.url + i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="history-item animate-in"
                    style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }}
                  >
                    <div className="history-item__img">
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
                    <div className="history-item__content">
                      <h4 className="history-item__title">{article.title}</h4>
                      <div className="history-item__meta">
                        <span className="history-item__source">
                          {article.source?.name}
                        </span>
                        <span className="history-item__time">
                          {getTimeAgo(article.visitedAt)}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
