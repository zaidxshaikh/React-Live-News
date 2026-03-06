import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span className="spinner-text">Loading latest news...</span>
    </div>
  );
};

export default Spinner;
