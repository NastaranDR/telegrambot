/**
 * Simple logger utility
 */
class Logger {
  /**
   * Log info level message
   */
  info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
  }

  /**
   * Log error level message
   */
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
  }

  /**
   * Log warning level message
   */
  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
  }

  /**
   * Log debug level message
   */
  debug(message: string, ...args: any[]): void {
    if (process.env.DEBUG) {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args);
    }
  }
}

// Export a singleton instance
export const logger = new Logger();