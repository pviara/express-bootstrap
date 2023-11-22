import { HttpStatusCode } from '../application/http-status-code';
import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(HttpStatusCode.Ok).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(req.body.username);
                res.status(HttpStatusCode.Created).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
