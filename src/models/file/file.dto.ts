import { BaseBasicClass } from '../base/base-basic-class';
import { Types } from 'mongoose';

export class FileDto extends BaseBasicClass {
  _id: Types.ObjectId;
  fileName: string;
  filePath: string;
  fileMime: string;
  fileUrl: string;
}

export class FileEntryDto extends BaseBasicClass {
  fileName: string;
  filePath: string;
  fileMime: string;
  fileUrl: string;
}
