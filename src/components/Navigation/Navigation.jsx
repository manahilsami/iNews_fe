import "./Navigation.css";
import React from "react";
import { Link } from "react-router-dom";

function Navigation({ onSignInClick, user, onLogout }) {
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
          <div className="navigation__user-wrap">
            <button className="navigation__user-btn">
              {user.username || user.name}
            </button>
            <button
              type="button"
              className="navigation__logout-btn"
              onClick={onLogout}
              aria-label="Log out"
              title="Log out"
            >
              ⎋
            </button>
          </div>
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
