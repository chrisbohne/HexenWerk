import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth, useLocalStorage, useRefreshToken } from '../../hooks';
import { Spinner } from '../Spinner/Spinner ';

const PersistentLoginOutlet = () => {
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
  }, [auth.accessToken, refresh]);

  return <>{!persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistentLoginOutlet;
