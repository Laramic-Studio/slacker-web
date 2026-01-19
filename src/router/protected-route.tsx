import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "@/lib/auth";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  // Check if email is verified, except on verification-related routes
  const isVerificationRoute =
    location.pathname.startsWith("/authenticate/verify-email") ||
    location.pathname.startsWith("/authenticate/forgot-password") ||
    location.pathname.startsWith("/authenticate/reset-password");

  if (!user.email_verified_at && !isVerificationRoute) {
    return <Navigate to="/auth/verify-email" replace={true} />;
  }

  // If user is verified but on verification page, redirect to home
  if (
    user.email_verified_at &&
    isVerificationRoute &&
    location.pathname.startsWith("/authenticate/verify-email")
  ) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
