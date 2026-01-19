import { useState } from 'react';
import { Check, Users, Calendar, Shield, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Invitation, OnboardingUser } from '@/data/onboardingData';
import { format } from 'date-fns';

interface InvitationStepProps {
  user: OnboardingUser;
  invitation: Invitation;
  onAccept: () => void;
  onDecline: () => void;
}

export const InvitationStep = ({ user, invitation, onAccept, onDecline }: InvitationStepProps) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onAccept();
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'member': return 'Team Member';
      case 'guest': return 'Guest';
      default: return role;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin': return 'Full access to all channels and workspace settings';
      case 'member': return 'Access to public channels and assigned private channels';
      case 'guest': return 'Limited access to specific channels only';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-primary-foreground">T</span>
          </div>
        </div>

        {/* Invitation card */}
        <div className="bg-card rounded-2xl shadow-xl border overflow-hidden">
          {/* Header with workspace branding */}
          <div className="bg-sidebar p-8 text-center">
            <div className="w-20 h-20 rounded-2xl bg-sidebar-bg-active flex items-center justify-center mx-auto mb-4 text-4xl">
              {invitation.workspaceLogo || '🏢'}
            </div>
            <h2 className="text-2xl font-bold text-sidebar-text-active mb-2">
              {invitation.workspaceName}
            </h2>
            <p className="text-sidebar-text">
              You've been invited to join this workspace
            </p>
          </div>

          {/* Invitation details */}
          <div className="p-8">
            {/* Inviter info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <Avatar className="w-12 h-12">
                <AvatarImage src={invitation.inviterAvatar} />
                <AvatarFallback>{invitation.inviterName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Invited by</p>
                <p className="font-semibold">{invitation.inviterName}</p>
                <p className="text-sm text-muted-foreground">{invitation.inviterEmail}</p>
              </div>
            </div>

            {/* Role and permissions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Your Role: {getRoleLabel(invitation.role)}</p>
                  <p className="text-sm text-muted-foreground">
                    {getRoleDescription(invitation.role)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Join the Team</p>
                  <p className="text-sm text-muted-foreground">
                    Connect with your team members instantly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Invitation Expires</p>
                  <p className="text-sm text-muted-foreground">
                    {format(invitation.expiresAt, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* User joining as */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-2">You're joining as</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-medium">
                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{user.name || 'New User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onDecline}
                disabled={isAccepting}
              >
                <X className="w-4 h-4 mr-2" />
                Decline
              </Button>
              <Button
                className="flex-1"
                onClick={handleAccept}
                disabled={isAccepting}
              >
                {isAccepting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Accept & Join
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Wrong account?{' '}
          <button className="text-primary hover:underline">Sign in with a different account</button>
        </p>
      </div>
    </div>
  );
};
