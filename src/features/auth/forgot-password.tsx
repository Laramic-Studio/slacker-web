import { Button, Input } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/layouts/auth/app";
import { ArrowRight, Lock, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <AuthLayout 
     title={"Where teams connect and collaborate"}
     subtitle={"Create your workspace, invite your team, and communicate seamlessly across all your projects"}>
    <div className="w-full max-w-md">
        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-2xl font-bold">TeamSpace</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Forgot password?</h2>
          <p className="text-muted-foreground">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-100" />
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        <Link to="/authenticate/login" className="mt-6 text-center flex items-center justify-center">
             <ArrowLeft className="w-4 h-4" />
           <span className="bg-background px-2 text-muted-foreground">
                Back to <Link to="/authenticate/login">Login</Link>
              </span>
          </Link>

          
        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <button type="button" className="text-primary hover:underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-primary hover:underline">
            Privacy Policy
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordForm;
