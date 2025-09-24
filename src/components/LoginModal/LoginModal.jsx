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
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setEmailError("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern =
      /^(?:[a-zA-Z0-9_'^&\/+{}=!?$%#`~.-]+)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    onLoginSubmit({ email, password });
  };

  return (
    <div className="login-modal">
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        noValidate
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
          {emailError && (
            <p className="login-modal__error" role="alert">
              {emailError}
            </p>
          )}
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
          <div className="login-modal__login-or-text">
            <span>or </span>
            <button
              type="button"
              className="login-modal__signup-btn"
              onClick={onRegisterClick}
            >
              Sign up
            </button>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
}
