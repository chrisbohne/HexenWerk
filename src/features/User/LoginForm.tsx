import { FC, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api';
// import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from './userSlice';
import './Register.scss';
import { AxiosError } from 'axios';
import { useAuth } from '../../hooks';

interface LocationState {
  from: {
    pathname: string;
  };
}

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';

  // const dispatch = useAppDispatch();
  const { setAuth } = useAuth();

  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = { email, password };
      const res = await authService.login(data);
      const username = res.username;
      const accessToken = res.accessToken;
      const role = res.role;
      // dispatch(
      //   setCredentials({ username, password, email, role, accessToken })
      // );
      setAuth({ username, password, email, role, accessToken });
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        setErrorMessage('No Server Response');
      } else if (err.response?.status === 400) {
        setErrorMessage('Missing email or pasword');
      } else if (err.response?.status === 401) {
        setErrorMessage('Wrong email or password');
      } else {
        setErrorMessage('Login failed');
      }
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errorMessage ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Login</button>
      </form>
      <p>
        Need an account?
        <br />
        <span className="line">
          <Link to="/signup">Register</Link>
        </span>
      </p>
    </section>
  );
};
