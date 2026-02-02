import { useState, useRef, useEffect } from 'react';
import { getMessagesByChannel, type Channel, type Message, currentUser } from '@/data/mockData';
import { isWithinInterval, subMinutes } from 'date-fns';
import { ChatHeader } from './chat-header';
import { MessageItem } from './message-item';
import { MessageInput } from './message-input';
import { MembersSidebar } from './member-siderbar';

interface ChatAreaProps {
  channel: Channel;
}

export function ChatArea({ channel }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getMessagesByChannel(channel.id));
  }, [channel.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      userId: currentUser.id,
      channelId: channel.id,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Group messages from same user within 5 minutes
  const isGroupedMessage = (message: Message, prevMessage: Message | undefined): boolean => {
    if (!prevMessage) return false;
    if (message.userId !== prevMessage.userId) return false;
    
    const fiveMinutesAgo = subMinutes(message.timestamp, 5);
    return isWithinInterval(prevMessage.timestamp, {
      start: fiveMinutesAgo,
      end: message.timestamp,
    });
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div className="flex flex-col flex-1 min-w-0">
        <ChatHeader channel={channel} />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="py-4">
            {/* Channel intro */}
            <div className="px-4 pb-4 mb-4 border-b border-border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">#</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-1">Welcome to #{channel.name}</h2>
              <p className="text-muted-foreground">
                {channel.description || `This is the start of the #${channel.name} channel.`}
              </p>
            </div>

            {/* Messages */}
            {messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isGrouped={isGroupedMessage(message, messages[index - 1])}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <MessageInput channelName={channel.name} onSendMessage={handleSendMessage} />
      </div>

      <MembersSidebar isOpen={showMembers} onClose={() => setShowMembers(false)} />
    </div>
  );
}
