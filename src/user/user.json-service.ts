import { readFileSync, writeFileSync } from 'fs';
import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {
    private readonly userJsonPath = './src/user/users.json';

    add(username: string): User {
        const buffer = readFileSync(this.userJsonPath);
        const users = JSON.parse(buffer.toString()) as User[];

        const newUser = new User(0, username);
        users.push(newUser);

        writeFileSync(this.userJsonPath, JSON.stringify(users));

        return newUser;
    }

    getById(id: number): User | null {
        // 1. de récupérer le fichier json et le lire
        // 2. parcourir les users et de trouver celui qui
        // possède l'id reçu en paramètre (id)
        // 3. retourner l'utilisateur s'il a été trouvé, sinon de retourner null

        const buffer = readFileSync(this.userJsonPath);
        const users = JSON.parse(buffer.toString()) as User[];

        const existingUser = users.find((user) => user.id == id);
        return existingUser || null;
    }
}
