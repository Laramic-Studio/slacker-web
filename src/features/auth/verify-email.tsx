import { Button } from "@/components/ui";
import { WorkspaceLayout } from "@/layouts/workspace/app";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useResendOtp, useVerifyOtp } from "@/services/mutations/useAuth";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/utils";

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const { mutateAsync: verifyOtp, isPending } = useVerifyOtp();
  const { mutateAsync: resendOtp, isPaused: otpPending } = useResendOtp();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }
    const counter = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(counter);
    };
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await verifyOtp({ otp });

      if (data.success) {
        toast.success(data.message);
        navigate("/workspace/create", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendOtp();
      if (data.success) {
        toast.success(data.message);
        setCountdown(60)
      }
    } catch (error) {
      console.log(error);
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <WorkspaceLayout
      title={"Where teams connect and collaborate"}
      subtitle={
        "Create your workspace, invite your team, and communicate seamlessly across all your projects"
      }
    >
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
          <div className="w-full items-center justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="w-full "
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Verify
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full mt-4"
            onClick={handleResendOtp}
            disabled={otpPending || countdown !== 0}
          >
            {otpPending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  Resend
                  {/* <ArrowRight className="w-4 h-4" /> */}
                </span>

                <span>({countdown})</span>
              </>
            )}
          </Button>
        </form>

        <Link
          to="/authenticate/login"
          className="mt-6 text-center flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="bg-background px-2 text-muted-foreground">
            Back to Login
          </span>
        </Link>
      </div>
    </WorkspaceLayout>
  );
};

export default VerifyEmailForm;
