import React from "react";
import useClose from "../hooks/useClose";

const PopupWithForm = (props) => {
  const {
    isOpen,
    name,
    onClose,
    onSubmit,
    title,
    children,
    onOverlayClick,
    isLoading,
    isDisabled,
  } = props;
  useClose(isOpen, onClose);
  const popupClassNames = `popup ${isOpen ? "popup_opened" : ""}`;
  const buttonText = isLoading ? "Сохранение..." : "Сохранить";

  return (
    <section
      className={popupClassNames}
      id={`popup-${name}`}
      onMouseDown={onOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <form
          className="popup__form"
          name={`form-${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <p className="popup__title">{title}</p>
          {children}
          <button
            type="submit"
            className={`popup__button-save${
              isDisabled ? " popup__button-save_disabled" : ""
            }`}
            disabled={isDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
