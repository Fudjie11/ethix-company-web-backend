import { BaseBasicClass } from '../base/base-basic-class';

export class LocationDto extends BaseBasicClass {
  _id: string;
  name: string;
  isActive: boolean;
}

export class LocationEntryDto extends BaseBasicClass {
  name: string;
  isActive: boolean;
}
