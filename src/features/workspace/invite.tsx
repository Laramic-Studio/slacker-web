import { useState } from "react";
import { Mail, Plus, X, Copy, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { WorkspaceLayout } from "@/layouts/workspace/app";
import {  useNavigate } from "react-router";
import { useInviteMembers } from "@/services/mutations/useWorkspace";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/utils";
import { useFetchWorkspace } from "@/services/queries/useWorkspace";

const InviteWorkspaceMembers = () => {
  const navigate = useNavigate();
  const { mutateAsync: InviteMembers, isPending } = useInviteMembers();
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const { data: workspace, isLoading } = useFetchWorkspace();

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const inviteLink = `https://teamspace.app/invite/${workspace?.data.workspace.slug}`;

  const addEmail = () => {
    const email = currentEmail.trim().toLowerCase();
    if (email && email.includes("@") && !emails.includes(email)) {
      setEmails([...emails, email]);
      setCurrentEmail("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    }
  };

  const copyInviteLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvites = async () => {
    try {
      const data = await InviteMembers({ emails });

      if (data.success) {
        toast.success(data.message);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <WorkspaceLayout>
      <div className="w-full max-w-xl">
        <div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Invite your team</h1>
            <p className="text-muted-foreground">
              Collaboration is better together. Add your teammates to{" "}
              <span className="font-medium text-foreground">
                {workspace?.data.workspace.name}
              </span>
            </p>
          </div>

          <div className="space-y-6">
            {/* Email input */}
            <div className="space-y-2">
              <Label>Email addresses</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type="email"
                    placeholder="colleague@company.com"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pl-10"
                    leftIcon={<Mail className="w-4 h-4 " />}
                  />
                </div>
                <Button type="button" variant="outline" onClick={addEmail}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Press Enter or comma to add multiple emails
              </p>
            </div>

            {/* Email tags */}
            {emails.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {emails.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm"
                  >
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Invite preview */}
            {emails.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-medium mb-3">Invitation preview</p>
                <div className="bg-background rounded-lg border p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                      ⚠️
                    </div>
                    <div>
                      <p className="font-semibold">
                        {workspace?.data.workspace.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        teamspace.app/{workspace?.data.workspace.slug}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    You've been invited to join{" "}
                    <span className="font-medium text-foreground">
                      {workspace?.data.workspace.name}
                    </span>{" "}
                    on TeamSpace.
                  </p>
                  <div className="text-xs text-primary font-medium">
                    Click to accept invitation →
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or share invite link
                </span>
              </div>
            </div>

            {/* Invite link */}
            <div className="space-y-2">
              <Label>Invite link</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={inviteLink}
                  className="font-mono text-sm bg-muted/50"
                />
                <Button
                  variant="outline"
                  onClick={copyInviteLink}
                  className={cn(
                    "shrink-0 gap-2 transition-all",
                    copied && "bg-green-50 border-green-200 text-green-700",
                  )}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Anyone with this link can join your workspace
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            {emails.length === 0 ? (
              <Button
                variant="ghost"
                className="flex-1"
                // onClick={onSkip}
              >
                Skip for now
              </Button>
            ) : (
              <Button
                className="flex-1 gap-2"
                onClick={handleSendInvites}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending invites...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send {emails.length} invite{emails.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

export default InviteWorkspaceMembers;
