import { Gender } from '../../shared/enum/gender';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsISO8601 } from 'class-validator';

export class UserUpdate {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  readonly gender?: Gender;

}
