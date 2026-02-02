import { useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { directMessages, getDMParticipant, currentUser, type DirectMessage } from '@/data/mockData';
import { UserAvatar } from './user-avatar';

interface DirectMessageListProps {
  activeDMId?: string;
  onDMSelect: (dm: DirectMessage) => void;
}

export function DirectMessageList({ activeDMId, onDMSelect }: DirectMessageListProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 w-full px-2 py-1 text-xs font-semibold uppercase tracking-wider text-sidebar-text-muted hover:text-sidebar-text transition-colors group"
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        <span>Direct Messages</span>
        <Plus className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 hover:text-sidebar-text-active" />
      </button>

      {isExpanded && (
        <div className="mt-1 space-y-0.5">
          {directMessages.map((dm) => {
            const participant = getDMParticipant(dm, currentUser.id);
            if (!participant) return null;

            return (
              <button
                key={dm.id}
                onClick={() => onDMSelect(dm)}
                className={cn(
                  'channel-item w-full text-left',
                  activeDMId === dm.id && 'channel-item-active'
                )}
              >
                <UserAvatar user={participant} showStatus size="sm" />
                <span className="flex-1 truncate">{participant.displayName}</span>
                {dm.unreadCount && dm.unreadCount > 0 && activeDMId !== dm.id && (
                  <span className="unread-badge">{dm.unreadCount}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
