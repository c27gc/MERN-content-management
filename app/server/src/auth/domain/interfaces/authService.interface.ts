export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(providedPassword: string, storedPassword: string): Promise<boolean>;
    generateToken(userId: string): string;
    verifyToken(token: string): { userId: string } | null;
  }
  