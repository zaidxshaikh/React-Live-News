import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          Built with React &middot; Powered by NewsAPI &middot;{" "}
          <span className="footer__brand">zaidxshaikh News</span> &copy;{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
