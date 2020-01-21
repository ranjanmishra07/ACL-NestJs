import {IsNotEmpty, IsEnum, IsString, IsEmail, MinLength, IsNumber, ArrayNotEmpty, IsBoolean} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserAccessEntityType } from '../entities/user-access.entity';
// import { UserRole } from './user.entity';

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

  // @ApiProperty()
  // @IsEnum(UserRole)
  // readonly role: UserRole;
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
  readonly email: string;

  validateEmail(email: string) {
    return email.includes('mygate');
  }
}

export class CreateUserPermissionsDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @ArrayNotEmpty()
  readonly permissionIds: number[];

}

export class CreateUserRolesDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @ArrayNotEmpty()
  readonly roleIds: number[];

}

export class CreateUserAccessDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserAccessEntityType)
  readonly entityType: UserAccessEntityType;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly entityId: number;

  @ApiProperty()
  @IsBoolean()
  readonly deleted?: boolean;
}