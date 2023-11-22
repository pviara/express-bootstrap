import { HttpStatusCode } from './http-status-code';

export class HttpError extends Error {
    constructor(
        readonly httpStatusCode: HttpStatusCode,
        readonly message: string,
    ) {
        super();
    }
}
