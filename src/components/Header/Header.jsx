import "./Header.css";
import React from "react";
import logo from "../../images/NewsExplorer.svg";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="NewsExplorer Logo" src={logo} />
      <div className="header__right">
        <Navigation />
      </div>
    </header>
  );
}
export default Header;
