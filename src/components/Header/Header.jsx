import "./Header.css";
import React from "react";
import logo from "../../images/NewsExplorer.svg";
import Navigation from "../Navigation/Navigation";

function Header({ onSignInClick }) {
  return (
    <header className="header">
      <img className="header__logo" alt="NewsExplorer Logo" src={logo} />
      <div className="header__right">
        <Navigation onSignInClick={onSignInClick} />
      </div>
    </header>
  );
}
export default Header;
