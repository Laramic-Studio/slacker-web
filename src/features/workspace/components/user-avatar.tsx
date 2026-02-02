import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusIndicator } from './StatusIndicator';
import { cn } from '@/lib/utils';
import type { User } from '@/data/mockData';

interface UserAvatarProps {
  user: User;
  showStatus?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
};

const statusPositionClasses = {
  sm: '-bottom-0.5 -right-0.5',
  md: '-bottom-0.5 -right-0.5',
  lg: 'bottom-0 right-0',
};

export function UserAvatar({ user, showStatus = false, size = 'md', className }: UserAvatarProps) {
  const initials = user.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className={cn('relative inline-flex', className)}>
      <Avatar className={cn(sizeClasses[size])}>
        <AvatarImage src={user.avatar} alt={user.displayName} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showStatus && (
        <StatusIndicator
          status={user.status}
          size={size === 'lg' ? 'md' : 'sm'}
          className={cn('absolute', statusPositionClasses[size])}
        />
      )}
    </div>
  );
}
