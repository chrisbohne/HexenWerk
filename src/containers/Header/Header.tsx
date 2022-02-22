import { useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <li>
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
            <button>Login</button>
          </li>
          <li>
            <button>Register</button>
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
    </nav>
    // <header className={styles.header}>
    //   <div className={styles.header__content}>
    //     <div>
    //       <span className={styles.header__content__logo}>HexFinder</span>
    //     </div>
    //     <nav
    //       className={`${styles.header__content__nav} ${
    //         menuOpen ? styles.isMenu : ''
    //       }`}
    //     >
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/playground">Playground</Link>
    //         </li>
    //         <li>
    //           <Link to="/discover">Discover</Link>
    //         </li>
    //         <li>
    //           <Link to="/blog">Blog</Link>
    //         </li>
    //       </ul>
    //       <button>Register</button>
    //     </nav>
    //     <div className={styles.header__content__toggle}>
    //       {menuOpen ? (
    //         <AiOutlineClose onClick={menuToggleHandler} />
    //       ) : (
    //         <BiMenuAltRight onClick={menuToggleHandler} />
    //       )}
    //     </div>
    //   </div>
    // </header>
  );
};

export default Nav;
