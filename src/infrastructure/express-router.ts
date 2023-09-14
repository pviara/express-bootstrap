import { Router } from 'express';
import { UserRouter } from '../user/user.router';

export class ExpressRouter {
    router = Router();

    constructor(private userRouter: UserRouter) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.use('user', this.userRouter.router);
    }
}
