import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import { getBookmarks } from "./BookmarkButton";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    document.title = "Bookmarks - zaidxshaikh News";
    setBookmarks(getBookmarks());
    const handler = () => setBookmarks(getBookmarks());
    window.addEventListener("bookmarks-updated", handler);
    return () => window.removeEventListener("bookmarks-updated", handler);
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <span className="page-header__tag">
          <span className="page-header__tag-dot"></span>
          Your Collection
        </span>
        <h1 className="page-header__title">{"\u2665"} Saved Articles</h1>
        <p className="page-header__subtitle">
          Your bookmarked articles, saved locally on this device
        </p>
        {bookmarks.length > 0 && (
          <div className="page-header__stats">
            <div className="page-header__stat">
              <div className="page-header__stat-value">{bookmarks.length}</div>
              <div className="page-header__stat-label">Saved</div>
            </div>
            <div className="page-header__stat">
              <div className="page-header__stat-value">
                {new Set(bookmarks.map((a) => a.source?.name).filter(Boolean)).size}
              </div>
              <div className="page-header__stat-label">Sources</div>
            </div>
          </div>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="no-results">
          <div className="no-results__icon">{"\u2661"}</div>
          <h3 className="no-results__title">No bookmarks yet</h3>
          <p className="no-results__text">
            Click the heart icon on any article to save it here
          </p>
        </div>
      ) : (
        <div className="news-grid">
          {bookmarks.map((article, index) => (
            <div
              key={article.url + index}
              className="animate-in"
              style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
            >
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                date={article.publishedAt}
                url={article.url}
                author={article.author}
                source={article.source?.name}
                featured={index === 0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
