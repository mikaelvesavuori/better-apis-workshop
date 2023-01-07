export declare function setUserMetadata(correlationId: string | 'UNKNOWN', userId: string | 'UNKNOWN'): void;
export declare function getUserMetadata(): {
    correlationId: string;
    userId: string;
};
