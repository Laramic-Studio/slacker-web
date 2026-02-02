import { type FC } from "react";
import { Navigate, Outlet } from "react-router";
import { useUser } from "@/lib/auth";

const GuestRoute: FC = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return null;

  if (user) {
    if(!user.email_verified_at) return <Outlet />

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};


export default GuestRoute;
