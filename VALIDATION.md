# Form Validation & Anti-Spam Documentation

## Overview

All contact forms on the IzaXotic website now have comprehensive regex-based validation patterns and anti-spam detection to prevent malicious, spam, and dump data from being submitted.

## Forms Protected

### 1. Contact Form (`src/components/sections/ContactSection.tsx`)
- **Location**: Homepage contact section
- **Fields**: Name, Email, Subject, Message
- **Endpoint**: `/api/contact` (POST)

### 2. Careers Application Form (`src/app/careers/CareersClient.tsx`)
- **Location**: /careers page
- **Fields**: Name, Email, Role (dropdown), Subject, Message, Resume (file upload)
- **Endpoint**: Direct form submission with client-side validation

## Validation Rules

### Name Field
```regex
^[a-zA-Z\s'-]+$
```
- **Rules**:
  - Minimum: 2 characters
  - Maximum: 100 characters
  - Allowed characters: Letters, spaces, hyphens, apostrophes
  - Must start with a letter (no numbers/symbols first)
- **Examples** ✅:
  - John Smith
  - Mary O'Connor
  - Jean-Pierre

- **Rejected** ❌:
  - 123JohnDoe (starts with number)
  - John@Smith (invalid character)
  - J. (too short)

### Email Field
```regex
^[^\s@]+@[^\s@]+\.[^\s@]+$
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```
- **Rules**:
  - Standard email format validation
  - Maximum: 254 characters
  - Must have valid domain with TLD
- **Rejected** ❌:
  - invalid@domain (no TLD)
  - @domain.com (missing local part)
  - user@.com (missing domain)

### Subject Field
```regex
^[a-zA-Z0-9\s&.,'-]+$
```
- **Rules**:
  - Minimum: 3 characters
  - Maximum: 200 characters
  - Allowed characters: Letters, numbers, spaces, &, period, comma, apostrophe, hyphen
  - Cannot be only spaces
- **Examples** ✅:
  - Web Development Project
  - API Design & Architecture
  - 3D Animation Inquiry

- **Rejected** ❌:
  - "Viagra" (spam keyword)
  - "<script>alert('xss')</script>" (XSS attempt)
  - "   " (only spaces)

### Message Field
```regex
^[a-zA-Z0-9\s.,!?@()\-:;'"&\n\r]+$
```
- **Rules**:
  - Minimum: 10 characters
  - Maximum: 5000 characters
  - Must contain at least 5 actual letters
  - Cannot be only spaces
  - Allowed characters: Letters, numbers, common punctuation, newlines
- **Quality Checks**:
  - Rejects gibberish or repetitive text
  - Rejects multiple URLs
  - Rejects excessive capitalization
- **Examples** ✅:
  - "I'm interested in building a web app"
  - "Looking for a React developer for my startup"
  - "Need help with Three.js implementation"

- **Rejected** ❌:
  - "viagra" (spam keyword)
  - "aaaaaaa" (character repetition)
  - "HEYEYEYEY!!!!!!!" (repetition + caps)

### Resume Field (Careers only)
- **Rules**:
  - File required
  - Maximum size: 5MB
  - Accepted formats: PDF, .doc, .docx
  - Must be valid document file

## Anti-Spam Detection

All forms are protected by the `detectSpam()` function in `src/lib/validation.ts` which checks for:

### 1. **Product Spam Keywords**
```
viagra, cialis, casino, lottery, prize, winner, jackpot, poker, blackjack
```

### 2. **Monetary Spam**
```
click here, buy now, free money, money fast, make money, work from home, earn cash
```

### 3. **URL Spam**
- Multiple URLs (max 2 allowed)
- Suspicious domains (.ru, .cn, .tk, etc.) in message context

### 4. **Character-Level Spam**
- More than 10 consecutive capital letters: `AAAAAAAAAA`
- Character repetition: `aaaaaaa` (more than 4 repetitions)
- Token-like spam: `GJJDHSKDHSJKD` (20+ random alphanumerics)

### 5. **XSS/Injection Attempts**
```
<script>, <iframe>, javascript:, onclick, onerror, <img>, <svg>, UNION SELECT, DROP TABLE, INSERT INTO, exec()
```

