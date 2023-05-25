import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const AddPlacePopup = ({
  isOpen,
  onClose,
  onUpdatePlace,
  onOverlayClick,
  isLoading,
}) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePlace({
      title: values.title,
      link: values.link,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isLoading={isLoading}
      isDisabled={!isValid || isLoading}
      name="add-photo"
      title="Новое место"
    >
      <label htmlFor="title" className="popup__label">
        <input
          type="text"
          name="title"
          id="title"
          className={`popup__input${
            !isValid && errors.title ? " popup__input_type_error" : ""
          }`}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={values.title || ""}
          onChange={handleChange}
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="title-error"
        >
          {errors.title || ""}
        </p>
      </label>
      <label htmlFor="link" className="popup__label popup__label_file">
        {values.link ? values.link.name : `Выберите изображение`}
        <input
          type="file"
          name="link"
          id="link"
          className="popup__input popup__input_type_file"
          placeholder="Выберите файл"
          required
          value={values.fileInput || ""}
          onChange={handleChange}
          accept="image/*"
        />
      </label>
      <p
        className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
        id="link-error"
      >
        {errors.link || ""}
      </p>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
