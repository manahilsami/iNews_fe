import { useEffect } from "react";
import PropTypes from "prop-types";
import "../ModalWithForm/ModalWithForm.css";
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

RegisterSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};
