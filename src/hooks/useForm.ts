import { ChangeEvent, useState } from 'react';

interface IUseForm {
  username?: string;
  password?: string;
  email?: string;
}

const useForm = () => {
  const [values, setValues] = useState<IUseForm>({});
  const [errors, setErrors] = useState<IUseForm>({});

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'username':
        if (value.length < 3) {
          setErrors({
            ...errors,
            username: 'Username must have at least 3 characters',
          });
        } else {
          const newObj = { ...errors };
          delete newObj.username;
          setErrors(newObj);
        }
        break;

      case 'email':
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: 'Enter a valid email address',
          });
        }
        break;

      case 'password':
        if (value.length < 8) {
          setErrors({
            ...errors,
            password: 'Password should contain at least 8 characters',
          });
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const name = e.target.id;
    const value = e.target.value;

    validate(name, value);

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
  };
};

export default useForm;
