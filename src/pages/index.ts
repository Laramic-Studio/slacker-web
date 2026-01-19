import { lazy } from 'react';

export const Login = lazy(() => import('./auth/login'));
export const Register = lazy(() => import('./auth/register'));
export const VerifyEmail = lazy(() => import('./auth/verify-email'));
export const ForgotPassword = lazy(() => import('./auth/forgot-password'));
export const ResetPassword = lazy(() => import('./auth/reset-password'));
export const CreateWorkspace = lazy(() => import('./workspace/create'));
export const WorkspaceHome = lazy(() => import('./workspace/home'));