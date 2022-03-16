import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { useLogout } from '../../hooks';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import styles from './Nav.module.scss';

interface ISize {
  width: number | undefined;
  height: number | undefined;
}

const Nav = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState<ISize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width && size.width > 1024 && menuOpen) {
      setMenuOpen(false);
    }

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    }

    if (!menuOpen) {
      document.body.style.overflow = 'unset';
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const menuCloseHandler = () => {
    setMenuOpen(false);
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
          menuOpen ? styles['navbar__menu-isOpen'] : ''
        }`}
      >
        <ul>
          <li data-testid="test-nav-item">
            <Link onClick={menuCloseHandler} to="/playground">
              Playground
            </Link>
          </li>
          <li>
            <Link onClick={menuCloseHandler} to="/about">
              About
            </Link>
          </li>
          <li>
            <Link onClick={menuCloseHandler} to="/discover">
              Discover
            </Link>
          </li>
          <li>
            <Link onClick={menuCloseHandler} to="/blog">
              Blog
            </Link>
          </li>
        </ul>
        <ul>
          {auth.accessToken ? (
            <>
              <li>
                {auth.role === 'USER' ? (
                  <Link onClick={menuCloseHandler} to="/profile">
                    Profile
                  </Link>
                ) : (
                  <Link onClick={menuCloseHandler} to="/admin">
                    Admin
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
                <Link onClick={menuCloseHandler} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Button type="primary">
                  <Link onClick={menuCloseHandler} to="/signup">
                    Register
                  </Link>
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.navbar__toggle}>
        {menuOpen ? (
          <Icon name="close" onClick={menuToggleHandler} />
        ) : (
          <Icon name="hamburger" onClick={menuToggleHandler} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
