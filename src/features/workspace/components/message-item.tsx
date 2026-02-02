/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { MoreHorizontal, Smile, MessageSquare, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUserById, type Message } from '@/data/mockData';
import { format, isToday, isYesterday } from 'date-fns';
import { UserAvatar } from './user-avatar';

interface MessageItemProps {
  message: Message;
  isGrouped?: boolean;
}

function formatMessageTime(date: Date): string {
  if (isToday(date)) {
    return format(date, 'h:mm a');
  } else if (isYesterday(date)) {
    return 'Yesterday at ' + format(date, 'h:mm a');
  }
  return format(date, 'MMM d, h:mm a');
}

export function MessageItem({ message, isGrouped = false }: MessageItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const user = getUserById(message.userId);

  if (!user) return null;

  const formattedContent = message.content.split('```').map((part: string, index: number) => {
    if (index % 2 === 1) {
      return (
        <pre key={index} className="bg-muted rounded-md p-3 my-2 overflow-x-auto text-sm font-mono">
          <code>{part}</code>
        </pre>
      );
    }
    // Handle mentions
    return part.split(/(@\w+\.?\w*)/g).map((segment, i) => {
      if (segment.startsWith('@')) {
        return (
          <span key={i} className="mention-highlight">
            {segment}
          </span>
        );
      }
      return segment;
    });
  });

  return (
    <div
      className={cn(
        'group relative px-4 py-1 message-hover',
        !isGrouped && 'pt-3'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Action Bar */}
      {isHovered && (
        <div className="absolute -top-3 right-4 flex items-center gap-0.5 bg-background border border-border rounded-md shadow-message p-0.5 animate-fade-in">
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <Smile className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <Bookmark className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      <div className="flex gap-3">
        {/* Avatar or spacer */}
        <div className="w-10 shrink-0">
          {!isGrouped && <UserAvatar user={user} size="lg" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {!isGrouped && (
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="font-semibold text-foreground hover:underline cursor-pointer">
                {user.displayName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatMessageTime(message.timestamp)}
              </span>
              {message.isEdited && (
                <span className="text-xs text-muted-foreground">(edited)</span>
              )}
            </div>
          )}

          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {formattedContent}
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5">
              {message.reactions.map((reaction: any, index: number) => (
                <button
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80 border border-border text-sm transition-colors"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-muted-foreground">{reaction.count}</span>
                </button>
              ))}
              <button className="p-1 rounded-full hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
                <Smile className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          )}

          {/* Thread indicator */}
          {message.threadCount && message.threadCount > 0 && (
            <button className="flex items-center gap-1.5 mt-1.5 text-primary hover:underline text-sm font-medium">
              <MessageSquare className="w-4 h-4" />
              <span>{message.threadCount} replies</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
