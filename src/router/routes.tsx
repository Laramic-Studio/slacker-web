import type { RouteObject } from "react-router";
import {
  Login,
  Register,
  ForgotPassword,
  CreateWorkspace,
  VerifyEmail,
  WorkspaceHome,
} from "@/pages";
import { ErrorBoundaryFallback } from "../components/error-boundary-fallback";
import { injectErrorBoundary } from "@/utils";
import GuestRoute from "./guest-route";
import ProtectedRoute from "./protected-route";

const routesObject: RouteObject[] = [
  {
    path: "/",
    element: <WorkspaceHome />,
  },
  {
    path: "/authenticate",
    element: <GuestRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <GuestRoute />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "auth/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "workspace/create",
        element: <CreateWorkspace />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
];

const routes = injectErrorBoundary(routesObject, <ErrorBoundaryFallback />);

export default routes;
