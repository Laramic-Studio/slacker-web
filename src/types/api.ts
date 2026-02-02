import { Work } from '@/layouts/workspace/app';
export interface User {
  id: string;
  full_name: string;
  email: string;
  username: string;
  last_login: string;
  updated_at: string;
  created_at: string;
  organisation_id?: string;
  email_verified_at?: string
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  code: number,
  data: {
    user: User;
    token: string;
    token_type: string;
    expires_in?: number;
    email_verified?: boolean;
  };
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  code: number,
  data: {
    user: User;
    token: string;
    token_type: string;
    email_verified: boolean;
  };
}

export interface OtpVerificationPayload {
  otp: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  message: string;
  data?: {
    email_verified: boolean;
  };
}

export interface PasswordResetOtpPayload {
  email: string;
}

export interface PasswordResetOtpResponse {
  success: boolean;
  message: string;
  data?: {
    expires_at?: string;
    otp?: string; // Only in development
  };
}

export interface PasswordResetVerifyPayload {
  email: string;
  otp: string;
}

export interface PasswordResetVerifyResponse {
  success: boolean;
  message: string;
  data?: {
    verified: boolean;
  };
}

export interface PasswordResetPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message?: string;
  errors?: Record<string, string[]>;
}


interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  visibility: string;
  logo: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
  visibility: string;
  logo?: File;
}

export interface CreateWorkspaceResponse {
  success: boolean;
  message: string;
  code: number,
  data: {
    workspace: Workspace;
  };
}

export interface InviteMemberPayload {
  emails: string[];
}

export interface InviteMemberResponse {
  success: boolean;
  message: string;
  code: number,
  data: {
    workspace: Workspace;
  };
}

export interface getWorkspaceResponse {
  success: boolean;
  message: string;
  code: number,
  data: {
    workspace: Workspace;
  };
}

/********************************************
 *                  WORKSPACE API                     *
**********************************************/


export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'guest';
export type WorkspaceVisibility = 'public' | 'private' | 'invite-only';

export interface User {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role: string;
  email: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  workspaceRole: WorkspaceRole;
  joinedAt: Date;
  invitedBy?: string;
}

export interface WorkspaceSettings {
  id: string;
  name: string;
  icon: string;
  description: string;
  visibility: WorkspaceVisibility;
  allowGuestAccess: boolean;
  defaultChannelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
  threadCount?: number;
  isEdited?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  projectId: string;
  unreadCount?: number;
  lastMessage?: string;
}

export interface DirectMessage {
  id: string;
  participants: string[];
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
  color: string;
}