import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index';
import { APP_ROUTES } from '../constants/router';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to={APP_ROUTES.dashboard.projects} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
