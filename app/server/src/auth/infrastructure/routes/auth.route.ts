import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUser } from '../../application/usecases/registerUser.usecase';
import { LoginUser } from '../../application/usecases/loginUser.usecase';
import { GetUserRole } from '../../application/usecases/getUserRole.usecase';
import { MongooseUserRepository } from '../repositories/mongooseUser.repository';
import { JWTAuthService } from '../services/jwt.service';
import { get } from 'http';

const userRepository = new MongooseUserRepository();
const authService = new JWTAuthService();

const registerUserUseCase = new RegisterUser(userRepository, authService);
const loginUserUseCase = new LoginUser(userRepository, authService);
const getUserRoleUseCase = new GetUserRole( authService, userRepository);

const authController = new AuthController(registerUserUseCase, loginUserUseCase,  getUserRoleUseCase);

const router = Router();

router.post('/register', (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'User registration details',
            required: true,
            schema: { $ref: '#/definitions/RegisterUserDTO' }
        }
    */

    authController.register(req, res);
});

router.post('/login', (req, res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'User login'
        #swagger.description = 'Login a user with their email and password.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'User login details',
            required: true,
            schema: { $ref: '#/definitions/LoginUserDTO' }
        }
        #swagger.responses[200] = {
            description: 'Successful login',
            schema: {
                success: true,
                token: 'jwt_token_here'
            }
        }
        #swagger.responses[400] = {
            description: 'Bad request, validation failed'
        }
    */

    authController.login(req, res);
});

router.get('/role', (req, res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.summary = 'Get user role'
        #swagger.description = 'Get the role of the user based on the provided token.'
        #swagger.parameters['Authorization'] = {
            in: 'header',
            description: 'JWT token for authentication',
            required: true,
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'Successful retrieval of user role',
            schema: {
                role: 'Creador'
            }
        }
        #swagger.responses[401] = {
            description: 'Unauthorized, token not provided or invalid'
        }
        #swagger.responses[400] = {
            description: 'Bad request, validation failed'
        }
    */
    authController.getUserRole(req, res);
});

export default router;
