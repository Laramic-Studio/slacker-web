import { X } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { users, type User } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface MembersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MembersSidebar({ isOpen, onClose }: MembersSidebarProps) {
  const onlineUsers = users.filter(u => u.status === 'online');
  const awayUsers = users.filter(u => u.status === 'away');
  const offlineUsers = users.filter(u => u.status === 'offline' || u.status === 'busy');

  if (!isOpen) return null;

  return (
    <div className="w-60 border-l border-border bg-background h-full flex flex-col animate-slide-in-left">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border">
        <h2 className="font-semibold text-foreground">Members</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {/* Online */}
        {onlineUsers.length > 0 && (
          <MemberGroup title="Online" count={onlineUsers.length} users={onlineUsers} />
        )}

        {/* Away */}
        {awayUsers.length > 0 && (
          <MemberGroup title="Away" count={awayUsers.length} users={awayUsers} />
        )}

        {/* Offline */}
        {offlineUsers.length > 0 && (
          <MemberGroup title="Offline" count={offlineUsers.length} users={offlineUsers} />
        )}
      </div>
    </div>
  );
}

interface MemberGroupProps {
  title: string;
  count: number;
  users: User[];
}

function MemberGroup({ title, count, users }: MemberGroupProps) {
  return (
    <div className="mb-4">
      <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title} — {count}
      </div>
      <div className="space-y-0.5">
        {users.map(user => (
          <button
            key={user.id}
            className="flex items-center gap-2 w-full px-2 py-1.5 rounded-md hover:bg-muted transition-colors text-left"
          >
            <UserAvatar user={user} showStatus size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.displayName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.role}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
