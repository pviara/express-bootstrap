import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get(':id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        // other routes...
    }
}
