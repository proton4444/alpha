/**
 * Logger utility for consistent logging across the application
 * Provides centralized control over logging levels and formatting
 */

class Logger {
  private isDevelopment = import.meta.env.DEV

  /**
   * Log debug information (development only)
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }

  /**
   * Log informational messages
   */
  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(`[INFO] ${message}`, ...args)
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args)
  }

  /**
   * Log error messages
   */
  error(message: string, error?: unknown, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, error, ...args)
  }

  /**
   * Log errors from async operations with context
   */
  asyncError(operation: string, error: unknown): void {
    if (error instanceof Error) {
      this.error(`Failed to ${operation}`, error.message)
    } else {
      this.error(`Failed to ${operation}`, error)
    }
  }
}

// Export singleton instance
export const logger = new Logger()
