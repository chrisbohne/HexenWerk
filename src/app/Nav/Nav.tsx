import { useState, useEffect } from 'react';
import { useAuth, useLogout, useHandleResize } from '../../hooks';
import { Link, useLocation } from 'react-router-dom';
import { Button, Icon } from '../../components';
import styles from './Nav.module.scss';
import variables from '../style/variables.module.scss';

const Nav = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);
  const windowSize = useHandleResize();
  const location = useLocation();

  useEffect(() => {
    if (windowSize.width && windowSize.width > variables.lg && mobileOpen) {
      setMobileOpen(false);
    }

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    }

    if (!mobileOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [windowSize.width, mobileOpen]);

  const menuToggleHandler = () => {
    setMobileOpen((prev) => !prev);
  };

  const menuCloseHandler = () => {
    setMobileOpen(false);
  };

  const signout = async () => {
    await logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link onClick={menuCloseHandler} to="/">
          HexFinder
        </Link>
      </div>
      <div
        className={`${styles.navbar__menu} ${
          mobileOpen ? styles['navbar__menu-isOpen'] : ''
        }`}
      >
        <ul>
          <li data-testid="test-nav-item">
            <Link
              className={
                location.pathname === '/playground' ? styles.activated : ''
              }
              onClick={menuCloseHandler}
              to="/playground"
            >
              Playground
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === '/about' ? styles.activated : ''}
              onClick={menuCloseHandler}
              to="/about"
              state={{ from: location }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={
                location.pathname === '/discover' ? styles.activated : ''
              }
              onClick={menuCloseHandler}
              to="/discover"
              state={{ from: location }}
            >
              Discover
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === '/blog' ? styles.activated : ''}
              onClick={menuCloseHandler}
              to="/blog"
              state={{ from: location }}
            >
              Blog
            </Link>
          </li>
        </ul>
        <ul>
          {auth.accessToken ? (
            <>
              <li>
                {auth.role === 'ADMIN' ? (
                  <Link
                    className={
                      location.pathname === '/admin' ? styles.activated : ''
                    }
                    onClick={menuCloseHandler}
                    to="/admin"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    className={
                      location.pathname === '/profile' ? styles.activated : ''
                    }
                    onClick={menuCloseHandler}
                    to="/profile"
                  >
                    Profile
                  </Link>
                )}
              </li>
              <li>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={signout}
                  onKeyDown={signout}
                >
                  Logout
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  onClick={menuCloseHandler}
                  to="/login"
                  state={{ from: location }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Button type="primary">
                  <Link
                    onClick={menuCloseHandler}
                    to="/signup"
                    state={{ from: location }}
                  >
                    Register
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.navbar__toggle}>
        {mobileOpen ? (
          <Icon name="close" onClick={menuToggleHandler} />
        ) : (
          <Icon name="hamburger" onClick={menuToggleHandler} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
