import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-section">
            <div className="footer__logo">
              <span className="footer__logo-icon">Z</span>
              <span className="footer__logo-text">zaidxshaikh News</span>
            </div>
            <p className="footer__tagline">
              Your AI-powered news platform with real-time headlines from trusted sources worldwide.
            </p>
          </div>

          <div className="footer__links-section">
            <h4 className="footer__links-title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/" className="footer__link">Home</Link>
              <Link to="/bookmarks" className="footer__link">{"\u2665"} Bookmarks</Link>
              <Link to="/history" className="footer__link">{"\uD83D\uDD53"} History</Link>
              <Link to="/analytics" className="footer__link">{"\uD83D\uDCCA"} Analytics</Link>
              <Link to="/compare" className="footer__link">{"\u2696\uFE0F"} Compare</Link>
            </div>
          </div>

          <div className="footer__links-section">
            <h4 className="footer__links-title">Categories</h4>
            <div className="footer__links">
              <Link to="/business" className="footer__link">Business</Link>
              <Link to="/technology" className="footer__link">Technology</Link>
              <Link to="/sports" className="footer__link">Sports</Link>
              <Link to="/entertainment" className="footer__link">Entertainment</Link>
              <Link to="/health" className="footer__link">Health</Link>
              <Link to="/science" className="footer__link">Science</Link>
            </div>
          </div>

          <div className="footer__links-section">
            <h4 className="footer__links-title">Features</h4>
            <div className="footer__links">
              <span className="footer__link footer__link--static">{"\u{1F916}"} AI Chatbot</span>
              <span className="footer__link footer__link--static">{"\u2728"} AI Summaries</span>
              <span className="footer__link footer__link--static">{"\uD83C\uDF99\uFE0F"} Voice Search</span>
              <span className="footer__link footer__link--static">{"\u{1F30D}"} Multi-Country</span>
              <span className="footer__link footer__link--static">{"\u2600\uFE0F"} Weather</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__text">
            Built with React &middot; Powered by NewsAPI &middot;{" "}
            <span className="footer__brand">zaidxshaikh News</span> &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
