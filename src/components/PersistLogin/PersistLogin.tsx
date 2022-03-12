import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth, useRefreshToken } from '../../hooks';
import { Spinner } from '../Spinner/Spinner ';

const PersistentLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

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
  }, []);

  return (
    <>{!auth.persist ? <Outlet /> : isLoading ? <Spinner /> : <Outlet />}</>
  );
};

export default PersistentLogin;
