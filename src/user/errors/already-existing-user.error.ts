import { AppError } from '../../infrastructure/error-handling/app-error/app-error';
import { AppErrorCode } from '../../infrastructure/error-handling/app-error/app-error-code';

export class AlreadyExistingUserError extends AppError {
    constructor(username: string) {
        super(AppErrorCode.AlreadyExistingUser);
        this.message = this.formatMessage(username);
    }

    private formatMessage(username: string): string {
        return `User with username "${username}" already exists.`;
    }
}
