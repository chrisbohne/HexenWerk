import { FC, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api';
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

  const { setAuth } = useAuth();

  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [persist, setPersist] = useState(false);

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
      setAuth({ username, password, email, role, accessToken, persist });
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

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
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persisit"
            onChange={togglePersist}
            checked={persist}
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
