import { Link } from 'react-router-dom';
import Hero from '../../assets/images/Hero.svg';
import { Button } from '../../components/Button/Button';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.hero__ctaContainer}>
          <div className={styles.hero__ctaText}>
            <h1>HexFinder</h1>
            <p>
              The perfect place to learn about algorithm and discover fun and
              interesting things about computer science.
            </p>
          </div>
          <div className={styles.hero__ctaButton}>
            <Button type="primary">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button type="secondary">
              <Link to="/playground">Play Around</Link>
            </Button>
          </div>
        </div>
        <div
          className={styles.hero__image}
          style={{ backgroundImage: `url(${Hero})` }}
        ></div>
      </div>
      <div className={styles.explanation}>
        <div className={styles.explanation__description}>
          <h2>What is HexFinder?</h2>
          <Button type="secondary">Watch the Video</Button>
        </div>
        <div className={styles.explanation__list}>
          <ul>
            <li>Fun</li>
            <li>Learn</li>
            <li>Experiment</li>
          </ul>
        </div>
      </div>
      <div className={styles.upcomming}>
        <h2>What{"'"}s next?</h2>
        <div className={styles.upcomming__list}>
          <ul>
            <li>Fun</li>
            <li>Learn</li>
            <li>Experiment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
