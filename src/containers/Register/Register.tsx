import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

interface IProps {
  signUp(data: IFormInput): void;
}

const Register: FC<IProps> = ({ signUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">Username</label>
      <input id="username" {...register('username', { required: true })} />
      {errors.username && <p>This field is required</p>}
      <label htmlFor="email">Email</label>
      <input id="email" {...register('email')} />
      <label htmlFor="password">Password</label>
      <input id="password" {...register('password')} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;

// import { FC } from 'react';
// import useForm from '../../hooks/useForm';

// interface IRegister {
//   onSubmit(username: string, email: string, password: string): void;
// }

// const Register: FC<IRegister> = ({ onSubmit }) => {
//   const { values, handleChange, handleSubmit } = useForm(register);

//   function register() {
//     const { username, email, password } = values;
//     onSubmit(username, email, password);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           onChange={handleChange}
//           // value={values.username}
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           onChange={handleChange}
//           // value={values.email}
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           name="password"
//           type="password"
//           onChange={handleChange}
//           // value={values.password}
//         />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
