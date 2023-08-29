import { ExpressServer } from './express-server';

export class ExpressApplication {
    private server = new ExpressServer('3000');

    bootstrap(): void {
        this.server.bootstrap();
    }
}
