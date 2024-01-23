import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../modules/auth/contexts/AuthContext";

export const AuthRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to={"/profile"} />;
  }

  return <Outlet />;
};
