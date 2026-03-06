import React from "react";
import { Link, useLocation } from "react-router-dom";

const CategoryNav = ({ categories }) => {
  const location = useLocation();

  const isActive = (key) => {
    if (key === "general") return location.pathname === "/";
    return location.pathname === `/${key}`;
  };

  return (
    <div className="category-nav">
      <ul className="category-nav__list">
        {categories.map((cat) => (
          <li className="category-nav__item" key={cat.key}>
            <Link
              className={`category-nav__link ${isActive(cat.key) ? "active" : ""}`}
              to={cat.key === "general" ? "/" : `/${cat.key}`}
            >
              <span className="category-nav__icon">{cat.icon}</span>
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
