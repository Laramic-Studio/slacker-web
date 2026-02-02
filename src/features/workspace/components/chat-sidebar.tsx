import { Search, Settings, Bell } from 'lucide-react';
import { currentUser, getChannelsByProject, type Project, type Channel, type DirectMessage } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { ProjectSwitcher } from './project-swicth';
import { ChannelList } from './chat-list';
import { DirectMessageList } from './direct-message';
import { UserAvatar } from './user-avatar';

interface ChatSidebarProps {
  currentProject: Project;
  activeChannelId: string;
  activeDMId?: string;
  onProjectChange: (project: Project) => void;
  onChannelSelect: (channel: Channel) => void;
  onDMSelect: (dm: DirectMessage) => void;
}

export function ChatSidebar({
  currentProject,
  activeChannelId,
  activeDMId,
  onProjectChange,
  onChannelSelect,
  onDMSelect,
}: ChatSidebarProps) {
  const projectChannels = getChannelsByProject(currentProject.id);

  return (
    <div className="flex flex-col h-full bg-sidebar w-64 border-r border-sidebar-border">
      {/* Project Switcher */}
      <div className="p-2 border-b border-sidebar-border">
        <ProjectSwitcher
          currentProject={currentProject}
          onProjectChange={onProjectChange}
        />
      </div>

      {/* Search */}
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-text-muted" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-full pl-8 h-8 bg-sidebar-bg-hover border-none text-sidebar-text placeholder:text-sidebar-text-muted focus-visible:ring-1 focus-visible:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Channels & DMs */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-6">
        <ChannelList
          channels={projectChannels}
          activeChannelId={activeChannelId}
          onChannelSelect={onChannelSelect}
        />
        <DirectMessageList
          activeDMId={activeDMId}
          onDMSelect={onDMSelect}
        />
      </div>

      {/* User Profile Footer */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-bg-hover transition-colors cursor-pointer">
          <UserAvatar user={currentUser} showStatus size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-text-active truncate">
              {currentUser.displayName}
            </p>
            <p className="text-xs text-sidebar-text-muted truncate">
              {currentUser.status}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-sidebar-bg-active transition-colors">
              <Bell className="w-4 h-4 text-sidebar-text-muted" />
            </button>
            <button className="p-1 rounded hover:bg-sidebar-bg-active transition-colors">
              <Settings className="w-4 h-4 text-sidebar-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
