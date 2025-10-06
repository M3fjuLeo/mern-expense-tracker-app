import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useUserAuth } from "../hooks/useUserAuth";

const ProtectedRoute = ({ children }) => {
  useUserAuth();
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
