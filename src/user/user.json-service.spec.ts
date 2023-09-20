import fs from 'fs';
import { UserJSONService } from './user.json-service';
import { User } from './user';

// Pour lancer les tests : "npm run test" (sans les guillemets) dans l'invite de commandes

// Mock du module fs
jest.mock('fs');
const fsMock = fs as jest.Mocked<typeof fs>;

describe('UserJSONService', () => {
    // System Under Test
    let sut: UserJSONService;

    beforeEach(() => {
        sut = new UserJSONService();
        jest.resetAllMocks();
    });

    describe('getById', () => {
        it('should read json file using fs module', () => {
            const users: User[] = [];
            const stringifiedUsers = JSON.stringify(users);
            const dummyBuffer = Buffer.from(stringifiedUsers);

            fsMock.readFileSync.mockReturnValueOnce(dummyBuffer);

            sut.getById(0);
            expect(fsMock.readFileSync).toHaveBeenCalledTimes(1);
        });
    });
});
