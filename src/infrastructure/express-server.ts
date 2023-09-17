import express from 'express';
import { ExpressRouter } from './express-router';

export class ExpressServer {
    private express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}
