import { AppErrorCode } from './app-error-code';

export class AppError extends Error {
    constructor(readonly errorCode: AppErrorCode) {
        super();
    }
}
