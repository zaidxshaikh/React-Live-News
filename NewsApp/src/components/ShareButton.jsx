import React, { useState } from "react";

const ShareButton = ({ url, title }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: "\uD83D\uDCAC",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, "_blank"),
    },
    {
      name: "Twitter",
      icon: "\uD83D\uDC26",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "LinkedIn",
      icon: "\uD83D\uDCBC",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank"),
    },
    {
      name: "Copy Link",
      icon: "\uD83D\uDD17",
      action: () => {
        navigator.clipboard.writeText(url).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      },
    },
  ];

  return (
    <div className="share-btn-wrapper">
      <button
        className="share-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (navigator.share) {
            navigator.share({ title, url }).catch(() => setOpen(!open));
          } else {
            setOpen(!open);
          }
        }}
        title="Share article"
      >
        {"\u2197"}
      </button>
      {open && (
        <div className="share-dropdown" onClick={(e) => e.stopPropagation()}>
          {shareOptions.map((opt) => (
            <button
              key={opt.name}
              className="share-dropdown__item"
              onClick={() => {
                opt.action();
                if (opt.name !== "Copy Link") setOpen(false);
              }}
            >
              <span>{opt.icon}</span>
              <span>{opt.name === "Copy Link" && copied ? "Copied!" : opt.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
