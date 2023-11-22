import { AppError } from './app-error/app-error';
import { AppErrorCode } from './app-error/app-error-code';
import { HttpError } from './http-error/http-error';
import { HttpStatusCode } from './http-error/http-status-code';

type ErrorCorrelation = Record<AppErrorCode, HttpStatusCode>;

export class ErrorHandlerService {
    private correlationTable: ErrorCorrelation = {
        AlreadyExistingUser: HttpStatusCode.Conflict,
    };

    handleError(error: Error): HttpError {
        if (error instanceof HttpError) {
            return error;
        }

        if (error instanceof AppError) {
            const httpStatusCode = this.getHttpStatusCodeFrom(error);
            return new HttpError(httpStatusCode, error.message);
        }

        return new HttpError(HttpStatusCode.InternalServerError, error.message);
    }

    private getHttpStatusCodeFrom(applicationError: AppError): HttpStatusCode {
        return this.correlationTable[applicationError.errorCode];
    }
}
