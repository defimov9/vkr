import React, { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const EditProfilePopup = ({
  isOpen,
  onUpdateUser,
  onClose,
  onOverlayClick,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, false);
    }
  }, [currentUser, resetForm, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isLoading={isLoading}
      isDisabled={!isValid || isLoading}
      name="edit-profile"
      title="Редактировать профиль"
    >
      <label htmlFor="name" className="popup__label">
        <input
          type="text"
          name="name"
          id="name"
          className={`popup__input${
            !isValid && errors.name ? " popup__input_type_error" : ""
          }`}
          placeholder="Введите имя"
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-Я -]{1,}"
          required
          value={values.name || ""}
          onChange={handleChange}
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="name-error"
        >
          {errors.name || ""}
        </p>
      </label>
      <label htmlFor="about" className="popup__label">
        <input
          type="text"
          name="about"
          id="about"
          className={`popup__input${
            !isValid && errors.about ? " popup__input_type_error" : ""
          }`}
          placeholder="Укажите профессию"
          minLength="2"
          maxLength="200"
          required
          value={values.about || ""}
          onChange={handleChange}
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="about-error"
        >
          {errors.about || ""}
        </p>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
