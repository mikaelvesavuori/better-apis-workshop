import { LoggerInterface, LogMessageInterface, Message } from '../contracts/LoggerInterface';

import { getUserMetadata } from '../frameworks/userMetadata';

/**
 * @description Logger is just a very basic logging utility
 */
export class Logger implements LoggerInterface {
  readonly userId: string;
  readonly correlationId: string;

  constructor() {
    const { userId, correlationId } = getUserMetadata();
    this.userId = userId;
    this.correlationId = correlationId;
  }

  public log(message: Message) {
    const createdLog = this.createLog({ message, level: 'INFO' });
    console.log(createdLog);
  }

  public warn(message: Message) {
    const createdLog = this.createLog({ message, level: 'WARN' });
    console.warn(createdLog);
  }

  public error(message: Message) {
    const createdLog = this.createLog({ message, level: 'ERROR' });
    console.error(createdLog);
  }

  private createLog(log: LogMessageInterface) {
    return {
      message: log.message,
      level: log.level,
      timestamp: `${Date.now()}`,
      userId: this.userId,
      correlationId: this.correlationId
    };
  }
}
