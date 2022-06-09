import ComingSoon from '../../assets/images/ComingSoon.svg';
import { Spinner } from '../../components';
import styles from './Blog.module.scss';

export const Blog = () => {
  return (
    <div className={styles.blogContainer}>
      {/* <Spinner /> */}
      <img src={ComingSoon} alt="" />
    </div>
  );
};
