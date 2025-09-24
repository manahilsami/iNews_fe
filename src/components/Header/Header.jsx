import "./Header.css";
import { useState } from "react";
import logoWhite from "../../images/NewsExplorer-white.svg";
import logoBlack from "../../images/NewsExplorer-black.svg";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header({ onSignInClick, user, onLogout, isSaved }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className={`header${isSaved ? " header--saved" : ""}`}>
      <Link to="/">
        <img
          className="header__logo"
          alt="NewsExplorer Logo"
          src={isSaved ? logoBlack : logoWhite}
        />
      </Link>
      <button
        className="header__menu"
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
      />
      <div className="header__right">
        <Navigation
          onSignInClick={onSignInClick}
          user={user}
          onLogout={onLogout}
          isSaved={isSaved}
        />
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSignInClick={onSignInClick}
        onHomeClick={() => navigate("/")}
        user={user}
      />
    </header>
  );
}
export default Header;
