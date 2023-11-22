import { ApplicationError } from '../application/application-error';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { ErrorHandlerService } from '../application/error-handler.service';
import express, { NextFunction, Request, Response } from 'express';
import { ExpressRouter } from './express-router';
import { HttpStatusCode } from '../application/http-status-code';

export class ExpressServer {
    private express = express();

    constructor(
        private allowedMainOrigin: string,
        private errorHandlerService: ErrorHandlerService,
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureServer();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureServer(): void {
        this.configureCorsPolicy();
        this.configureBodyParser();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureCorsPolicy(): void {
        const corsOptions: CorsOptions = {
            origin: (origin, callback) => {
                const isOriginAllowed =
                    !origin || this.allowedMainOrigin === origin;

                if (isOriginAllowed) {
                    callback(null, true);
                } else {
                    callback(new Error('CORS: Request origin is not allowed'));
                }
            },
        };

        this.express.use(cors(corsOptions));
    }

    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }

    private configureErrorHandling(): void {
        this.express.use(
            (
                error: Error,
                req: Request,
                res: Response,
                next: NextFunction,
            ): void => {
                let statusCode = HttpStatusCode.InternalServerError;

                if (error instanceof ApplicationError) {
                    statusCode =
                        this.errorHandlerService.getHttpStatusCodeFrom(error);
                }

                console.error(error.stack);

                res.status(statusCode).json({ message: error.message });
            },
        );
    }
}
