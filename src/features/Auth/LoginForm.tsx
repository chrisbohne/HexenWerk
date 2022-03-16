import { FC, useRef, useState, useEffect, SyntheticEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api';
import { AxiosError } from 'axios';
import { useAuth, useInput } from '../../hooks';
import { useToggle } from '../../hooks';
import styles from './AuthForm.module.scss';
import { Button } from '../../components/Button/Button';

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

  return (
    <section className={styles.formContainer}>
      <p
        ref={errRef}
        className={errorMessage ? styles.errmsg : styles.offscreen}
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
        <Button type="primary">Login</Button>
        <div className={styles.persistCheck}>
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
        <span className={styles.line}>
          <Link to="/signup">Register</Link>
        </span>
      </p>
    </section>
  );
};
