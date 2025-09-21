import "./Header.css";
import React from "react";
import logo from "../../images/NewsExplorer.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Header({ onSignInClick, user, onLogout }) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="NewsExplorer Logo" src={logo} />
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
