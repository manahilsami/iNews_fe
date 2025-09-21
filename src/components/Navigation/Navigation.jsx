import "./Navigation.css";
import React from "react";
import logoutIcon from "../../images/logout.svg";
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
            <div className="navigation__user-btn">
              <span className="navigation__username">
                {user.username || user.name}
              </span>
              <img
                src={logoutIcon}
                alt="Log out"
                className="navigation__logout-icon"
                width={24}
                height={24}
                onClick={onLogout}
                role="button"
              />
            </div>
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
