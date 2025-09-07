// frontend/src/types/socket.ts

export interface ServerToClientEvents {
  // Connection events
  connect: () => void;
  disconnect: (reason: string) => void;
  connect_error: (error: Error) => void;

  // User events
  userJoined: (data: { userId: string; username: string }) => void;
  userLeft: (data: { userId: string; username: string }) => void;
  userTyping: (data: { userId: string; username: string; isTyping: boolean }) => void;

  // Message events
  message: (message: Message) => void;
  messageDeleted: (messageId: string) => void;
  messageUpdated: (data: { messageId: string; content: string; editedAt: Date }) => void;

  // Room/Channel events
  joinedRoom: (room: Room) => void;
  leftRoom: (roomId: string) => void;
  roomUpdated: (room: Room) => void;
  
  // Real-time notifications
  notification: (notification: Notification) => void;
  
  // Error events
  error: (error: SocketError) => void;
}

export interface ClientToServerEvents {
  // Authentication
  authenticate: (token: string) => void;
  
  // Room events
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  createRoom: (data: CreateRoomData) => void;
  
  // Message events
  sendMessage: (data: SendMessageData) => void;
  deleteMessage: (messageId: string) => void;
  editMessage: (data: EditMessageData) => void;
  typing: (data: TypingData) => void;
  
  // User status
  updateStatus: (status: UserStatus) => void;
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  username: string;
  roomId: string;
  timestamp: Date;
  edited?: boolean;
  editedAt?: Date;
  attachments?: Attachment[];
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  type: 'public' | 'private' | 'direct';
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  type: 'message' | 'mention' | 'system';
  title: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface SocketError {
  code: string;
  message: string;
  details?: any;
}

export interface CreateRoomData {
  name: string;
  description?: string;
  type: 'public' | 'private';
  members?: string[];
}

export interface SendMessageData {
  roomId: string;
  content: string;
  attachments?: File[];
}

export interface EditMessageData {
  messageId: string;
  content: string;
}

export interface TypingData {
  roomId: string;
  isTyping: boolean;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
}

export type UserStatus = 'online' | 'away' | 'busy' | 'offline';

export interface SocketUser {
  id: string;
  username: string;
  status: UserStatus;
  avatar?: string;
}