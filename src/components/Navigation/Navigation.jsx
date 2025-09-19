import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";

function Navigation({ onSignInClick }) {
  return (
    <div className="navigation">
      <Link to="/">
        <button className="navigation__home">Home</button>
      </Link>
      <button className="navigation__signin" onClick={onSignInClick}>
        Sign In
      </button>
    </div>
  );
}

export default Navigation;
