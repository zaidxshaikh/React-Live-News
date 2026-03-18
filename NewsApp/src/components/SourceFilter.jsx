import React, { useState, useMemo } from "react";

const SourceFilter = ({ articles, onFilterChange, activeSource }) => {
  const [expanded, setExpanded] = useState(false);

  const sources = useMemo(() => {
    const sourceMap = {};
    articles.forEach((a) => {
      const name = a.source?.name;
      if (name) {
        sourceMap[name] = (sourceMap[name] || 0) + 1;
      }
    });
    return Object.entries(sourceMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [articles]);

  if (sources.length < 2) return null;

  const visible = expanded ? sources : sources.slice(0, 6);

  return (
    <div className="source-filter">
      <div className="source-filter__header">
        <span className="source-filter__icon">{"\uD83D\uDCF0"}</span>
        <h3 className="source-filter__title">Filter by Source</h3>
      </div>
      <div className="source-filter__tags">
        <button
          className={`source-filter__tag ${!activeSource ? "active" : ""}`}
          onClick={() => onFilterChange("")}
        >
          All
          <span className="source-filter__tag-count">{articles.length}</span>
        </button>
        {visible.map((src) => (
          <button
            key={src.name}
            className={`source-filter__tag ${activeSource === src.name ? "active" : ""}`}
            onClick={() =>
              onFilterChange(src.name === activeSource ? "" : src.name)
            }
          >
            {src.name}
            <span className="source-filter__tag-count">{src.count}</span>
          </button>
        ))}
        {sources.length > 6 && (
          <button
            className="source-filter__more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show less" : `+${sources.length - 6} more`}
          </button>
        )}
      </div>
    </div>
  );
};

export default SourceFilter;
