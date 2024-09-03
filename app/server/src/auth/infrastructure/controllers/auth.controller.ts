import { Request, Response } from 'express';
import { RegisterUser } from '../../application/usecases/registerUser.usecase';
import { LoginUser } from '../../application/usecases/loginUser.usecase';
import { InvalidCredentialsError } from '../../domain/errors/invalidCredentials.error';
import { UserAlreadyExistsError } from '../../domain/errors/userAlredyExists.error';
import { UserNameTakenError } from '../../domain/errors/userNametaken.error';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDTO } from '../dto/inputRegister.dto';
import { validateOrReject,  ValidationError  } from 'class-validator';
import { InvputValidationError } from '../../domain/errors/inputValidationError.error';
import { GetUserRole } from '../../application/usecases/getUserRole.usecase';

export class AuthController {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser, 
    private getUserRoleUseCase: GetUserRole
  ) {}

  async register(req: Request, res: Response) {
    try {

      const registerUserDto = plainToInstance(RegisterUserDTO, req.body);
      try {
        await validateOrReject(registerUserDto);
      } catch (errors) {
        if (errors instanceof Array && errors[0] instanceof ValidationError) {
          const messages = errors.map((error: ValidationError) => {
              return Object.values(error.constraints || {}).join(', ');
          }).join('; ');
          throw new InvputValidationError(messages);
      } else {
          throw new Error("Invalid data");
      }
      }
      
      const user = await this.registerUser.execute(req.body);
      res.status(201).json(user);
    } catch (error_) {

      const error = error_ as Error;
      console.log("error", error)
      if (error instanceof UserAlreadyExistsError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof UserNameTakenError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof InvputValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.loginUser.execute(req.body);
      res.status(200).json({ token });
    } catch (error_) {
      const error = error_ as Error;
      console.log("error", error)
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async getUserRole(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const role = await this.getUserRoleUseCase.execute(token);

      res.status(200).json({ role });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}
