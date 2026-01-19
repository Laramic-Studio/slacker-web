import { useState } from 'react';
import { AuthStep } from '@/components/onboarding/AuthStep';
import { InvitationStep } from '@/components/onboarding/InvitationStep';
import { CreateWorkspaceStep } from '@/components/onboarding/CreateWorkspaceStep';
import { InviteMembersStep } from '@/components/onboarding/InviteMembersStep';
import { OnboardingComplete } from '@/components/onboarding/OnboardingComplete';
import { 
  type OnboardingState, 
  type OnboardingStep, 
  type OnboardingUser,
  type Workspace,
  pendingInvitation,
  initialOnboardingState 
} from '@/data/onboardingData';

interface OnboardingProps {
  onComplete: () => void;
  hasInvitation?: boolean;
}

const Onboarding = ({ onComplete, hasInvitation = false }: OnboardingProps) => {
  const [state, setState] = useState<OnboardingState>({
    ...initialOnboardingState,
    invitation: hasInvitation ? pendingInvitation : null,
  });

  const setStep = (step: OnboardingStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const handleLogin = (email: string, _password: string) => {
    const user: OnboardingUser = {
      id: 'new-user-1',
      email,
      name: email.split('@')[0],
      isNewUser: false,
      hasWorkspace: !hasInvitation,
    };
    
    setState(prev => ({ ...prev, user }));

    if (hasInvitation) {
      setStep('invitation');
    } else {
      // Existing user with workspace - go directly to app
      onComplete();
    }
  };

  const handleRegister = (name: string, email: string, _password: string) => {
    const user: OnboardingUser = {
      id: 'new-user-1',
      email,
      name,
      isNewUser: true,
      hasWorkspace: false,
    };
    
    setState(prev => ({ ...prev, user }));

    if (hasInvitation) {
      setStep('invitation');
    } else {
      setStep('create-workspace');
    }
  };

  const handleAcceptInvitation = () => {
    setStep('complete');
  };

  const handleDeclineInvitation = () => {
    // Reset to create workspace flow
    setState(prev => ({ ...prev, invitation: null }));
    setStep('create-workspace');
  };

  const handleCreateWorkspace = (workspace: Partial<Workspace>) => {
    setState(prev => ({ ...prev, newWorkspace: workspace }));
    setStep('invite-members');
  };

  const handleInviteComplete = (emails: string[]) => {
    setState(prev => ({ ...prev, invitedEmails: emails }));
    setStep('complete');
  };

  const handleSkipInvites = () => {
    setStep('complete');
  };

  const handleBackToAuth = () => {
    setState(initialOnboardingState);
    setStep('auth');
  };

  const handleBackToCreateWorkspace = () => {
    setStep('create-workspace');
  };

  // Render current step
  switch (state.currentStep) {
    case 'auth':
      return (
        <AuthStep 
          onLogin={handleLogin}
          onRegister={handleRegister}
          hasInvitation={hasInvitation}
        />
      );
    
    case 'invitation':
      if (!state.user || !state.invitation) return null;
      return (
        <InvitationStep
          user={state.user}
          invitation={state.invitation}
          onAccept={handleAcceptInvitation}
          onDecline={handleDeclineInvitation}
        />
      );
    
    case 'create-workspace':
      if (!state.user) return null;
      return (
        <CreateWorkspaceStep
          user={state.user}
          onNext={handleCreateWorkspace}
          onBack={handleBackToAuth}
        />
      );
    
    case 'invite-members':
      if (!state.newWorkspace) return null;
      return (
        <InviteMembersStep
          workspace={state.newWorkspace}
          onComplete={handleInviteComplete}
          onBack={handleBackToCreateWorkspace}
          onSkip={handleSkipInvites}
        />
      );
    
    case 'complete':
      const workspace = state.invitation 
        ? { name: state.invitation.workspaceName, logo: state.invitation.workspaceLogo }
        : state.newWorkspace;
      
      if (!workspace) return null;
      
      return (
        <OnboardingComplete
          workspace={workspace}
          invitedCount={state.invitedEmails.length}
          onEnterWorkspace={onComplete}
          mode={state.invitation ? 'joined' : 'created'}
        />
      );
    
    default:
      return null;
  }
};

export default Onboarding;
