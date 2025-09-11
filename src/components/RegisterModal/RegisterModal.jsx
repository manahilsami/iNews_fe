import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Resets form when the modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit({ email, password, name });
  };

  return (
    <div className="register-modal">
      <ModalWithForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title="Sign up"
      >
        <label htmlFor="register-email" className="register-modal__label">
          Email
          <input
            type="email"
            className="register-modal__input"
            id="register-email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="register-password" className="register-modal__label">
          Password
          <input
            type="password"
            className="register-modal__input"
            id="register-password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="register-username" className="register-modal__label">
          Username
          <input
            type="text"
            className="register-modal__input"
            id="register-username"
            placeholder="Enter your username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="register-modal__btn-section">
          <button
            type="submit"
            className={`register-modal__submit-btn ${
              email && password && name
                ? "register-modal__submit-btn_active"
                : ""
            }`}
            disabled={!email || !password || !name}
          >
            Sign up
          </button>
          <button
            type="button"
            className="register-modal__register-or-text"
            onClick={onLoginClick}
          >
            or Sign in
          </button>
        </div>
      </ModalWithForm>
    </div>
  );
}
