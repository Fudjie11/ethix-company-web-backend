import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { Gender } from '../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreate {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  readonly emailConfirmed: boolean;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly phoneNumberConfirmed: boolean;

  @ApiProperty()
  @IsString()
  readonly userName: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty()
  @IsString()
  readonly googleId: string;

  @ApiProperty()
  @IsString()
  readonly facebookId: string;

}
