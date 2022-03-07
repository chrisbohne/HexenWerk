import { useDispatch } from 'react-redux';
import { IRegistration } from '../../features/User/interfaces';
import RegistrationForm from '../../features/User/RegistrationForm';
import { registerUser } from '../../features/User/userSlice';

const Registration = () => {
  const dispatch = useDispatch();

  const signup = (data: IRegistration) => {
    dispatch(registerUser(data));
  };

  return (
    <div>
      <h2>Registration</h2>
      <RegistrationForm signUp={signup} />
    </div>
  );
};

export default Registration;
