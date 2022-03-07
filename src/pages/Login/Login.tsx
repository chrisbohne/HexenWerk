import LoginForm from '../../features/User/LoginForm';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm login={() => alert('Logged In')} />
    </div>
  );
};

export default Login;
