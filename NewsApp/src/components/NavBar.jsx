import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import WeatherWidget from "./WeatherWidget";
import VoiceSearch from "./VoiceSearch";
import CountrySelector from "./CountrySelector";
import NotificationBell from "./NotificationBell";

const NavBar = ({
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  categories,
  country,
  onCountryChange,
  articles,
  weatherApiKey,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { path: "/bookmarks", label: "\u2665 Saved", icon: "\u2665" },
    { path: "/history", label: "\uD83D\uDD53 History", icon: "\uD83D\uDD53" },
    { path: "/analytics", label: "\uD83D\uDCCA Analytics", icon: "\uD83D\uDCCA" },
    { path: "/compare", label: "\u2696\uFE0F Compare", icon: "\u2696\uFE0F" },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <Link className="navbar__brand" to="/">
          <span className="navbar__brand-icon">Z</span>
          <span className="navbar__brand-dot">zaidxshaikh News</span>
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
            <VoiceSearch onResult={(text) => setSearchQuery(text)} />
          </div>
        </div>

        <div className="navbar__actions">
          <WeatherWidget apiKey={weatherApiKey} />
          <CountrySelector country={country} onCountryChange={onCountryChange} />
          <NotificationBell articles={articles} />

          <div className="navbar__page-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__page-link ${location.pathname === link.path ? "active" : ""}`}
                title={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>

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
          <VoiceSearch onResult={(text) => setSearchQuery(text)} />
        </div>

        <div className="mobile-menu__extras">
          <WeatherWidget apiKey={weatherApiKey} />
          <CountrySelector country={country} onCountryChange={onCountryChange} />
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
          <li className="mobile-menu__divider"></li>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                className={`mobile-menu__link ${location.pathname === link.path ? "active" : ""}`}
                to={link.path}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-menu__link-icon">{link.icon}</span>
                {link.label.replace(/^[^\s]+\s/, "")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavBar;
