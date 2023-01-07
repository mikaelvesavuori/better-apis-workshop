export interface LogMessageInterface {
    readonly message: Message;
    readonly level?: LogLevels;
}
export interface LoggerInterface {
    readonly userId: string;
    readonly correlationId: string;
}
export type LogLevels = 'ERROR' | 'WARN' | 'INFO';
export type Message = string | Record<string, unknown>;
