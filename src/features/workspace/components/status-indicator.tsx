import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: 'online' | 'away' | 'busy' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
};

const statusClasses = {
  online: 'status-online',
  away: 'status-away',
  busy: 'status-busy',
  offline: 'status-offline',
};

export function StatusIndicator({ status, size = 'md', className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        'rounded-full ring-2 ring-background',
        sizeClasses[size],
        statusClasses[status],
        className
      )}
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
}
