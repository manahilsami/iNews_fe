import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./MobileMenu.css";
import logoWhite from "../../images/NewsExplorer-white.svg";

export default function MobileMenu({
  isOpen,
  onClose,
  onSignInClick,
  onHomeClick,
  user,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="mobile-menu__panel" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu__top">
          <img
            src={logoWhite}
            alt="NewsExplorer"
            className="mobile-menu__logo"
          />
          <button
            type="button"
            aria-label="Close menu"
            className="mobile-menu__close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="mobile-menu__content">
          <Link
            to="/"
            className="mobile-menu__home"
            onClick={() => {
              onHomeClick?.();
              onClose();
            }}
          >
            Home
          </Link>
          {user ? (
            <Link
              to="/saved-news"
              className="mobile-menu__saved"
              onClick={onClose}
            >
              Saved articles
            </Link>
          ) : null}

          {!user ? (
            <button
              type="button"
              className="mobile-menu__signin"
              onClick={() => {
                onClose();
                onSignInClick?.();
              }}
            >
              Sign in
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignInClick: PropTypes.func,
  onHomeClick: PropTypes.func,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      _id: PropTypes.string,
    }),
    PropTypes.oneOf([null]),
  ]),
};

MobileMenu.defaultProps = {
  onSignInClick: undefined,
  onHomeClick: undefined,
  user: null,
};
