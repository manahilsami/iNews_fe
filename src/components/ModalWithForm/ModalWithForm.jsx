import React, { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ title, isOpen, onClose, onSubmit, children }) {
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
      {" "}
      {/* clicking overlay outside of modal closes it */}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* prevents closing when clicking inside modal */}
        <button className="modal__close" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
