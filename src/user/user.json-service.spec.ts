import fs from 'fs';
import { User } from './user';
import { UserJSONService } from './user.json-service';

jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {
    let sut: UserJSONService;

    beforeEach(() => {
        sut = new UserJSONService();
        jest.resetAllMocks();
    });

    describe('add', () => {
        it('should throw an error when given username points to an existing user', () => {
            const existingUsername = 'username';
            const users: User[] = [new User(0, existingUsername)];
            stubReadFileSync(users);

            expect(() => sut.add(existingUsername)).toThrow();
        });

        it('should override users with an array containing given new user', () => {
            const users: User[] = [
                new User(0, 'username_28'),
                new User(1, 'username_910'),
            ];
            stubReadFileSync(users);

            const userToCreate = new User(2, 'username_03');

            sut.add(userToCreate.username);

            const stringifiedUsers = JSON.stringify(users.concat(userToCreate));
            expect(fsMock.writeFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.writeFileSync).toHaveBeenCalledWith(
                './src/user/users.json',
                stringifiedUsers,
            );
        });
    });

    describe('getById', () => {
        it('should read json file using fs module', () => {
            const users: User[] = [];
            stubReadFileSync(users);

            sut.getById(0);

            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
            expect(fsMock.readFileSync).toHaveBeenCalledWith(
                './src/user/users.json',
            );
        });

        it('should return null when no user has been found', () => {
            const users: User[] = [];
            stubReadFileSync(users);

            const result = sut.getById(0);

            expect(result).toBeNull();
        });

        it('should return the right User when it has been found using given id', () => {
            const users: User[] = [new User(0, 'username')];
            stubReadFileSync(users);

            const result = sut.getById(users[0].id);

            expect(result).toEqual(users[0]);
        });
    });
});

function stubReadFileSync(users: User[]): void {
    const stringifiedUsers = JSON.stringify(users);
    const dummyBuffer = Buffer.from(stringifiedUsers);

    fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);
}
