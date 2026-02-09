import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService.ts';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  // const token = authService.getToken();

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;