import { ApplicationErrorCode } from './application-error-code';

export class ApplicationError extends Error {
    constructor(readonly errorCode: ApplicationErrorCode) {
        super();
    }
}
