import { Navigate } from 'react-router-dom';

const isValidToken = (token: string | null) => {
  if (!token) {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(parts[1]));

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

const PrivateRoute = ({ element: Element }: { element: React.FC }) => {
  const token = localStorage.getItem('token');

  const isValidTokenResult = isValidToken(token);

  if (!isValidTokenResult) {
    localStorage.removeItem('token');
  }

  return isValidTokenResult ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
