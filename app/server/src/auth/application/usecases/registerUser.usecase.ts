import { IUserRepository } from '../../domain/interfaces/userRepository.interface';
import { IAuthService } from '../../domain/interfaces/authService.interface';
import { User } from '../../domain/entities/user.entity';
import { UserAlreadyExistsError } from '../../domain/errors/userAlredyExists.error';
import { RegisterUserDTO } from '../../infrastructure/dto/inputRegister.dto';
import { UserNameTakenError } from '../../domain/errors/userNametaken.error';

export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) { }

  async execute(data: RegisterUserDTO): Promise<{ token: string, user: User }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    try {
      const hashedPassword = await this.authService.hashPassword(data.password);
      const user = new User('', data.username, data.email, hashedPassword, data.role);
      const savedUser = await this.userRepository.save(user);
      const token = this.authService.generateToken(savedUser.id);
      return { token, user: savedUser };
    } catch (error) {
      //@ts-ignore
      if (error.code === 11000) {
        console.log("Error code 11000");
        throw new UserNameTakenError();
      }
      else throw error;
    }
  }
}