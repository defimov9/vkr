import React from "react";
import AuthForm from "./AuthForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const Register = ({ onSubmit, isLoading }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(
      values.email,
      values.password,
      values.registerName,
      values.registerAbout
    );
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      defaultText="Зарегистрироваться"
      loadingText="Регистрация..."
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={!isValid || isLoading}
    >
      <label htmlFor="email" className="popup__label">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
          className="popup__input auth__input"
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="email-error"
        >
          {errors.email || ""}
        </p>
      </label>
      <label htmlFor="registerName" className="popup__label">
        <input
          id="registerName"
          name="registerName"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          pattern="[a-zA-Zа-яА-Я -]{1,}"
          value={values.registerName || ""}
          onChange={handleChange}
          required
          className="popup__input auth__input"
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="email-error"
        >
          {errors.registerName || ""}
        </p>
      </label>
      <label htmlFor="registerAbout" className="popup__label">
        <input
          id="registerAbout"
          name="registerAbout"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={values.registerAbout || ""}
          onChange={handleChange}
          required
          className="popup__input auth__input"
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="email-error"
        >
          {errors.registerAbout || ""}
        </p>
      </label>
      <label htmlFor="password" className="popup__label">
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="30"
          value={values.password || ""}
          onChange={handleChange}
          required
          className="popup__input auth__input"
        />
        <p
          className={`popup__error${!isValid ? " popup__error_visible" : ""}`}
          id="password-error"
        >
          {errors.password || ""}
        </p>
      </label>
    </AuthForm>
  );
};

export default Register;
