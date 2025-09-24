import React, { useEffect } from "react";
import "../ModalWithForm/ModalWithForm.css"; // reuse base modal styles
import "./RegisterSuccessModal.css";

export default function RegisterSuccessModal({ isOpen, onClose, onSignIn }) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_success"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={onClose} />
        <h2 className="success-modal__title">
          Registration successfully completed!
        </h2>
        <button
          type="button"
          className="success-modal__signin-btn"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
