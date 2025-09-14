// src/utils/validators.ts

/**
 * Checks if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Checks if a string is a valid email address.
 */
export function isEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Checks if a string is a strong password (min 8 chars, at least 1 letter & 1 number).
 */
export function isStrongPassword(password: unknown): boolean {
  if (typeof password !== 'string') return false;
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

/**
 * Checks if an object has all the given fields (keys).
 */
export function hasFields<T extends object>(obj: T, fields: (keyof T)[]): boolean {
  return fields.every((key) => Object.prototype.hasOwnProperty.call(obj, key) && (obj as any)[key] != null);
}

