import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IAuthService } from '../../domain/interfaces/authService.interface';

export class JWTAuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(providedPassword, storedPassword);
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  }

  verifyToken(token: string): { userId: string } | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    } catch (err) {
      console.log('Error verifying token', err);
      throw err
    }
  }
}
