import { ChannelInfo } from './types';
import { logger } from './utils/logger';

/**
 * In-memory storage for user-channel mappings
 * In a production environment, this should be replaced with a database
 */
class Storage {
  private userChannelMap: Map<number, ChannelInfo> = new Map();

  /**
   * Set channel information for a user
   */
  setChannel(userId: number, channelInfo: ChannelInfo): void {
    this.userChannelMap.set(userId, channelInfo);
    logger.info(`Channel set for user ${userId}: ${channelInfo.channelId}`);
  }

  /**
   * Get channel information for a user
   */
  getChannel(userId: number): ChannelInfo | undefined {
    return this.userChannelMap.get(userId);
  }

  /**
   * Check if user has a channel set
   */
  hasChannel(userId: number): boolean {
    return this.userChannelMap.has(userId);
  }

  /**
   * Remove channel for a user
   */
  removeChannel(userId: number): boolean {
    logger.info(`Removing channel for user ${userId}`);
    return this.userChannelMap.delete(userId);
  }

  /**
   * Get all user-channel mappings
   */
  getAllMappings(): Map<number, ChannelInfo> {
    return new Map(this.userChannelMap);
  }
}

// Export a singleton instance
export const storage = new Storage();