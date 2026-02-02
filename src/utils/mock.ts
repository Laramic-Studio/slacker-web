// Mock data for the Slack-like chat application

export type WorkspaceRole = 'owner' | 'admin' | 'member' | 'guest';
export type WorkspaceVisibility = 'public' | 'private' | 'invite-only';

export interface User {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  role: string;
  email: string;
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  workspaceRole: WorkspaceRole;
  joinedAt: Date;
  invitedBy?: string;
}

export interface WorkspaceSettings {
  id: string;
  name: string;
  icon: string;
  description: string;
  visibility: WorkspaceVisibility;
  allowGuestAccess: boolean;
  defaultChannelId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  channelId: string;
  timestamp: Date;
  reactions?: { emoji: string; count: number; users: string[] }[];
  threadCount?: number;
  isEdited?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  projectId: string;
  unreadCount?: number;
  lastMessage?: string;
}

export interface DirectMessage {
  id: string;
  participants: string[];
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: Date;
}

export interface Project {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// Users
export const users: User[] = [
  {
    id: 'user-1',
    name: 'alex.morgan',
    displayName: 'Alex Morgan',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    status: 'online',
    role: 'Project Lead',
    email: 'alex@company.com',
  },
  {
    id: 'user-2',
    name: 'sarah.chen',
    displayName: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    status: 'online',
    role: 'Senior Developer',
    email: 'sarah@company.com',
  },
  {
    id: 'user-3',
    name: 'marcus.johnson',
    displayName: 'Marcus Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    status: 'away',
    role: 'UX Designer',
    email: 'marcus@company.com',
  },
  {
    id: 'user-4',
    name: 'emily.taylor',
    displayName: 'Emily Taylor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    status: 'busy',
    role: 'Product Manager',
    email: 'emily@company.com',
  },
  {
    id: 'user-5',
    name: 'david.kim',
    displayName: 'David Kim',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    status: 'offline',
    role: 'Backend Developer',
    email: 'david@company.com',
  },
  {
    id: 'user-6',
    name: 'jessica.miller',
    displayName: 'Jessica Miller',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    status: 'online',
    role: 'Client Partner',
    email: 'jessica@client.com',
  },
];

export const currentUser = users[0];

// Workspace Settings
export const workspaceSettings: WorkspaceSettings = {
  id: 'ws-1',
  name: 'Acme Corporation',
  icon: '🏢',
  description: 'Main workspace for Acme Corporation team collaboration and project management.',
  visibility: 'private',
  allowGuestAccess: true,
  defaultChannelId: 'ch-1',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-12-01'),
};

// Workspace Members
export const workspaceMembers: WorkspaceMember[] = [
  {
    id: 'wm-1',
    userId: 'user-1',
    workspaceId: 'ws-1',
    workspaceRole: 'owner',
    joinedAt: new Date('2024-01-15'),
  },
  {
    id: 'wm-2',
    userId: 'user-2',
    workspaceId: 'ws-1',
    workspaceRole: 'admin',
    joinedAt: new Date('2024-01-20'),
    invitedBy: 'user-1',
  },
  {
    id: 'wm-3',
    userId: 'user-3',
    workspaceId: 'ws-1',
    workspaceRole: 'member',
    joinedAt: new Date('2024-02-01'),
    invitedBy: 'user-1',
  },
  {
    id: 'wm-4',
    userId: 'user-4',
    workspaceId: 'ws-1',
    workspaceRole: 'admin',
    joinedAt: new Date('2024-02-15'),
    invitedBy: 'user-2',
  },
  {
    id: 'wm-5',
    userId: 'user-5',
    workspaceId: 'ws-1',
    workspaceRole: 'member',
    joinedAt: new Date('2024-03-01'),
    invitedBy: 'user-2',
  },
  {
    id: 'wm-6',
    userId: 'user-6',
    workspaceId: 'ws-1',
    workspaceRole: 'guest',
    joinedAt: new Date('2024-06-15'),
    invitedBy: 'user-4',
  },
];

// Projects
export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    icon: '🎨',
    color: '#3B82F6',
  },
  {
    id: 'proj-2',
    name: 'Mobile App',
    icon: '📱',
    color: '#10B981',
  },
  {
    id: 'proj-3',
    name: 'API Integration',
    icon: '🔌',
    color: '#F59E0B',
  },
];


