import { Hash, Lock, Star, Users, Search, Phone, Video, Settings, ChevronDown } from 'lucide-react';
import type { Channel } from '@/data/mockData';

interface ChatHeaderProps {
  channel: Channel;
}

export function ChatHeader({ channel }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Left section */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center gap-1.5">
          {channel.isPrivate ? (
            <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <Hash className="w-5 h-5 text-muted-foreground shrink-0" />
          )}
          <h1 className="font-semibold text-foreground truncate">{channel.name}</h1>
        </div>
        <button className="p-1 rounded hover:bg-muted transition-colors">
          <Star className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="hidden md:block w-px h-4 bg-border" />
        <button className="hidden md:flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <span className="truncate max-w-50">{channel.description}</span>
          <ChevronDown className="w-3 h-3 shrink-0" />
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded hover:bg-muted transition-colors" title="Huddle">
          <Phone className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="p-2 rounded hover:bg-muted transition-colors" title="Video call">
          <Video className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="hidden sm:flex items-center gap-1">
          <button className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-muted transition-colors" title="Members">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">5</span>
          </button>
        </div>
        <div className="w-px h-4 bg-border mx-1" />
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="w-32 lg:w-40 pl-8 pr-3 py-1.5 rounded-md bg-muted border-none text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button className="p-2 rounded hover:bg-muted transition-colors" title="Channel settings">
          <Settings className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
