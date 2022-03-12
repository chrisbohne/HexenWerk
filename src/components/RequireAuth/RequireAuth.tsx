import { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface IProps {
  allowedRoles: string[];
}

const RequireAuth: FC<IProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { auth } = useAuth();

  return allowedRoles.includes(auth.role) ? (
    <Outlet />
  ) : auth.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
