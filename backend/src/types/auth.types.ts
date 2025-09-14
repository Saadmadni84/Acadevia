// src/types/auth.types.ts
import { Request } from 'express';

export interface JwtPayload {
  userId: string;
  email: string;
  role?: string; // Add more fields as needed
}

// Example: Typing a user object stored in request on login
export interface AuthRequest extends Request {
  user?: JwtPayload;
}
