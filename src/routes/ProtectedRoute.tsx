import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES } from '../constants/router';

interface ProtectedRouteProps {
  
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return (
      <Navigate to={APP_ROUTES.auth.login} state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
