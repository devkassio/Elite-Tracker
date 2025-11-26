/**
 * Elite Tracker API - Validation Error Builder
 * 
 * Copyright (c) 2025 Kássio Barros (@devkassio)
 * Licensed under MIT License
 * 
 * @author Kássio Barros
 * @repository https://github.com/devkassio/Elite-Tracker
 */

import type { ZodIssue } from 'zod';

/**
 * Builds a validation error message from Zod issues.
 *
 * @param issues - An array of ZodIssue objects representing validation errors.
 * @returns An array of formatted error messages.
 */
export function buildValidationErrorMessage(issues: ZodIssue[]): string[] {
  return issues.map((i) => `${i.path.join('.')}: ${i.message}`);
}
