import { IsEmail, IsIn, IsString, Length } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  @Length(3, 20)
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 20)
  password!: string;

  @IsString()
  @IsIn(['Creador', 'Lector'], { message: 'Role must be either "Creador" or "Lector"' })
  role!: string;
}
