import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { MBaseListResponse } from '../base/base-list-response';
import { Types } from 'mongoose';

export class LocationVM {
  @ApiProperty()
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;
}

export class LocationEntryVM {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;
}

export class LocationListPaginationVM extends MBaseListResponse<LocationVM[]> {}