import { BaseBasicClass } from '../base/base-basic-class';
import { Types } from 'mongoose';
import { LocationDto } from '../../models/location/location.dto';
import { LocationVM, WarehouseVM } from './warehouse.vm';

export class WarehouseDto extends BaseBasicClass {  
  _id: Types.ObjectId;
  name: string;
  address: string;
  locationId: string;
  location: LocationDto;
  warehouseArea: number;
  sqmInventory: string;
  operationalTimes: string[];
  isActive: boolean;
  fileUrls: string[];

  transformDtoToVM() {
    const warehouse = new WarehouseVM();
    let location: LocationVM;

    warehouse._id = this._id.toHexString();
    warehouse.name = this.name;
    warehouse.address = this.address;
    warehouse.warehouseArea = this.warehouseArea;
    warehouse.sqmInventory = this.sqmInventory;
    warehouse.operationalTimes = this.operationalTimes;
    warehouse.isActive = this.isActive;
    warehouse.fileUrls = this.fileUrls;

    if(this.location) {
      location = new LocationVM();
      location._id = this.location?._id;
      location.name = this.location.name;
      warehouse.location = location;
    }

    return warehouse;
  }
}

export class WarehouseEntryDto extends BaseBasicClass {
    name: string;
    address: string
    locationId: Types.ObjectId;
    warehouseArea: number;
    sqmInventory: string;
    operationalTimes: string[];
    fileUrls: string[];
}
