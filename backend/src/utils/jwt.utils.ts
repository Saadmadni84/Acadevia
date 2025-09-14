// src/utils/jwt.utils.ts

import jwt, { SignOptions } from 'jsonwebtoken';
import { JwtPayload } from '../types/auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret'; // Use env variable in real projects
const JWT_EXPIRES_IN = '1d'; // Token expiration, e.g. "1d" for 1 day

/**
 * Creates a JWT for the given payload.
 */
export function signJwt(payload: JwtPayload, options?: SignOptions): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options });
}

/**
 * Verifies and decodes a JWT, returning the payload, or null if invalid.
 */
export function verifyJwt(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

