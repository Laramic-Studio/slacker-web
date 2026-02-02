import { Navigate, Outlet, useLocation } from "react-router";
import { useUser } from "@/lib/auth";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser();
  const location = useLocation();

  if (isLoading) return null;

  // Not authenticated → login
  if (!user) {
    return <Navigate to="/authenticate/login" replace />;
  }

  const verificationRoutes = [
    "/authenticate/verify-email",
    "/authenticate/forgot-password",
    "/authenticate/reset-password",
  ];

  const isVerificationRoute = verificationRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  // Authenticated but not verified → force verify
  if (!user.email_verified_at && !isVerificationRoute) {
    return (
      <Navigate
        to="/authenticate/verify-email"
        replace
        state={{ from: location }}
      />
    );
  }

  // Verified users should not see verification pages
  if (user.email_verified_at && isVerificationRoute) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
