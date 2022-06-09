import { useNavigate } from 'react-router-dom';
import styles from './Unauthorized.module.scss';

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className={styles.unauthorizedContainer}>
      <h1>Sorry you are not authorized</h1>
      <button onClick={goBack}>go back</button>
    </div>
  );
};
