
import "./Navigation.css";
import React from "react";

function Navigation({ onSignInClick }) {
  return (
    <div className="navigation">
      <button className="navigation__home">Home</button>
      <button className="navigation__signin" onClick={onSignInClick}>Sign In</button>
    </div>
  );
}

export default Navigation;
