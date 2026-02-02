import { createWorkspace, inviteMembers } from "@/apis/workspace";
import { useMutation } from '@tanstack/react-query';
import type { CreateWorkspacePayload, CreateWorkspaceResponse, InviteMemberPayload, InviteMemberResponse } from "@/types/api";
import type { AxiosError } from "axios";

export const useCreateWorkspace = () => {
  return useMutation<CreateWorkspaceResponse, AxiosError, CreateWorkspacePayload>({
    mutationFn: createWorkspace,
  });
}

export const useInviteMembers = () => {
  return useMutation<InviteMemberResponse, AxiosError, InviteMemberPayload>({
    mutationFn: inviteMembers,
  });
}