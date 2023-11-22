import { ApplicationError } from './application-error';
import { ApplicationErrorCode } from './application-error-code';
import { HttpError } from './http-error';
import { HttpStatusCode } from './http-status-code';

type ErrorCorrelation = Record<ApplicationErrorCode, HttpStatusCode>;

export class ErrorHandlerService {
    private correlationTable: ErrorCorrelation = {
        AlreadyExistingUser: HttpStatusCode.Conflict,
    };

    handleError(error: Error): HttpError {
        if (error instanceof HttpError) {
            return error;
        }

        if (error instanceof ApplicationError) {
            const httpStatusCode = this.getHttpStatusCodeFrom(error);
            return new HttpError(httpStatusCode, error.message);
        }

        return new HttpError(HttpStatusCode.InternalServerError, error.message);
    }

    private getHttpStatusCodeFrom(
        applicationError: ApplicationError,
    ): HttpStatusCode {
        return this.correlationTable[applicationError.errorCode];
    }
}
