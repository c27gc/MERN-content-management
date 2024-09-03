import { IUserRepository } from '../../domain/interfaces/userRepository.interface';
import { IAuthService } from '../../domain/interfaces/authService.interface';
import { InvalidCredentialsError } from '../../domain/errors/invalidCredentials.error';
import { LoginUserDTO } from '../../infrastructure/dto/inputLogin.dto';

export class LoginUser {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(data: LoginUserDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.authService.comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return this.authService.generateToken(user.id);
  }
}
