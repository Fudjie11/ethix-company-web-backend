import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema } from 'mongoose';
import { TypegooseBaseWithTimestamps } from '../../service/typegoose-base';

@modelOptions({
  schemaOptions: {
    collection: 'UserPermission',
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

export class Permission extends TypegooseBaseWithTimestamps<Permission> {
  @prop({required: true, unique: true})
  code: string;
  
  @prop({ type: Schema.Types.String, index: true, unique: true })
  name: string;

  @prop()
  permissionGroup: string;

  @prop()
  description: string;

  @prop()
  isActive: boolean;
}
