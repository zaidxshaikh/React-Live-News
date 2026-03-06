import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ theme, toggleTheme, searchQuery, setSearchQuery, categories }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link className="navbar__brand" to="/">
          <span className="navbar__brand-icon">P</span>
          <span className="navbar__brand-dot">PulseNews</span>
        </Link>

        <div className="navbar__center">
          <div className="navbar__search">
            <span className="navbar__search-icon">{"\u{1F50D}"}</span>
            <input
              className="navbar__search-input"
              type="text"
              placeholder="Search headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="navbar__actions">
          <button
            className="navbar__theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "\u{2600}\u{FE0F}" : "\u{1F319}"}
          </button>
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "\u{2715}" : "\u{2630}"}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-menu__search">
          <input
            type="text"
            placeholder="Search headlines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ul className="mobile-menu__links">
          {categories.map((cat) => (
            <li key={cat.key}>
              <Link
                className="mobile-menu__link"
                to={cat.key === "general" ? "/" : `/${cat.key}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-menu__link-icon">{cat.icon}</span>
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
