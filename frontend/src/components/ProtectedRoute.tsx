import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useUserAuth } from "../hooks/useUserAuth";

const ProtectedRoute = ({ children }) => {
  useUserAuth();

  const userContext = useContext(UserContext);
  if (!userContext) return <Navigate to="/login" replace />;

  const { user } = userContext;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
