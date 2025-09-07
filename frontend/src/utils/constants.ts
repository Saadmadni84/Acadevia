// frontend/src/utils/constants.ts

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

// Authentication
export const TOKEN_KEY = 'acadeviaToken';
export const REFRESH_TOKEN_KEY = 'acadeviaRefreshToken';
export const AUTH_HEADER = 'Authorization';
export const TOKEN_PREFIX = 'Bearer';

// Socket Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  
  // Authentication
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  UNAUTHORIZED: 'unauthorized',
  
  // User Events
  USER_JOINED: 'userJoined',
  USER_LEFT: 'userLeft',
  USER_TYPING: 'userTyping',
  UPDATE_STATUS: 'updateStatus',
  
  // Message Events
  MESSAGE: 'message',
  SEND_MESSAGE: 'sendMessage',
  DELETE_MESSAGE: 'deleteMessage',
  EDIT_MESSAGE: 'editMessage',
  MESSAGE_DELETED: 'messageDeleted',
  MESSAGE_UPDATED: 'messageUpdated',
  
  // Room Events
  JOIN_ROOM: 'joinRoom',
  LEAVE_ROOM: 'leaveRoom',
  CREATE_ROOM: 'createRoom',
  JOINED_ROOM: 'joinedRoom',
  LEFT_ROOM: 'leftRoom',
  ROOM_UPDATED: 'roomUpdated',
  
  // Notification Events
  NOTIFICATION: 'notification',
  
  // Error Events
  ERROR: 'error'
} as const;

// UI Constants
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
} as const;

export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  WIDE: 1440
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZES = [10, 20, 50, 100] as const;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENT: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  VIDEO: ['video/mp4', 'video/webm'],
  AUDIO: ['audio/mpeg', 'audio/wav', 'audio/ogg']
} as const;

// Message Constants
export const MESSAGE_MAX_LENGTH = 5000;
export const TYPING_INDICATOR_DURATION = 3000; // 3 seconds

// User Status
export const USER_STATUS = {
  ONLINE: 'online',
  AWAY: 'away',
  BUSY: 'busy',
  OFFLINE: 'offline'
} as const;

// Room Types
export const ROOM_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  DIRECT: 'direct'
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  MESSAGE: 'message',
  MENTION: 'mention',
  SYSTEM: 'system',
  ALERT: 'alert'
} as const;

// Error Codes
export const ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RATE_LIMIT: 'RATE_LIMIT',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN'
} as const;

// Time Constants
export const TIME_FORMATS = {
  MESSAGE: 'HH:mm',
  DATE: 'DD/MM/YYYY',
  FULL: 'DD/MM/YYYY HH:mm',
  RELATIVE: 'relative'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'acadeviaTheme',
  LANGUAGE: 'acadeviaLanguage',
  SIDEBAR_COLLAPSED: 'academiasSidebarCollapsed',
  NOTIFICATION_SETTINGS: 'acadeviaNotifications',
  USER_PREFERENCES: 'acadeviaUserPreferences'
} as const;

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  MENTION: /@([a-zA-Z0-9_-]+)/g,
  HASHTAG: /#([a-zA-Z0-9_]+)/g
} as const;

// Default Values
export const DEFAULTS = {
  AVATAR: '/assets/default-avatar.png',
  COVER: '/assets/default-cover.jpg',
  LANGUAGE: 'en',
  TIMEZONE: 'UTC'
} as const;