import { Router } from 'express';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { UserService } from '../user/user.service';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;

    constructor(private userService: UserService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
    }

    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
    }
}
