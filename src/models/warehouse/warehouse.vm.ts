import { ApiProperty } from '@nestjs/swagger';
import { MBaseListResponse } from '../base/base-list-response';

export class LocationVM {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}

export class WarehouseVM {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;
  
  @ApiProperty()
  location: LocationVM;
  
  @ApiProperty()
  warehouseArea: number;
  
  @ApiProperty()
  sqmInventory: string;
  
  @ApiProperty()
  operationalTimes: string[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  fileUrls: string[];
}

export class WarehouseEntryVM {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string

  @ApiProperty()
  locationId: string;
  
  @ApiProperty()
  warehouseArea: number;
  
  @ApiProperty()
  sqmInventory: string;
  
  @ApiProperty()
  operationalTimes: string[];
  
  @ApiProperty()
  isActive: boolean;
  
  @ApiProperty()
  fileUrls: string[];
}

export class WarehouseListPaginationVM extends MBaseListResponse<WarehouseVM[]> {}