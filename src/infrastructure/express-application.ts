import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserJSONService } from '../user/user.json-service';
import { UserService } from '../user/user.service';
import * as dotenv from 'dotenv';

export class ExpressApplication {
    private allowedMainOrigin!: string;
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureVariables();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureVariables(): void {
        this.configureAllowedMainOrigin();
        this.configureServerPort();
    }

    private configureAllowedMainOrigin(): void {
        this.allowedMainOrigin = this.getAllowedMainOrigin();
    }

    private getAllowedMainOrigin(): string {
        const allowedMainOrigin = process.env.ALLOWED_MAIN_ORIGIN;
        if (!allowedMainOrigin) {
            throw new Error('No allowed main origin was found in env file.');
        }

        return allowedMainOrigin;
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }

    private configureServices(): void {
        this.userService = new UserJSONService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.userService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(
            this.allowedMainOrigin,
            this.expressRouter,
            this.port,
        );
    }
}
