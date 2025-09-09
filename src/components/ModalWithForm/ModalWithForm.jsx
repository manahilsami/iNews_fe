import React from "react";
import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" type="button" />
        <h2 className="modal__title">Modal Title</h2>
        <form className="modal__form">
          <label className="modal__label">Input Label</label>
          <input
            type="text"
            className="modal__input"
            placeholder="Enter text"
          />
          <button type="submit" className="modal__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
