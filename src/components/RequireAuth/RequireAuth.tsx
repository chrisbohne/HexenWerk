import { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface IProps {
  allowedRoles: string[];
}

const RequireAuth: FC<IProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useAuth();

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : user.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
