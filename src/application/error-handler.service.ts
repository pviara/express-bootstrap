import { ApplicationError } from './application-error';
import { ApplicationErrorCode } from './application-error-code';
import { HttpStatusCode } from './http-status-code';

type ErrorCorrelation = Record<ApplicationErrorCode, HttpStatusCode>;

export class ErrorHandlerService {
    private correlationTable: ErrorCorrelation = {
        AlreadyExistingUser: HttpStatusCode.Conflict,
    };

    getHttpStatusCodeFrom(applicationError: ApplicationError): HttpStatusCode {
        const correlation = this.correlationTable[applicationError.errorCode];
        if (!correlation) {
            throw new Error();
        }

        return correlation;
    }
}
