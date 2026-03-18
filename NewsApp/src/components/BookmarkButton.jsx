import React, { useState, useEffect } from "react";

const STORAGE_KEY = "zaidxshaikh-bookmarks";

export const getBookmarks = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const toggleBookmark = (article) => {
  const bookmarks = getBookmarks();
  const exists = bookmarks.findIndex((b) => b.url === article.url);
  if (exists >= 0) {
    bookmarks.splice(exists, 1);
  } else {
    bookmarks.unshift({ ...article, bookmarkedAt: new Date().toISOString() });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  window.dispatchEvent(new Event("bookmarks-updated"));
  return exists < 0;
};

export const isBookmarked = (url) => {
  return getBookmarks().some((b) => b.url === url);
};

const BookmarkButton = ({ article }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isBookmarked(article.url));
    const handler = () => setSaved(isBookmarked(article.url));
    window.addEventListener("bookmarks-updated", handler);
    return () => window.removeEventListener("bookmarks-updated", handler);
  }, [article.url]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleBookmark(article);
    setSaved(nowSaved);
  };

  return (
    <button
      className={`bookmark-btn ${saved ? "bookmark-btn--saved" : ""}`}
      onClick={handleClick}
      title={saved ? "Remove bookmark" : "Save article"}
    >
      {saved ? "\u2665" : "\u2661"}
    </button>
  );
};

export default BookmarkButton;
