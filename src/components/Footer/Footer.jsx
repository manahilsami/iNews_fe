import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className="footer__right-home-link">
          <p className="footer__right-home">Home</p>
        </Link>
        <Link
          to="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__right-tt"
        >
          TripleTen
        </Link>
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
