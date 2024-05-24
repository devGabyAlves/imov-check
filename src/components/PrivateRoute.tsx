import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }: { element: React.FC }) => {
  const isLoggedIn = localStorage.getItem('token');

  return isLoggedIn ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
