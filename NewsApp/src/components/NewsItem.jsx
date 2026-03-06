import React from "react";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=600&q=80";

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

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const NewsItem = ({ title, description, imageUrl, date, author, url, source, featured }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`news-card ${featured ? "news-card--featured" : ""}`}
    >
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={imageUrl || DEFAULT_IMAGE}
          alt={title || "News"}
          loading="lazy"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />
        {source && <span className="news-card__source">{source}</span>}
        {date && <span className="news-card__time-badge">{getTimeAgo(date)}</span>}
      </div>

      <div className="news-card__body">
        <h3 className="news-card__title">{title || "Untitled Article"}</h3>
        {description && (
          <p className="news-card__description">{description}</p>
        )}

        <div className="news-card__footer">
          <div className="news-card__author">
            <span className="news-card__author-avatar">
              {getInitials(author)}
            </span>
            <span className="news-card__author-name">
              {author || "Unknown Author"}
            </span>
          </div>
          <span className="news-card__read-more">
            Read <span className="news-card__read-more-arrow">{"\u2192"}</span>
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsItem;
