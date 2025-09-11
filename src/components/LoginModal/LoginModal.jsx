import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSubmit,
  onRegisterClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Resets form fields when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ email, password });
  };

  return (
    <div className="login-modal">
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title="Sign in"
      >
        <label htmlFor="login-email" className="login-modal__label">
          Email
          <input
            className="login-modal__input"
            type="email"
            id="login-email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="login-password" className="login-modal__label">
          Password
          <input
            className="login-modal__input"
            type="password"
            id="login-password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="login-modal__btn-section">
          <button
            type="submit"
            className={`login-modal__submit-btn ${
              email && password ? "login-modal__submit_active" : ""
            }`}
            disabled={!email || !password}
          >
            Sign in
          </button>
          <button
            type="button"
            className="login-modal__login-or-text"
            onClick={onRegisterClick}
          >
            or Sign up
          </button>
        </div>
      </ModalWithForm>
    </div>
  );
}
