import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from '../../components/Modal/Modal';
import styles from './Nav.module.scss';
// import Login from '../../containers/Login/Login';
// import Register from '../../containers/Register/Register';

interface ISize {
  width: number | undefined;
  height: number | undefined;
}

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState<ISize>({
    width: undefined,
    height: undefined,
  });
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleModal = () => {
    setShowModal((p) => !p);
  };

  const showLogin = () => {
    setIsLogin(true);
    toggleModal();
  };

  const showRegister = () => {
    setIsLogin(false);
    toggleModal();
  };

  const login = async (data: any) => {
    toggleModal();
  };

  const signup = async (data: any) => {
    toggleModal();
  };

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
          <li>
            {/* <button onClick={showLogin}>Login</button> */}
            <Link to="/login">Login</Link>
          </li>
          <li>
            {/* <button onClick={showRegister}>Register</button> */}
            <Link to="/signup">Register</Link>
          </li>
        </ul>
      </div>
      <div className={styles.navbar__toggle}>
        {menuOpen ? (
          <AiOutlineClose onClick={menuToggleHandler} />
        ) : (
          <BiMenuAltRight onClick={menuToggleHandler} />
        )}
      </div>
      {/* {showModal ? (
        <Modal onClose={toggleModal}>
          {isLogin ? <Login login={login} /> : <Register signUp={signup} />}
        </Modal>
      ) : null} */}
    </nav>
  );
};

export default Nav;