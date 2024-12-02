import { Router } from 'express';
import { Container } from '../../infrastructure/configuration/container.js';
import { UserController } from '../controllers/user.controller.js';

const router: Router = Router();
const userController = new UserController(Container.getCreateUserUseCase());

router.post('/create', (req, res) => userController.createUser(req, res));

export { router as userRoutes };
