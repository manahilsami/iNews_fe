import "./Header.css";
import React from "react";
import logo from "../../images/NewsExplorer.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="NewsExplorer Logo" src={logo} />
      <div className="header__right">
        <p className="header__home">Home</p>
        <p className="header__signin">Sign In</p>
      </div>
    </header>
  );
}
export default Header;
