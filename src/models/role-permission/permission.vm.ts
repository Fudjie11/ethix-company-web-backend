import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseBasicClass } from '../base/base-basic-class';
import { MBaseListResponse } from '../base/base-list-response';

export class PermissionVM extends BaseBasicClass {
  code: string;
  permissionGroup: string;
  name: string;
  description: string;
  isActive: boolean;
}

export class PermissionEntryVM extends BaseBasicClass {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  permissionGroup: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  isActive: boolean;
}

export class PermissionListPaginationVM extends MBaseListResponse<PermissionVM[]> {}