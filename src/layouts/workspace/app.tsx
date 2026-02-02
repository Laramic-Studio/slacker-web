import { Building2, Users } from "lucide-react";

interface Props {
  children: React.ReactNode;
  title?: string,
  subtitle?: string
}

export const WorkspaceLayout = ({  children, title, subtitle }: Props) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">
                T
              </span>
            </div>
            <span className="text-2xl font-bold text-sidebar-text-active">
              TeamSpace
            </span>
          </div>

          <h1 className="text-4xl font-bold text-sidebar-text-active mb-6">
            {title}
            {/* You've been invited to collaborate */}
          </h1>
          <p className="text-lg text-sidebar-text mb-12">
            {subtitle}
           {/* Accept your invitation to join your team's workspace and start collaborating instantly. */}
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sidebar-bg-active flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sidebar-text-active mb-1">
                  Project-based channels
                </h3>
                <p className="text-sidebar-text text-sm">
                  Organize conversations by project with dedicated channels for
                  your team.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sidebar-bg-active flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sidebar-text-active mb-1">
                  Secure collaboration
                </h3>
                <p className="text-sidebar-text text-sm">
                  Keep internal teams and external clients connected with scoped
                  access.
                </p>
              </div>
            </div>
          </div>
        </div>

       

        <p className="text-sidebar-text-muted text-sm">
          Trusted by 10,000+ teams worldwide
        </p>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        {children}
      </div>
    </div>
  );
};
