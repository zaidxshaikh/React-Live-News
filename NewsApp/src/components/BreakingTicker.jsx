import React, { useState, useRef } from "react";

const BreakingTicker = ({ articles }) => {
  const [paused, setPaused] = useState(false);
  const tickerRef = useRef(null);

  const breaking = articles.slice(0, 6);

  if (breaking.length === 0) return null;

  return (
    <div className="breaking-ticker">
      <div className="breaking-ticker__label">
        <span className="breaking-ticker__pulse"></span>
        BREAKING
      </div>
      <div
        className="breaking-ticker__track"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={tickerRef}
          className={`breaking-ticker__content ${paused ? "paused" : ""}`}
        >
          {[...breaking, ...breaking].map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="breaking-ticker__item"
            >
              <span className="breaking-ticker__source">
                {article.source?.name}
              </span>
              <span className="breaking-ticker__title">{article.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
