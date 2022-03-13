import { ReactNode, useEffect, useState, FC } from 'react';
import { useAuth, useLocalStorage, useRefreshToken } from '../../hooks';
import { Spinner } from '../Spinner/Spinner ';

interface IProps {
  children: ReactNode;
}

const PersistLoginWrapper: FC<IProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, [refresh, auth.accessToken]);

  return <>{!persist ? children : isLoading ? <Spinner /> : children}</>;
};

export default PersistLoginWrapper;
