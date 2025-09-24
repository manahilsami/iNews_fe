import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./MobileMenu.css";
import logoWhite from "../../images/NewsExplorer-white.svg";

export default function MobileMenu({
  isOpen,
  onClose,
  onSignInClick,
  onHomeClick,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Prevent background scroll while menu is open
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
        </div>
      </div>
    </div>,
    document.body
  );
}
