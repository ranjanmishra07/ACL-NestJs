import {IsNotEmpty, IsEnum, IsString, IsEmail, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsEnum(UserRole)
  readonly role: UserRole;
}

/* tslint:disable:max-classes-per-file */
export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}

export class TestDto {
  @IsNotEmpty()
  email: string;

  validateEmail(email: string) {
    return email.includes('mygate');
  }
}

export class CacheUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
