import { modelOptions, prop } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import { TypegooseBaseWithTimestamps } from '../../service/typegoose-base';
import { Permission } from './permission';

@modelOptions({
  schemaOptions: {
    collection: 'UserRole',
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

export class Role extends TypegooseBaseWithTimestamps<Role> {
  @prop({ type: Schema.Types.String, index: true, unique: true })
  name: string;

  @prop()
  description: string;

  @prop()
  isActive: boolean;

  @prop({ type: [Schema.Types.ObjectId] })
  permissionIds: Types.ObjectId[];

  @prop({ ref: Permission, localField: 'permissionIds', foreignField: '_id', justOne: false })
  permissions: Permission[];
}