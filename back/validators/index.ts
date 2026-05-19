// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimum and maximum string lengths
const MIN_USERNAME = 3;
const MAX_USERNAME = 50;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;
const MIN_NAME = 1;
const MAX_NAME = 100;
const MIN_DESCRIPTION = 1;
const MAX_DESCRIPTION = 1000;
const MIN_CONTENT = 1;
const MAX_CONTENT = 5000;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Generic utility to convert object keys
const convertKeys = (
  obj: Record<string, unknown>,
  converter: (key: string) => string
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[converter(key)] = value;
  }
  return result;
};

// Utility to convert camelCase to snake_case
export const camelToSnake = (
  obj: Record<string, unknown>
): Record<string, unknown> => {
  return convertKeys(obj, key =>
    key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  );
};

// Utility to convert snake_case to camelCase with generic type support
export const snakeToCamel = <T = Record<string, unknown>>(
  obj: Record<string, unknown>
): T => {
  return convertKeys(obj, key =>
    key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase())
  ) as T;
};

// User validators
export const validateUsername = (username: unknown): string => {
  if (typeof username !== 'string') {
    throw new ValidationError('Username must be a string');
  }
  if (username.trim().length === 0) {
    throw new ValidationError('Username cannot be empty');
  }
  if (username.length < MIN_USERNAME) {
    throw new ValidationError(
      `Username must be at least ${MIN_USERNAME} characters long`
    );
  }
  if (username.length > MAX_USERNAME) {
    throw new ValidationError(
      `Username must be at most ${MAX_USERNAME} characters long`
    );
  }
  return username.trim();
};

export const validateEmail = (email: unknown): string => {
  if (typeof email !== 'string') {
    throw new ValidationError('Email must be a string');
  }
  const trimmedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    throw new ValidationError('Invalid email format');
  }
  return trimmedEmail;
};

export const validatePassword = (password: unknown): string => {
  if (typeof password !== 'string') {
    throw new ValidationError('Password must be a string');
  }
  if (password.length < MIN_PASSWORD) {
    throw new ValidationError(
      `Password must be at least ${MIN_PASSWORD} characters long`
    );
  }
  if (password.length > MAX_PASSWORD) {
    throw new ValidationError(
      `Password must be at most ${MAX_PASSWORD} characters long`
    );
  }
  return password;
};

// Character validators
export const validateCharacterName = (name: unknown): string => {
  if (typeof name !== 'string') {
    throw new ValidationError('Character name must be a string');
  }
  if (name.trim().length === 0) {
    throw new ValidationError('Character name cannot be empty');
  }
  if (name.length < MIN_NAME) {
    throw new ValidationError(
      `Character name must be at least ${MIN_NAME} character long`
    );
  }
  if (name.length > MAX_NAME) {
    throw new ValidationError(
      `Character name must be at most ${MAX_NAME} characters long`
    );
  }
  return name.trim();
};

export const validateSystemPrompt = (systemPrompt: unknown): string | null => {
  if (systemPrompt === null || systemPrompt === undefined) {
    return null;
  }
  if (typeof systemPrompt !== 'string') {
    throw new ValidationError('System prompt must be a string');
  }
  if (systemPrompt.trim().length === 0) {
    return null;
  }
  return systemPrompt.trim();
};

export const validateDescription = (description: unknown): string => {
  if (typeof description !== 'string') {
    throw new ValidationError('Description must be a string');
  }
  if (description.trim().length === 0) {
    throw new ValidationError('Description cannot be empty');
  }
  if (description.length < MIN_DESCRIPTION) {
    throw new ValidationError(
      `Description must be at least ${MIN_DESCRIPTION} character long`
    );
  }
  if (description.length > MAX_DESCRIPTION) {
    throw new ValidationError(
      `Description must be at most ${MAX_DESCRIPTION} characters long`
    );
  }
  return description.trim();
};

// UUID validator (basic check)
export const validateUUID = (id: unknown): string => {
  if (typeof id !== 'string') {
    throw new ValidationError('ID must be a string');
  }
  if (id.trim().length === 0) {
    throw new ValidationError('ID cannot be empty');
  }
  // Basic UUID v4 validation
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    throw new ValidationError('Invalid UUID format');
  }
  return id;
};

// Message validators
export const validateRole = (role: unknown): 'user' | 'assistant' => {
  if (typeof role !== 'string') {
    throw new ValidationError('Role must be a string');
  }
  const validRoles = ['user', 'assistant'];
  if (!validRoles.includes(role)) {
    throw new ValidationError(`Role must be one of: ${validRoles.join(', ')}`);
  }
  return role as 'user' | 'assistant';
};

export const validateContent = (content: unknown): string => {
  if (typeof content !== 'string') {
    throw new ValidationError('Content must be a string');
  }
  if (content.trim().length === 0) {
    throw new ValidationError('Content cannot be empty');
  }
  if (content.length < MIN_CONTENT) {
    throw new ValidationError(
      `Content must be at least ${MIN_CONTENT} character long`
    );
  }
  if (content.length > MAX_CONTENT) {
    throw new ValidationError(
      `Content must be at most ${MAX_CONTENT} characters long`
    );
  }
  return content.trim();
};
