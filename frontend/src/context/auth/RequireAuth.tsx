import { useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return user ? children : null;
}

export default RequireAuth;
