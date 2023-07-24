import { BaseBasicClass } from '../base/base-basic-class';
import { Types } from 'mongoose';

export class TagDto extends BaseBasicClass {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export class TagEntryDto extends BaseBasicClass {
  name: string;
  description: string;
  isActive: boolean;
}
