import React, { useMemo } from "react";

const STOP_WORDS = new Set([
  "the","a","an","in","on","at","to","for","of","and","or","is","are","was","were",
  "be","been","has","have","had","do","does","did","will","would","could","should",
  "may","might","can","this","that","it","its","with","from","by","as","but","not",
  "no","if","so","up","out","about","into","over","after","new","says","said","how",
  "what","when","where","who","why","all","more","than","just","also","now","first",
  "us","get","set","one","two","three",
]);

const AnalyticsDashboard = ({ articles }) => {
  const stats = useMemo(() => {
    if (!articles.length) return null;

    const sources = {};
    const hourly = {};
    const sentiments = { positive: 0, negative: 0, neutral: 0 };

    articles.forEach((a) => {
      const src = a.source?.name || "Unknown";
      sources[src] = (sources[src] || 0) + 1;

      if (a.publishedAt) {
        const hour = new Date(a.publishedAt).getHours();
        hourly[hour] = (hourly[hour] || 0) + 1;
      }

      const text = `${a.title || ""} ${a.description || ""}`.toLowerCase();
      if (text.match(/crisis|war|kill|die|crash|fail|threat|danger/))
        sentiments.negative++;
      else if (text.match(/success|win|record|breakthrough|grow|rise|gain|best/))
        sentiments.positive++;
      else sentiments.neutral++;
    });

    const topSources = Object.entries(sources)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const maxSourceCount = Math.max(...topSources.map(([, c]) => c));

    const words = {};
    articles.forEach((a) => {
      const text = `${a.title || ""} ${a.description || ""}`;
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !STOP_WORDS.has(w))
        .forEach((w) => {
          words[w] = (words[w] || 0) + 1;
        });
    });
    const topWords = Object.entries(words)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);
    const maxWordCount = topWords.length > 0 ? topWords[0][1] : 1;

    return {
      sources: topSources,
      maxSourceCount,
      sentiments,
      hourly,
      topWords,
      maxWordCount,
      total: articles.length,
    };
  }, [articles]);

  if (!stats) {
    return (
      <div className="container">
        <div className="page-header">
          <span className="page-header__tag">
            <span className="page-header__tag-dot"></span>Analytics
          </span>
          <h1 className="page-header__title">
            {"\uD83D\uDCCA"} Analytics Dashboard
          </h1>
          <p className="page-header__subtitle">
            Load some news first to see analytics
          </p>
        </div>
        <div className="no-results">
          <div className="no-results__icon">{"\uD83D\uDCCA"}</div>
          <h3 className="no-results__title">No data available</h3>
          <p className="no-results__text">
            Browse some news categories to generate analytics
          </p>
        </div>
      </div>
    );
  }

  const sentimentTotal =
    stats.sentiments.positive + stats.sentiments.negative + stats.sentiments.neutral;

  return (
    <div className="container">
      <div className="page-header">
        <span className="page-header__tag">
          <span className="page-header__tag-dot"></span>Analytics
        </span>
        <h1 className="page-header__title">
          {"\uD83D\uDCCA"} Analytics Dashboard
        </h1>
        <p className="page-header__subtitle">
          Insights and trends from your news feed
        </p>
        <div className="page-header__stats">
          <div className="page-header__stat">
            <div className="page-header__stat-value">{stats.total}</div>
            <div className="page-header__stat-label">Articles</div>
          </div>
          <div className="page-header__stat">
            <div className="page-header__stat-value">
              {stats.sources.length}
            </div>
            <div className="page-header__stat-label">Sources</div>
          </div>
          <div className="page-header__stat">
            <div className="page-header__stat-value">
              {stats.topWords.length}
            </div>
            <div className="page-header__stat-label">Topics</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Sentiment Analysis */}
        <div className="analytics-card">
          <h3 className="analytics-card__title">
            {"\uD83C\uDFAF"} Sentiment Analysis
          </h3>
          <div className="sentiment-chart">
            <div className="sentiment-bar">
              <div
                className="sentiment-bar__segment sentiment-bar__segment--positive"
                style={{
                  width: `${(stats.sentiments.positive / sentimentTotal) * 100}%`,
                }}
              ></div>
              <div
                className="sentiment-bar__segment sentiment-bar__segment--neutral"
                style={{
                  width: `${(stats.sentiments.neutral / sentimentTotal) * 100}%`,
                }}
              ></div>
              <div
                className="sentiment-bar__segment sentiment-bar__segment--negative"
                style={{
                  width: `${(stats.sentiments.negative / sentimentTotal) * 100}%`,
                }}
              ></div>
            </div>
            <div className="sentiment-legend">
              <div className="sentiment-legend__item">
                <span
                  className="sentiment-legend__dot"
                  style={{ background: "#10b981" }}
                ></span>
                <span>Positive ({stats.sentiments.positive})</span>
              </div>
              <div className="sentiment-legend__item">
                <span
                  className="sentiment-legend__dot"
                  style={{ background: "#6366f1" }}
                ></span>
                <span>Neutral ({stats.sentiments.neutral})</span>
              </div>
              <div className="sentiment-legend__item">
                <span
                  className="sentiment-legend__dot"
                  style={{ background: "#f43f5e" }}
                ></span>
                <span>Negative ({stats.sentiments.negative})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="analytics-card">
          <h3 className="analytics-card__title">
            {"\uD83D\uDCF0"} Top Sources
          </h3>
          <div className="source-chart">
            {stats.sources.map(([name, count]) => (
              <div key={name} className="source-chart__row">
                <span className="source-chart__label">{name}</span>
                <div className="source-chart__bar-track">
                  <div
                    className="source-chart__bar"
                    style={{
                      width: `${(count / stats.maxSourceCount) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="source-chart__count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Word Cloud */}
        <div className="analytics-card analytics-card--wide">
          <h3 className="analytics-card__title">
            {"\uD83D\uDCAC"} Trending Words
          </h3>
          <div className="word-cloud">
            {stats.topWords.map(([word, count]) => {
              const size = 0.8 + (count / stats.maxWordCount) * 1.2;
              const opacity = 0.5 + (count / stats.maxWordCount) * 0.5;
              return (
                <span
                  key={word}
                  className="word-cloud__word"
                  style={{ fontSize: `${size}rem`, opacity }}
                >
                  {word}
                  <sup className="word-cloud__count">{count}</sup>
                </span>
              );
            })}
          </div>
        </div>

        {/* Publishing Timeline */}
        <div className="analytics-card analytics-card--wide">
          <h3 className="analytics-card__title">
            {"\u23F0"} Publishing Timeline
          </h3>
          <div className="timeline-chart">
            {Array.from({ length: 24 }, (_, i) => {
              const count = stats.hourly[i] || 0;
              const maxH = Math.max(...Object.values(stats.hourly), 1);
              return (
                <div key={i} className="timeline-chart__bar-wrapper">
                  <div
                    className="timeline-chart__bar"
                    style={{ height: `${(count / maxH) * 100}%` }}
                    title={`${i}:00 - ${count} articles`}
                  ></div>
                  <span className="timeline-chart__label">
                    {i % 3 === 0 ? `${i}h` : ""}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
