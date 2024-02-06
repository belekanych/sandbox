import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Loading from "@/modules/auth/pages/Loading";

export const AuthRoute = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Navigate to={"/profile"} />;
  }

  return <Outlet />;
};
