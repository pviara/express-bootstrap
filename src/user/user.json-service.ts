import { areSameStrings, isArrayEmpty } from '../utils';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { User } from './user';
import { UserService } from './user.service';

const DEFAULT_USER_ID = 0;

export class UserJSONService implements UserService {
    private readonly userJsonPath = './src/user/users.json';

    constructor() {
        this.writeDefaultUsersJsonFile();
    }

    add(username: string): User {
        const users = this.getUsersFromJsonFile();

        this.throwWhenUsernameExists(users, username);

        const newId = this.generateUniqueId(users);
        const newUser = new User(newId, username);

        users.push(newUser);
        this.overrideUsers(users);

        return newUser;
    }

    getById(id: number): User | null {
        const users = this.getUsersFromJsonFile();

        const existingUser = users.find((user) => user.id == id);
        return existingUser || null;
    }

    private writeDefaultUsersJsonFile(): void {
        if (!existsSync(this.userJsonPath)) {
            writeFileSync(this.userJsonPath, JSON.stringify([]));
        }
    }

    private getUsersFromJsonFile(): User[] {
        const buffer = readFileSync(this.userJsonPath);
        const users = JSON.parse(buffer.toString()) as User[];
        return users;
    }

    private throwWhenUsernameExists(users: User[], username: string): void {
        const usernameAlreadyExists = users.some((user) =>
            areSameStrings(user.username, username),
        );
        if (usernameAlreadyExists) {
            throw new Error(
                `Given username "${username}" points to an existing user.`,
            );
        }
    }

    private generateUniqueId(users: User[]): number {
        if (isArrayEmpty(users)) {
            return DEFAULT_USER_ID;
        }

        const userIds = users.map((user) => user.id);
        return Math.max(...userIds) + 1;
    }

    private overrideUsers(users: User[]): void {
        writeFileSync(this.userJsonPath, JSON.stringify(users));
    }
}
