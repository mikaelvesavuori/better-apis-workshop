/**
 * @description Set some of the user metadata in process environment for portability.
 */
export function setUserMetadata(correlationId: string | 'UNKNOWN', userId: string | 'UNKNOWN') {
  process.env.CORRELATION_ID = correlationId;
  process.env.USER_ID = userId;
}

/**
 * @description Get user metadata from process environment.
 */
export function getUserMetadata() {
  return {
    correlationId: process.env.CORRELATION_ID || 'UNKNOWN',
    userId: process.env.USER_ID || 'UNKNOWN'
  };
}
