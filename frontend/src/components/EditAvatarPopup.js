import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const EditAvatarPopup = ({
  onUpdateAvatar,
  onOverlayClick,
  isLoading,
  isOpen,
  onClose,
}) => {
  const { values, handleChange, isValid, errors, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values.avatar);
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      isLoading={isLoading}
      isDisabled={!isValid || isLoading}
      name="edit-avatar"
      title="Обновить аватар"
    >
      <label htmlFor="avatar" className="popup__label popup__label_file">
        {values.avatar ? values.avatar.name : `Выберите изображение`}
        <input
          type="file"
          name="avatar"
          id="avatar"
          className="popup__input popup__input_type_file"
          placeholder="Загрузить аватар"
          value={values.fileInput || ""}
          onChange={handleChange}
          required
          accept="image/*"
        />
      </label>
      <p
        className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
        id="avatar-error"
      >
        {errors.avatar || ""}
      </p>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
