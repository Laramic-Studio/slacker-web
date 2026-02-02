import { useState } from "react";
import { Globe, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WorkspaceLayout } from "@/layouts/workspace/app";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspace } from "@/services/mutations/useWorkspace";
import { generateSlug, getApiErrorMessage } from "@/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const WorkspaceCreateForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: workspaceName,
      description: workspaceDescription,
      visibility,
    };

    try {
      const data = await createWorkspace(payload);

      if (data.success) {
        toast.success(data.message);

        navigate("/workspace/invite", {
          replace: true,
          state: {
            workspace_name: data.data.workspace.name,
            slug: data.data.workspace.slug,
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <WorkspaceLayout
      title="Create your workspace"
      subtitle="Set up a home for your team's projects and conversations"
    >
      <form className="w-full max-w-xl" onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Workspace name */}
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              type="text"
              placeholder="e.g., Acme Corporation"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
            {workspaceName && (
              <p className="text-sm text-muted-foreground">
                Your workspace URL:{" "}
                <span className="font-mono text-foreground">
                  slacker.teamspace.app/{generateSlug(workspaceName)}
                </span>
              </p>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <Label>Who can join?</Label>
            <RadioGroup
              value={visibility}
              onValueChange={(v) => setVisibility(v as "public" | "private")}
            >
              <label
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                  visibility === "private"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30",
                )}
              >
                <RadioGroupItem value="private" className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Invite only</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only people you invite can join your workspace
                  </p>
                </div>
              </label>

              <label
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all",
                  visibility === "public"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30",
                )}
              >
                <RadioGroupItem value="public" className="mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4" />
                    <span className="font-medium">public</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Anyone with your company email domain can join
                  </p>
                </div>
              </label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workspace-name">
              Workspace description (optional)
            </Label>
            <Textarea
              placeholder="describe..."
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Button
            className="flex-1 gap-2"
            // onClick={handleNext}
            disabled={!workspaceName.trim() || isPending}
          >
            {isPending ? (
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
      </form>
    </WorkspaceLayout>
  );
};
