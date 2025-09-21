import "./Header.css";
import React from "react";
import logoWhite from "../../images/NewsExplorer-white.svg";
import logoBlack from "../../images/NewsExplorer-black.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ onSignInClick, user, onLogout, isSaved }) {
  return (
    <header className={`header${isSaved ? " header--saved" : ""}`}>
      <Link to="/">
        <img
          className="header__logo"
          alt="NewsExplorer Logo"
          src={isSaved ? logoBlack : logoWhite}
        />
      </Link>
      <div className="header__right">
        <Navigation
          onSignInClick={onSignInClick}
          user={user}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}
export default Header;
