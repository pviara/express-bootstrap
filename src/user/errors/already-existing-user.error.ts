import { ApplicationError } from '../../application/application-error';
import { ApplicationErrorCode } from '../../application/application-error-code';

export class AlreadyExistingUserError extends ApplicationError {
    constructor(username: string) {
        super(ApplicationErrorCode.AlreadyExistingUser);
        this.message = this.formatMessage(username);
    }

    private formatMessage(username: string): string {
        return `User with username "${username}" already exists.`;
    }
}
