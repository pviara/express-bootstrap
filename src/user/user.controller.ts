import { HttpError } from '../application/http-error';
import { HttpStatusCode } from '../application/http-status-code';
import {
    isNumberDecimal,
    isNumberNegative,
    isStrictlyNaN,
    isStringEmpty,
} from '../utils';
import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    add(username: string): User {
        if (isStringEmpty(username)) {
            throw new HttpError(
                HttpStatusCode.BadRequest,
                'Given username is empty or whitespaced.',
            );
        }

        return this.userService.add(username);
    }

    getById(id: number): User | null {
        if (isStrictlyNaN(id)) {
            throw new HttpError(
                HttpStatusCode.BadRequest,
                'Given id is not a number.',
            );
        }

        if (isNumberDecimal(id)) {
            throw new HttpError(
                HttpStatusCode.BadRequest,
                'Given id is a decimal.',
            );
        }

        if (isNumberNegative(id)) {
            throw new HttpError(
                HttpStatusCode.BadRequest,
                'Given id is negative.',
            );
        }

        return this.userService.getById(id);
    }
}
