import { IAuthService } from '../../domain/interfaces/authService.interface';
import { IUserRepository } from '../../domain/interfaces/userRepository.interface';

export class GetUserRole {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async execute(token: string): Promise<string> {
    const decoded = this.authService.verifyToken(token);

    if (!decoded || !decoded.userId) {
      throw new Error('Invalid token');
    }

    const user = await this.userRepository.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user.role;
  }
}
