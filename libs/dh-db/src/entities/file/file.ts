import { modelOptions, prop } from '@typegoose/typegoose';
import { TypegooseBaseWithTimestamps } from '../../service/typegoose-base';

@modelOptions({
  schemaOptions: {
    collection: 'File',
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
})

export class File extends TypegooseBaseWithTimestamps<File>{
  @prop()
  fileName: string;

  @prop()
  filePath: string;

  @prop()
  fileMime: string;

  @prop()
  fileUrl: string;

  @prop()
  fileKey: string;
}
