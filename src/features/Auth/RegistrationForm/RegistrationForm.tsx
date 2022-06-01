import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../api';
import { AxiosError } from 'axios';
import { Button, Icon } from '../../../components';

import styles from './RegistrationForm.module.scss';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const errRef = useRef<HTMLParagraphElement>(null);

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [uniqueUsername, setUniqueUsername] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
  const [passwordConfirmFocus, setPasswordConfirmFocus] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === passwordConfirm;
    setValidPasswordConfirm(match);
  }, [password, passwordConfirm]);

  useEffect(() => {
    setErrorMessage('');
  }, [username, password, passwordConfirm, email]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    // if button enabled
    const vUser = USERNAME_REGEX.test(username);
    const vPwd = PWD_REGEX.test(password);
    const vEmail = EMAIL_REGEX.test(email);
    if (!vUser || !vPwd || !vEmail) {
      setErrorMessage('Invalid Entry');
      return;
    }

    try {
      const data = { username, email, password };
      await authService.register(data);
      setUsername('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
      navigate('/');
    } catch (error) {
      const err = error as AxiosError;
      if (!err.response) setErrorMessage('No Server Response');
      else if (err.response.status === 403) {
        setErrorMessage('Email already exists');
        setValidEmail(false);
      } else setErrorMessage('Registration failed');
      if (errRef.current) errRef.current.focus();
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (validUsername) {
        const isTaken = await authService.usernameTaken(username);
        if (isTaken) {
          setErrorMessage('Username already taken');
          setUniqueUsername(false);
        } else {
          setErrorMessage('');
          setUniqueUsername(true);
        }
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [username, validUsername]);

  return (
    <section className={styles.formContainer}>
      <p
        ref={errRef}
        className={errorMessage ? styles.errmsg : styles.offscreen}
        aria-live="assertive"
      >
        {errorMessage}
      </p>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username:
          <span
            className={
              validUsername && uniqueUsername ? styles.valid : styles.hide
            }
          >
            <Icon name="check" />
          </span>
          <span
            className={
              (validUsername && uniqueUsername) || !username
                ? styles.hide
                : styles.invalid
            }
          >
            <Icon name="cancel" />
          </span>
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-invalid={validUsername ? 'false' : 'true'}
          aria-describedby="uidnote"
          onFocus={() => setUsernameFocus(true)}
          onBlur={() => setUsernameFocus(false)}
        />
        <p
          id="uidnote"
          className={
            usernameFocus && username && !validUsername
              ? styles.instructions
              : styles.offscreen
          }
        >
          <Icon name="info" />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="email">
          Email:
          <span className={validEmail ? styles.valid : styles.hide}>
            <Icon name="check" />
          </span>
          <span className={validEmail || !email ? styles.hide : styles.invalid}>
            <Icon name="cancel" />
          </span>
        </label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={
            emailFocus && email && !validEmail
              ? styles.instructions
              : styles.offscreen
          }
        >
          <Icon name="info" />
          Must contain a valid email address.
        </p>

        <label htmlFor="password">
          Password:
          <span className={validPassword ? styles.valid : styles.hide}>
            <Icon name="check" />
          </span>
          <span
            className={
              validPassword || !password ? styles.hide : styles.invalid
            }
          >
            <Icon name="cancel" />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPassword ? 'false' : 'true'}
          aria-describedby="pwdnote"
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            passwordFocus && password && !validPassword
              ? styles.instructions
              : styles.offscreen
          }
        >
          <Icon name="info" />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{' '}
          <span aria-label="exclamation mark">!</span>{' '}
          <span aria-label="at symbol">@</span>{' '}
          <span aria-label="hashtag">#</span>{' '}
          <span aria-label="dollar sign">$</span>{' '}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="passwordConfirm">
          Confirm Password:
          <span
            className={
              validPasswordConfirm && passwordConfirm
                ? styles.valid
                : styles.hide
            }
          >
            <Icon name="check" />
          </span>
          <span
            className={
              validPasswordConfirm || !passwordConfirm
                ? styles.hide
                : styles.invalid
            }
          >
            <Icon name="cancel" />
          </span>
        </label>
        <input
          type="password"
          id="passwordConfirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          aria-invalid={validPasswordConfirm ? 'false' : 'true'}
          aria-describedby="confirmnote"
          onFocus={() => setPasswordConfirmFocus(true)}
          onBlur={() => setPasswordConfirmFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            passwordConfirmFocus && passwordConfirm && !validPasswordConfirm
              ? styles.instructions
              : styles.offscreen
          }
        >
          <Icon name="info" />
          Must match password.
        </p>

        <Button
          type="primary"
          disabled={
            !validUsername ||
            !uniqueUsername ||
            !validEmail ||
            !validPassword ||
            !validPasswordConfirm
              ? true
              : false
          }
        >
          Register
        </Button>
      </form>
      <p className={styles.test}>
        Already registered?
        <br />
        <span className={styles.line}>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </section>
  );
};
