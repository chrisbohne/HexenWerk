import { useState, ChangeEvent, SyntheticEvent } from 'react';

const useForm = (callback: () => void) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event: SyntheticEvent) => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
