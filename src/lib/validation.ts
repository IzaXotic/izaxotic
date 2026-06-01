/**
 * Shared validation utilities for contact and careers forms
 * Prevents spam, XSS, and invalid data submission
 */

/**
 * Detects common spam patterns and malicious content
 * @param fields - Object containing form fields to check
 * @returns Error message if spam detected, null otherwise
 */
export function detectSpam(fields: Record<string, string>): string | null {
  const combinedText = Object.values(fields)
    .join(" ")
    .toLowerCase();

  // Common spam keywords and patterns
  const spamPatterns = [
    // Product spam
    /viagra|cialis|casino|lottery|prize|winner|jackpot|poker|blackjack/gi,
    // Monetary spam
    /click here|buy now|free money|money fast|make money|work from home|earn.*cash/gi,
    // URL spam (multiple URLs)
    /(?:https?:\/\/|www\.)[^\s]+/gi,
    // All caps spam (more than 10 consecutive)
    /[A-Z]{10,}/g,
    // Character repetition (more than 4)
    /(.)\1{4,}/g,
    // XSS attempts
    /<script|<iframe|javascript:|onclick|onerror|<img|<svg/gi,
    // SQL injection patterns
    /union\s+select|drop\s+table|insert\s+into|delete\s+from|exec\s*\(/gi,
    // Random token-like spam
    /\b[A-Z0-9]{20,}\b/g,
    // Phone number spam patterns
    /\+1-?888-?\d{3}-?\d{4}|\b\d{3}-\d{3}-\d{4}\b/g,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(combinedText)) {
      return "Your submission contains suspicious content. Please review and try again.";
    }
  }

  return null;
}

/**
 * Validates email format strictly
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidDomain = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );

  return emailRegex.test(email) && hasValidDomain;
}

/**
 * Sanitizes text input by removing potentially harmful characters
 * while preserving legitimate content
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim();
}

/**
 * Checks if text contains a reasonable amount of actual words
 * Helps detect gibberish or spam
 */
export function hasMinimumWordContent(text: string, minWords: number = 3): boolean {
  const words = text
    .split(/\s+/)
    .filter((w) => w.length > 0 && /[a-zA-Z]/.test(w));
  return words.length >= minWords;
}

/**
 * Validates name format
 */
export function isValidName(name: string): boolean {
  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(name) && /^[a-zA-Z]/.test(name);
}

/**
 * Checks URL count in text (should be minimal in contact forms)
 */
export function countURLs(text: string): number {
  const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
  return (text.match(urlPattern) || []).length;
}

/**
 * Validates message content quality
 * Returns error message if validation fails, null otherwise
 */
export function validateMessageQuality(
  message: string,
  minLetters: number = 5
): string | null {
  // Check for actual letters (not just numbers/symbols)
  const letterCount = (message.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < minLetters) {
    return `Message must contain at least ${minLetters} letters.`;
  }

  // Check for excessive URLs (max 2 is reasonable)
  const urlCount = countURLs(message);
  if (urlCount > 2) {
    return "Message contains too many URLs.";
  }

  // Check for excessive capitalization
  const capRatio = (message.match(/[A-Z]/g) || []).length / message.length;
  if (capRatio > 0.5) {
    return "Message has excessive capitalization.";
  }

  return null;
}

/**
 * Comprehensive validation for contact form submissions
 */
export function validateContactSubmission(
  name: string,
  email: string,
  subject: string,
  message: string
): string | null {
  // Check individual fields
  if (!isValidName(name)) {
    return "Invalid name format.";
  }

  if (!isValidEmail(email)) {
    return "Invalid email format.";
  }

  // Check for spam
  const spamCheck = detectSpam({ name, email, subject, message });
  if (spamCheck) return spamCheck;

  // Check message quality
  const messageQuality = validateMessageQuality(message, 5);
  if (messageQuality) return messageQuality;

  return null;
}
