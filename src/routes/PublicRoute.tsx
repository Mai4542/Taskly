import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES } from '../constants/router';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to={APP_ROUTES.dashboard.projects} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
