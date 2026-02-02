import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Link2, 
  List, 
  Code, 
  AtSign, 
  Smile, 
  Paperclip, 
  Send,
  Mic
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  channelName: string;
  onSendMessage: (content: string) => void;
}

export function MessageInput({ channelName, onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-4 pb-4">
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            'border rounded-lg bg-background transition-all duration-200',
            isFocused ? 'border-primary shadow-sm' : 'border-border'
          )}
        >
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border">
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Link"
            >
              <Link2 className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Bulleted list"
            >
              <List className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded hover:bg-muted transition-colors"
              title="Code"
            >
              <Code className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Input Area */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={`Message #${channelName}`}
            rows={1}
            className="w-full px-3 py-2.5 bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground min-h-[44px] max-h-[200px]"
            style={{ height: 'auto' }}
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between px-2 py-1.5 border-t border-border">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Emoji"
              >
                <Smile className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Mention someone"
              >
                <AtSign className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Record audio"
              >
                <Mic className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!message.trim()}
              className={cn(
                'p-2 rounded-md transition-colors',
                message.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-1.5 px-1">
        <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">Enter</kbd> to send,{' '}
        <kbd className="px-1 py-0.5 rounded bg-muted text-[10px] font-mono">Shift + Enter</kbd> for new line
      </p>
    </div>
  );
}
