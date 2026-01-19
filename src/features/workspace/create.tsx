import { useState } from 'react';
import { Building2, Globe, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WorkspaceLayout } from "@/layouts/workspace/app";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';


const workspaceIcons = ['🏢', '🚀', '💼', '🎯', '⚡', '🌟', '🔥', '💡', '🎨', '📱'];

export const WorkspaceCreateForm = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceIcon, setWorkspaceIcon] = useState('🏢');
  const [visibility, setVisibility] = useState<'open' | 'invite-only'>('invite-only');
  const [isCreating, setIsCreating] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNext = async () => {
    if (!workspaceName.trim()) return;
    
    setIsCreating(true);
    
    
    setIsCreating(false);
  };

  return (
    <WorkspaceLayout >
      <div className="w-full max-w-xl">

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Create your workspace</h1>
            <p className="text-muted-foreground">
              Set up a home for your team's projects and conversations
            </p>
          </div>

          <div className="space-y-6">
            {/* Workspace icon */}
            <div className="space-y-3">
              <Label>Workspace Icon</Label>
              <div className="flex flex-wrap gap-2">
                {workspaceIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setWorkspaceIcon(icon)}
                    className={cn(
                      'w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all',
                      'border-2 hover:border-primary/50',
                      workspaceIcon === icon 
                        ? 'border-primary bg-primary/10' 
                        : 'border-transparent bg-muted'
                    )}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace name */}
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input
                id="workspace-name"
                type="text"
                placeholder="e.g., Acme Corporation"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="text-lg py-6"
              />
              {workspaceName && (
                <p className="text-sm text-muted-foreground">
                  Your workspace URL: <span className="font-mono text-foreground">teamspace.app/{generateSlug(workspaceName)}</span>
                </p>
              )}
            </div>

            {/* Visibility */}
            <div className="space-y-3">
              <Label>Who can join?</Label>
              <RadioGroup value={visibility} onValueChange={(v) => setVisibility(v as 'open' | 'invite-only')}>
                <label
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
                    visibility === 'invite-only' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <RadioGroupItem value="invite-only" className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="w-4 h-4 text-primary" />
                      <span className="font-medium">Invite only</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Recommended</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Only people you invite can join your workspace
                    </p>
                  </div>
                </label>

                <label
                  className={cn(
                    'flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all',
                    visibility === 'open' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <RadioGroupItem value="open" className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="font-medium">Open</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Anyone with your company email domain can join
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </div>

            {/* Tip */}
            <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Pro tip:</span> You can always change these settings later in your workspace preferences.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <Button 
              className="flex-1 gap-2" 
              onClick={handleNext}
              disabled={!workspaceName.trim() || isCreating}
            >
              {isCreating ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
    </WorkspaceLayout>
  );
};
