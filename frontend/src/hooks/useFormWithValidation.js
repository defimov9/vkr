import React, { useState, useCallback } from "react";

const useFormWithValidation = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (evt) => {
    const input = evt.target;
    const { name, value, type } = input;

    if (type !== "file") {
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest("form").checkValidity());
    }

    if (type === "file") {
      const file = input.files[0];
      setValues({ ...values, [name]: file, fileInput: input.value });
      setErrors({
        ...errors,
        [name]:
          file && file.size < 5000000
            ? ""
            : "Выберите изображение размером до 5Мб",
      });
      setIsValid(input.closest("form").checkValidity() && file.size < 5000000);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
};

export default useFormWithValidation;