// Direct Messages
export const directMessages: DirectMessage[] = [
  {
    id: 'dm-1',
    participants: ['user-1', 'user-2'],
    unreadCount: 2,
    lastMessage: 'Can you review my PR?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'dm-2',
    participants: ['user-1', 'user-4'],
    unreadCount: 0,
    lastMessage: 'Meeting at 3pm',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'dm-3',
    participants: ['user-1', 'user-6'],
    unreadCount: 1,
    lastMessage: 'Thanks for the update!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
  },
];

// Messages
export const messages: Message[] = [
  {
    id: 'msg-1',
    content: 'Good morning team! 👋 Ready to kick off the new sprint?',
    userId: 'user-4',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    reactions: [
      { emoji: '👋', count: 3, users: ['user-1', 'user-2', 'user-3'] },
      { emoji: '🚀', count: 2, users: ['user-2', 'user-5'] },
    ],
  },
  {
    id: 'msg-2',
    content: 'Absolutely! I\'ve been working on the new dashboard components. Should have them ready for review by EOD.',
    userId: 'user-2',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    threadCount: 4,
  },
  {
    id: 'msg-3',
    content: 'Perfect timing! The new mockups are in Figma. @sarah.chen can you check if the spacing matches the design system?',
    userId: 'user-3',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    reactions: [
      { emoji: '👍', count: 1, users: ['user-2'] },
    ],
  },
  {
    id: 'msg-4',
    content: 'Just pushed the latest changes to the staging environment. You can check it out here: https://staging.example.com',
    userId: 'user-5',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'msg-5',
    content: 'The new mockups look great! Client will love this direction. 🎉',
    userId: 'user-1',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    reactions: [
      { emoji: '❤️', count: 4, users: ['user-2', 'user-3', 'user-4', 'user-6'] },
    ],
  },
  {
    id: 'msg-6',
    content: 'Quick update: I\'ve scheduled a call with the client for tomorrow at 2pm. Please make sure to update the progress doc before then.',
    userId: 'user-4',
    channelId: 'ch-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    reactions: [
      { emoji: '✅', count: 2, users: ['user-1', 'user-3'] },
    ],
  },
  {
    id: 'msg-7',
    content: 'Here\'s the updated color palette based on feedback:\n\n```\nPrimary: #0EA5E9\nSecondary: #64748B\nAccent: #22C55E\n```\n\nLet me know if this works!',
    userId: 'user-3',
    channelId: 'ch-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    reactions: [
      { emoji: '🎨', count: 2, users: ['user-1', 'user-2'] },
    ],
  },
  {
    id: 'msg-8',
    content: 'Love the progress so far! The team has been incredibly responsive. Looking forward to the next milestone. 🙌',
    userId: 'user-6',
    channelId: 'ch-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    reactions: [
      { emoji: '🙏', count: 3, users: ['user-1', 'user-2', 'user-4'] },
    ],
  },
];

// Helper functions
export const getUserById = (id: string): User | undefined => 
  users.find(user => user.id === id);

export const getChannelsByProject = (projectId: string): Channel[] =>
  channels.filter(channel => channel.projectId === projectId);

export const getMessagesByChannel = (channelId: string): Message[] =>
  messages.filter(message => message.channelId === channelId);

export const getProjectById = (id: string): Project | undefined =>
  projects.find(project => project.id === id);

export const getDMParticipant = (dm: DirectMessage, currentUserId: string): User | undefined => {
  const participantId = dm.participants.find(id => id !== currentUserId);
  return participantId ? getUserById(participantId) : undefined;
};
