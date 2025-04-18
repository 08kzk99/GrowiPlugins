/**
 * Simple logger utility for the image size plugin
 */
export const logger = {
  debug: (message: string, ...args: any[]): void => {
    if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
      console.debug(`[Growi Image Size Plugin] ${message}`, ...args);
    }
  },
  
  info: (message: string, ...args: any[]): void => {
    console.info(`[Growi Image Size Plugin] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]): void => {
    console.warn(`[Growi Image Size Plugin] ${message}`, ...args);
  },
  
  error: (message: string, ...args: any[]): void => {
    console.error(`[Growi Image Size Plugin] ${message}`, ...args);
  }
};
