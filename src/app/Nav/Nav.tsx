import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks';
import { useLogout } from '../../hooks';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
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
    if (!size.width) return;
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const signout = async () => {
    await logout();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__logo}>
        <Link to="/">HexFinder</Link>
      </div>
      <div
        className={`${styles.navbar__menu} ${menuOpen ? styles.isMenu : ''}`}
      >
        <ul>
          <li data-testid="test-nav-item">
            <Link to="/playground">Playground</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/discover">Discover</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>
        <ul>
          {auth.accessToken ? (
            <>
              <li>
                {auth.role === 'USER' ? (
                  <Link to="/profile">Profile</Link>
                ) : (
                  <Link to="/admin">Admin</Link>
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
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.navbar__toggle}>
        {menuOpen ? (
          <AiOutlineClose onClick={menuToggleHandler} />
        ) : (
          <BiMenuAltRight onClick={menuToggleHandler} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
