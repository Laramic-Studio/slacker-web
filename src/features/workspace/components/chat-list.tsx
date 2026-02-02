import { useState } from 'react';
import { Hash, Lock, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Channel } from '@/data/mockData';

interface ChannelListProps {
  channels: Channel[];
  activeChannelId: string;
  onChannelSelect: (channel: Channel) => void;
}

export function ChannelList({ channels, activeChannelId, onChannelSelect }: ChannelListProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const publicChannels = channels.filter(ch => !ch.isPrivate);
  const privateChannels = channels.filter(ch => ch.isPrivate);

  return (
    <div className="space-y-4">
      {/* Public Channels */}
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 w-full px-2 py-1 text-xs font-semibold uppercase tracking-wider text-sidebar-text-muted hover:text-sidebar-text transition-colors"
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
          <span>Channels</span>
          <Plus className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 hover:text-sidebar-text-active" />
        </button>

        {isExpanded && (
          <div className="mt-1 space-y-0.5">
            {publicChannels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                isActive={channel.id === activeChannelId}
                onClick={() => onChannelSelect(channel)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Private Channels */}
      {privateChannels.length > 0 && (
        <div>
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-sidebar-text-muted">
            <Lock className="w-3 h-3" />
            <span>Private</span>
          </div>
          <div className="mt-1 space-y-0.5">
            {privateChannels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                isActive={channel.id === activeChannelId}
                onClick={() => onChannelSelect(channel)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ChannelItemProps {
  channel: Channel;
  isActive: boolean;
  onClick: () => void;
}

function ChannelItem({ channel, isActive, onClick }: ChannelItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'channel-item w-full text-left group',
        isActive && 'channel-item-active'
      )}
    >
      {channel.isPrivate ? (
        <Lock className="w-4 h-4 shrink-0" />
      ) : (
        <Hash className="w-4 h-4 shrink-0" />
      )}
      <span className="flex-1 truncate">{channel.name}</span>
      {channel.unreadCount && channel.unreadCount > 0 && !isActive && (
        <span className="unread-badge">{channel.unreadCount}</span>
      )}
    </button>
  );
}
