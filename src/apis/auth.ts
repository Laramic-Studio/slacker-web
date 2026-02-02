import api from '@/lib/api';
import type {
  LoginPayload,
  LoginResponse,
  OtpVerificationPayload,
  OtpVerificationResponse,
  RegisterPayload,
  RegisterResponse,
  PasswordResetOtpPayload,
  PasswordResetOtpResponse,
  PasswordResetVerifyPayload,
  PasswordResetVerifyResponse,
  PasswordResetPayload,
  PasswordResetResponse,
} from '@/types/api';


export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const verifyOtp = async (payload: OtpVerificationPayload): Promise<OtpVerificationResponse> => {
  const response = await api.post('/auth/verify-email', payload);
  return response.data;
};

export const sendOtp = async (email: string) => {
  const response = await api.post('/auth/send-otp', { email });
  return response.data;
};

export const resendOtp = async () => {
  const response = await api.post('/auth/resend-otp');
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Password Reset functions
export const sendPasswordResetOtp = async (payload: PasswordResetOtpPayload): Promise<PasswordResetOtpResponse> => {
  const response = await api.post('/password-reset/send-otp', payload);
  return response.data;
};

export const verifyPasswordResetOtp = async (payload: PasswordResetVerifyPayload): Promise<PasswordResetVerifyResponse> => {
  const response = await api.post('/password-reset/verify-otp', payload);
  return response.data;
};

export const resetPassword = async (payload: PasswordResetPayload): Promise<PasswordResetResponse> => {
  const response = await api.post('/password-reset/reset', payload);
  return response.data;
};

export const resendPasswordResetOtp = async (payload: PasswordResetOtpPayload): Promise<PasswordResetOtpResponse> => {
  const response = await api.post('/password-reset/resend-otp', payload);
  return response.data;
};
