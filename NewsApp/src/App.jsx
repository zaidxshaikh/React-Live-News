import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./components/NavBar";
import CategoryNav from "./components/CategoryNav";
import News from "./components/News";
import AiChatbot from "./components/AiChatbot";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const categories = [
  { key: "general", label: "General", icon: "\u{1F30D}" },
  { key: "business", label: "Business", icon: "\u{1F4C8}" },
  { key: "entertainment", label: "Entertainment", icon: "\u{1F3AC}" },
  { key: "health", label: "Health", icon: "\u{1F3E5}" },
  { key: "science", label: "Science", icon: "\u{1F52C}" },
  { key: "sports", label: "Sports", icon: "\u{26BD}" },
  { key: "technology", label: "Technology", icon: "\u{1F4BB}" },
];

const App = () => {
  const pageSize = 12;
  const country = "us";
  const apiKey = import.meta.env.VITE_NEWS_API;

  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pulse-theme") || "dark";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("pulse-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <Router>
      {progress > 0 && progress < 100 && (
        <div className="loading-bar" style={{ width: `${progress}%` }} />
      )}

      <NavBar
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
      />
      <CategoryNav categories={categories} />

      <main className="main-content">
        <Routes>
          {categories.map((cat) => (
            <Route
              key={cat.key}
              path={cat.key === "general" ? "/" : `/${cat.key}`}
              element={
                <News
                  setProgress={setProgress}
                  pageSize={pageSize}
                  country={country}
                  category={cat.key}
                  apiKey={apiKey}
                  searchQuery={searchQuery}
                  onArticlesLoaded={setAllArticles}
                />
              }
            />
          ))}
        </Routes>
      </main>

      <Footer />
      <BackToTop />
      <AiChatbot articles={allArticles} />
    </Router>
  );
};

export default App;
