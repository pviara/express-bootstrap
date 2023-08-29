import { ExpressServer } from './express-server';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private server: ExpressServer;

    constructor() {
        this.configureEnvironment();

        const port = this.getPort();
        this.server = new ExpressServer(port);
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}
