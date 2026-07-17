import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';
import { APP_ROUTES } from '../constants/router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate to={APP_ROUTES.auth.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
