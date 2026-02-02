import api from "@/lib/api";
import type { CreateWorkspacePayload, CreateWorkspaceResponse, getWorkspaceResponse, InviteMemberPayload, InviteMemberResponse } from "@/types/api";


export const createWorkspace = async (payload: CreateWorkspacePayload): Promise<CreateWorkspaceResponse> => {
  const response = await api.post('/workspace/create', payload);
  return response.data;
};


export const inviteMembers = async (payload: InviteMemberPayload): Promise<InviteMemberResponse> => {
  const response = await api.post('/workspace/invite-members', payload);
  return response.data;
};

export const getWorkspace = async (): Promise<getWorkspaceResponse> => {
  const response = await api.post('/workspace');
  return response.data;
};