### 6. **Phone Number Spam Patterns**
```
+1-888-123-4567 (common spam phone format)
```

## Server-Side Validation (`src/app/api/contact/route.ts`)

The backend provides **defense-in-depth** validation:

1. **Zod Schema Validation** - Enforces all regex patterns
2. **Spam Detection** - Runs `validateContactSubmission()` 
3. **Email Verification** - Double-checks email format and domain
4. **Content Quality** - Ensures meaningful message content

### API Response Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | Email sent |
| 400 | Bad Data | Invalid email format |
| 403 | Spam Detected | Contains viagra keyword |
| 500 | Server Error | SMTP not configured |

## Usage in Components

### Contact Section
```tsx
import { z } from "zod";

const schema = z.object({
  name: z.string()
    .min(2)
    .regex(/^[a-zA-Z\s'-]+$/),
  email: z.string()
    .email()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  // ... more fields
});
```

### Careers Form
```tsx
import { validateContactSubmission } from "@/lib/validation";

// Additional checks in client code
const error = validateContactSubmission(name, email, subject, message);
if (error) {
  // Show error to user
}
```

## Testing Spam Detection

### Test Cases That Should FAIL (Return Error)

```
❌ Name: "123Name" - starts with number
❌ Email: "invalid@domain" - no TLD
❌ Subject: "VIAGRA PILLS FOR SALE" - spam keyword
❌ Message: "click here to buy now" - spam keyword
❌ Message: "<script>alert('xss')</script>" - XSS attempt
❌ Message: "AAAAAAAAAAAAAAAAAAAAAA" - excessive caps
❌ Message: "Check out http://spam1.ru and http://spam2.cn" - multiple URLs
```

### Test Cases That Should PASS

```
✅ Name: "John Smith"
✅ Email: "john@company.com"
✅ Subject: "Web Development Project"
✅ Message: "I'm interested in your services. Can we discuss project details?"
✅ Message with URL: "I have a prototype at https://example.com"
```

## Security Features

1. **XSS Prevention** - HTML/script tags rejected
2. **SQL Injection Prevention** - Common SQL keywords rejected
3. **URL Hijacking Prevention** - Multiple URLs flagged as spam
4. **Rate Limiting Ready** - Structure supports adding rate limiting
5. **Email Spoofing Prevention** - Strict email validation
6. **Bot Detection** - Spam pattern matching catches automated submissions

## Frontend Error Messages

Users see clear, friendly error messages:

```
❌ "Name can only contain letters, spaces, hyphens, and apostrophes"
❌ "Please enter a valid email"
❌ "Subject contains invalid characters"
❌ "Message must contain at least 5 letters"
❌ "Your submission contains suspicious content. Please review and try again."
```

## Environment Variables Required

For the contact API to work:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=hello@izaxotic.com
```

## Future Enhancements

1. **Rate Limiting** - Limit submissions per IP/email
2. **CAPTCHA Integration** - Add reCAPTCHA v3 for bot detection
3. **Email Verification** - Send verification link before storing
4. **Spam Database** - Check against known spam IPs/emails
5. **ML-based Detection** - Train model on spam patterns
6. **Geographic Blocking** - Block high-spam regions if needed

## Troubleshooting

### "Validation failed" on submit
- Check browser console for specific error
- Ensure all fields meet regex requirements
- Check that message has enough content (min 10 chars, 5 letters)

### Email not received
- Verify SMTP_* environment variables are set
- Check email provider's security settings
- Verify CONTACT_EMAIL is configured
- Check spam folder in your email

### Legitimate submissions rejected
- Review error message for specific issue
- Avoid special characters beyond allowed set
- Don't include multiple URLs
- Keep capitalization normal

## Files Modified

1. `src/components/sections/ContactSection.tsx` - Enhanced Zod schema
2. `src/app/careers/CareersClient.tsx` - Enhanced Zod schema
3. `src/app/api/contact/route.ts` - Server-side validation + spam detection
4. `src/lib/validation.ts` - NEW: Shared validation utilities

## Deployment

No additional dependencies required. All validation uses:
- Built-in `zod` (already installed)
- Built-in JavaScript regex and string methods
- No external spam/virus libraries needed

Build and deploy normally:
```bash
npm run build
# Deploy to Hostinger
```
