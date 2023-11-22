import { HttpError } from '../application/http-error';
import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let sut: UserController;
    let userService: UserServiceSpy;

    beforeEach(() => {
        userService = new UserServiceSpy();
        sut = new UserController(userService);
    });

    describe('add', () => {
        it('should throw an error when given username is empty', () => {
            const usernames: string[] = ['', ' ', '     '];

            for (const username of usernames) {
                expect(() => sut.add(username)).toThrow(HttpError);
            }
        });

        it('should call add from UserService when given username is valid', () => {
            const validUsernames: string[] = ['username_1', 'us', 'test'];

            for (const validUsername of validUsernames) {
                sut.add(validUsername);
            }

            expect(userService.callsToAdd).toBe(validUsernames.length);
        });
    });

    describe('getById', () => {
        it('should throw an error when given id is not a number', () => {
            const ids = [NaN, '28', ''];

            for (const id of ids) {
                expect(() => sut.getById(id as number)).toThrow(HttpError);
            }
        });

        it('should throw an error when given id is a decimal', () => {
            const ids: number[] = [0.4, 11.993, 2.7];

            for (const id of ids) {
                expect(() => sut.getById(id)).toThrow(HttpError);
            }
        });

        it('should throw an error when given id is negative', () => {
            const ids: number[] = [-1, -3, -482];

            for (const id of ids) {
                expect(() => sut.getById(id)).toThrow(HttpError);
            }
        });

        it('should call getById on UserService when given id is valid', () => {
            const validIds: number[] = [0, 31, 838, 4];

            for (const validId of validIds) {
                sut.getById(validId);
            }

            expect(userService.callsToGetById).toBe(validIds.length);
        });
    });
});

class UserServiceSpy implements UserService {
    callsToAdd = 0;
    callsToGetById = 0;

    private dummyUser = new User(0, '');

    add(username: string): User {
        this.callsToAdd++;
        return this.dummyUser;
    }

    getById(id: number): User | null {
        this.callsToGetById++;
        return this.dummyUser;
    }
}
