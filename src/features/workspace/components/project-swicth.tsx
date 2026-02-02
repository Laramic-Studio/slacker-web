import { ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { projects, type Project } from '@/data/mockData';

interface ProjectSwitcherProps {
  currentProject: Project;
  onProjectChange: (project: Project) => void;
}

export function ProjectSwitcher({ currentProject, onProjectChange }: ProjectSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 w-full px-3 py-2 hover:bg-sidebar-bg-hover rounded-md transition-colors">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: currentProject.color + '20' }}
        >
          {currentProject.icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-semibold text-sidebar-text-active truncate">
            {currentProject.name}
          </p>
        </div>
        <ChevronDown className="w-4 h-4 text-sidebar-text-muted shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 bg-popover border-border shadow-dropdown"
      >
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground">Switch Project</p>
        </div>
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => onProjectChange(project)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-sm"
              style={{ backgroundColor: project.color + '20' }}
            >
              {project.icon}
            </div>
            <span className="flex-1">{project.name}</span>
            {project.id === currentProject.id && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-muted-foreground">
          <Plus className="w-4 h-4" />
          <span>Create new project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
