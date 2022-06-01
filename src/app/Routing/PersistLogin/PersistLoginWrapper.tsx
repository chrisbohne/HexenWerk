import { ReactNode, useEffect, useState } from 'react';
import { useAuth, useLocalStorage, useRefreshToken } from '../../../hooks';
import { Spinner } from '../../../components/Spinner/Spinner ';

interface PersistenLoginWrapperProps {
  children: ReactNode;
}

export const PersistLoginWrapper = ({
  children,
}: PersistenLoginWrapperProps) => {
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
