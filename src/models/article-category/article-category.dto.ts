import { BaseBasicClass } from '../base/base-basic-class';
import { Types } from 'mongoose';

export class ArticleCategoryDto extends BaseBasicClass {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export class ArticleCategoryEntryDto extends BaseBasicClass {
  name: string;
  description: string;
  isActive: boolean;
}
