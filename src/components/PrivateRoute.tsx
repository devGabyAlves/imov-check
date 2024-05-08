import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }: { element: React.FC; path: string }) => {
  const isLoggedIn = localStorage.getItem("token");

  return isLoggedIn ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
