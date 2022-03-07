import RegistrationForm from '../../features/User/RegistrationForm';

const Registration = () => {
  return (
    <div>
      <h2>Registration</h2>
      <RegistrationForm signUp={() => alert('Logged In')} />
    </div>
  );
};

export default Registration;
