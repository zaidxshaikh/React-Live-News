import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 6;
  const country = "us";
  const apiKey = import.meta.env.VITE_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country={country}
                category="general"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                country={country}
                category="business"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                country={country}
                category="entertainment"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                country={country}
                category="health"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                country={country}
                category="science"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                country={country}
                category="sports"
                apiKey={apiKey}
              />
            }
          />

          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                country={country}
                category="technology"
                apiKey={apiKey}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
