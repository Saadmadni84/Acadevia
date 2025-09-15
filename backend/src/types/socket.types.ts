// src/types/socket.types.ts

// Events sent from server to client
export interface ServerToClientEvents {
  chatMessage: (message: string, fromUserId: string) => void;
  notification: (type: string, payload: any) => void;
  // Add more server-to-client events as needed
}

// Events sent from client to server
export interface ClientToServerEvents {
  sendMessage: (roomId: string, message: string) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  // Add more client-to-server events as needed
}

// Optional: Events sent between servers (if using clustering)
export interface InterServerEvents {
  sync: (data: any) => void;
  // Add more inter-server events as needed
}

// Additional data attached to each socket
export interface SocketData {
  userId?: string;
  username?: string;
  // Add more custom data as needed
}

