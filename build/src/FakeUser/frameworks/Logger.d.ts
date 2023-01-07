import { LoggerInterface, Message } from '../contracts/LoggerInterface';
export declare class Logger implements LoggerInterface {
    readonly userId: string;
    readonly correlationId: string;
    constructor();
    log(message: Message): void;
    warn(message: Message): void;
    error(message: Message): void;
    private createLog;
}
