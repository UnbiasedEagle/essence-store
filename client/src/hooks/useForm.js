import { useState } from 'react';

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    setErrors([]);
    setFormState((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return [formState, handleChange, errors, setErrors];
};
