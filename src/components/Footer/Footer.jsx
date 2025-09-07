import React from "react";
import "./Footer.css";
import github from "../../images/github.png";
import LinkedIn from "../../images/LinkedIn.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        <p className="footer__left-copyright">
          © 2025 Supersite, Powered by NewsAPI
        </p>
      </div>
      <div className="footer__right">
        <p className="footer__right-home">Home</p>
        <p className="footer__right-tt">TripleTen</p>
        <a
          href="https://github.com/manahilsami"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={github}
            alt="Github Logo"
            className="footer__right-github"
          />
        </a>
        <a
          href="https://linkedin.com/in/manahil-sami"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={LinkedIn}
            alt="LinkedIn Logo"
            className="footer__right-linkedin"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
