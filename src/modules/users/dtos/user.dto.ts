import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class User {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: Date;
}
