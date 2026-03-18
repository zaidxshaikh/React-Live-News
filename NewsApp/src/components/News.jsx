import React, { useState, useEffect, useCallback, useRef } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import TrendingTopics from "./TrendingTopics";
import PeopleAlsoRead from "./PeopleAlsoRead";
import SourceFilter from "./SourceFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import demoArticles from "../data/demoNews";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const News = ({ setProgress, pageSize, country, category, apiKey, searchQuery, onArticlesLoaded }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [activeSource, setActiveSource] = useState("");
  const pageRef = useRef(1);

  const activeSearch = searchQuery || localSearch;

  const loadDemoData = useCallback(() => {
    const data = demoArticles[category] || demoArticles.general;
    setArticles(data);
    setTotalResults(data.length);
    setIsDemo(true);
    setLoading(false);
    setProgress(100);
  }, [category, setProgress]);

  const fetchNews = useCallback(async (pageNum = 1, append = false) => {
    if (!apiKey) {
      loadDemoData();
      return;
    }

    try {
      setProgress(10);
      if (!append) setLoading(true);

      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${pageNum}&pageSize=${pageSize}`;

      const res = await fetch(url);
      setProgress(50);

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setProgress(80);

      if (data.status !== "ok") {
        loadDemoData();
        return;
      }

      const validArticles = (data.articles || []).filter(
        (a) => a.title && a.title !== "[Removed]"
      );

      if (append) {
        setArticles((prev) => [...prev, ...validArticles]);
      } else {
        setArticles(validArticles);
      }

      setTotalResults(data.totalResults || 0);
      setIsDemo(false);
      setError(false);
    } catch {
      loadDemoData();
    } finally {
      setLoading(false);
      setProgress(100);
    }
  }, [country, category, apiKey, pageSize, setProgress, loadDemoData]);

  useEffect(() => {
    if (onArticlesLoaded) onArticlesLoaded(articles);
  }, [articles, onArticlesLoaded]);

  useEffect(() => {
    document.title = `${capitalize(category)} - zaidxshaikh News`;
    pageRef.current = 1;
    setPage(1);
    setLocalSearch("");
    setActiveSource("");
    fetchNews(1, false);
  }, [category, country, fetchNews]);

  const fetchMoreData = () => {
    if (isDemo) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    setPage(nextPage);
    fetchNews(nextPage, true);
  };

  const handleTopicClick = (topic) => {
    setLocalSearch(topic);
    setActiveSource("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSourceFilter = (source) => {
    setActiveSource(source);
    setLocalSearch("");
  };

  let filtered = activeSearch
    ? articles.filter(
        (a) =>
          (a.title || "").toLowerCase().includes(activeSearch.toLowerCase()) ||
          (a.description || "").toLowerCase().includes(activeSearch.toLowerCase())
      )
    : articles;

  if (activeSource) {
    filtered = filtered.filter((a) => a.source?.name === activeSource);
  }

  return (
    <div className="container">
      <div className="page-header">
        <span className="page-header__tag">
          <span className="page-header__tag-dot"></span>
          {isDemo ? "Demo Mode" : "Live Headlines"}
        </span>
        <h1 className="page-header__title">
          {capitalize(category)} News
        </h1>
        <p className="page-header__subtitle">
          {isDemo
            ? "Showing demo data. Add VITE_NEWS_API key in .env for live news."
            : `Stay informed with the latest ${category} headlines from trusted sources worldwide`}
        </p>
        {!loading && (
          <div className="page-header__stats">
            <div className="page-header__stat">
              <div className="page-header__stat-value">{totalResults}</div>
              <div className="page-header__stat-label">Articles</div>
            </div>
            <div className="page-header__stat">
              <div className="page-header__stat-value">
                {new Set(articles.map((a) => a.source?.name).filter(Boolean)).size}
              </div>
              <div className="page-header__stat-label">Sources</div>
            </div>
            <div className="page-header__stat">
              <div className="page-header__stat-value">{filtered.length}</div>
              <div className="page-header__stat-label">Showing</div>
            </div>
          </div>
        )}
      </div>

      {!loading && articles.length > 0 && (
        <>
          <TrendingTopics articles={articles} onTopicClick={handleTopicClick} />
          <SourceFilter
            articles={articles}
            onFilterChange={handleSourceFilter}
            activeSource={activeSource}
          />
        </>
      )}

      {(localSearch || activeSource) && (
        <div className="active-filter">
          <span>
            Filtered by:{" "}
            <strong>{localSearch || activeSource}</strong>
          </span>
          <button
            className="active-filter__clear"
            onClick={() => {
              setLocalSearch("");
              setActiveSource("");
            }}
          >
            {"\u2715"} Clear
          </button>
        </div>
      )}

      {loading && <Spinner />}

      {error && !loading && (
        <div className="no-results">
          <div className="no-results__icon">{"\u26A0\uFE0F"}</div>
          <h3 className="no-results__title">Something went wrong</h3>
          <p className="no-results__text">
            Could not fetch news. Please check your API key and try again.
          </p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="no-results">
          <div className="no-results__icon">{"\u{1F50D}"}</div>
          <h3 className="no-results__title">No results found</h3>
          <p className="no-results__text">
            {activeSearch
              ? `No articles match "${activeSearch}"`
              : activeSource
              ? `No articles from "${activeSource}"`
              : "No articles available right now"}
          </p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={!isDemo && articles.length < totalResults}
            loader={<Spinner />}
          >
            <div className="news-grid">
              {filtered.map((article, index) => (
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
          </InfiniteScroll>

          {articles.length > 2 && (
            <PeopleAlsoRead articles={articles} currentIndex={0} />
          )}
        </>
      )}
    </div>
  );
};

export default News;
