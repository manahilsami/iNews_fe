import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";

function Navigation({ onSignInClick, user }) {
  return (
    <div className="navigation">
      <Link to="/">
        <button className="navigation__home">Home</button>
      </Link>
      {user ? (
        <>
          <Link to="/saved-news">
            <button className="navigation__saved">Saved articles</button>
          </Link>
          <button className="navigation__user-btn">{user.name}</button>
        </>
      ) : (
        <button className="navigation__signin" onClick={onSignInClick}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default Navigation;
