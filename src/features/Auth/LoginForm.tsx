import { FC, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api';
import './Register.scss';
import { AxiosError } from 'axios';
import { useAuth, useInput } from '../../hooks';
import { useToggle } from '../../hooks';

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

  const { setAuth } = useAuth();
  const [check, toggleCheck] = useToggle('persist', false);

  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, resetEmail, emailAttribs] = useInput('email', '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const item = localStorage.getItem('persist');
  // const localPersist = item !== null ? JSON.parse(item) : '';
  // const [persist, setPersist] = useState<boolean>(localPersist);

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
      setAuth({ username, password, email, role, accessToken });
      resetEmail();
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

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem('persist', JSON.stringify(persist));
  // }, [persist]);

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
        <input type="text" id="email" {...emailAttribs} required />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Login</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persisit"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persisit">Trust this device</label>
        </div>
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
