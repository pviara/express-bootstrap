import express from 'express';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';

export class ExpressServer {
    private express = express();

    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureBodyParser();
        this.configureRoutes();
    }

    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
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
