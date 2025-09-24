import React, { useState, useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  noValidate = false,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.body.classList.add("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <button
        className="modal__close"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      />
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <form
          className="modal__form"
          onSubmit={onSubmit}
          noValidate={noValidate}
        >
          {children}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
