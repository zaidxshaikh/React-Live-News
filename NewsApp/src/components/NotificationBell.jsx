import React, { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "zaidxshaikh-notifications";

const NotificationBell = ({ articles }) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const prevArticlesRef = useRef([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setNotifications(saved);
      setUnread(saved.filter((n) => !n.read).length);
    } catch {}
  }, []);

  useEffect(() => {
    if (prevArticlesRef.current.length > 0 && articles.length > 0) {
      const prevUrls = new Set(prevArticlesRef.current.map((a) => a.url));
      const newArticles = articles.filter((a) => !prevUrls.has(a.url));

      if (newArticles.length > 0) {
        const newNotifs = newArticles.slice(0, 3).map((a) => ({
          id: Date.now() + Math.random(),
          title: a.title,
          source: a.source?.name,
          url: a.url,
          time: new Date().toISOString(),
          read: false,
        }));

        setNotifications((prev) => {
          const updated = [...newNotifs, ...prev].slice(0, 20);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
        setUnread((prev) => prev + newNotifs.length);
      }
    }
    prevArticlesRef.current = articles;
  }, [articles]);

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    setUnread(0);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnread(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getTimeAgo = (dateStr) => {
    const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="notification-bell">
      <button
        className="notification-bell__btn"
        onClick={() => setOpen(!open)}
        title="Notifications"
      >
        {"\uD83D\uDD14"}
        {unread > 0 && (
          <span className="notification-bell__badge">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-panel">
          <div className="notification-panel__header">
            <h4>Notifications</h4>
            <div className="notification-panel__actions">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="notification-panel__action"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="notification-panel__action">
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="notification-panel__list">
            {notifications.length === 0 ? (
              <div className="notification-panel__empty">
                <span>{"\uD83D\uDD14"}</span>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <a
                  key={notif.id}
                  href={notif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`notification-item ${!notif.read ? "notification-item--unread" : ""}`}
                  onClick={() => {
                    const updated = notifications.map((n) =>
                      n.id === notif.id ? { ...n, read: true } : n
                    );
                    setNotifications(updated);
                    setUnread(updated.filter((n) => !n.read).length);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                  }}
                >
                  <div className="notification-item__dot"></div>
                  <div className="notification-item__content">
                    <p className="notification-item__title">{notif.title}</p>
                    <div className="notification-item__meta">
                      <span>{notif.source}</span>
                      <span>{getTimeAgo(notif.time)}</span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
