import React from "react";
import AuthForm from "./AuthForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

const Login = ({ onSubmit, isLoading }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password);
  }

  return (
    <AuthForm
      name="login"
      title="Вход"
      defaultText="Войти"
      loadingText="Вход..."
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

export default Login;
