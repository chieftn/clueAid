export type ErrorType = 'integrityCheck' | 'playerNodeNotFound';

export const throwError = (errorType: ErrorType): void => {
    throw new Error(errorType);
}
